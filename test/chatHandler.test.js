const { test, mock } = require('node:test');
const assert = require('node:assert');
const axios = require('axios');
const { chatHandler } = require('../index');

test('chatHandler - standard request', async (t) => {
    // Mock axios to avoid actual network requests
    mock.method(axios, 'post', async (url, payload, options) => {
        return {
            data: {
                id: 'mock-job-id'
            }
        };
    });

    mock.method(axios, 'get', async (url, options) => {
        return {
            data: {
                done: true,
                faulted: false,
                generations: [
                    {
                        text: 'Mocked response text'
                    }
                ]
            }
        };
    });

    // Mock Express request
    const req = {
        body: {
            messages: [
                { role: 'user', content: 'Hello' }
            ],
            model: 'test-model',
            stream: false
        },
        headers: {}
    };

    // Mock Express response
    const res = {
        json: mock.fn(),
        status: mock.fn(() => res)
    };

    // Run the handler
    await chatHandler(req, res);

    // Assertions
    assert.strictEqual(res.json.mock.calls.length, 1);
    const responseBody = res.json.mock.calls[0].arguments[0];

    assert.strictEqual(responseBody.object, 'chat.completion');
    assert.strictEqual(responseBody.id, 'chatcmpl-mock-job-id');
    assert.strictEqual(responseBody.choices[0].message.content, 'Mocked response text');

    // Restore mocked methods
    mock.restoreAll();
});

test('chatHandler - stream request', async (t) => {
    // Mock axios
    mock.method(axios, 'post', async (url, payload, options) => {
        return {
            data: {
                id: 'mock-job-id-stream'
            }
        };
    });

    mock.method(axios, 'get', async (url, options) => {
        return {
            data: {
                done: true,
                faulted: false,
                generations: [
                    {
                        text: 'Mocked stream text'
                    }
                ]
            }
        };
    });

    // Mock Express request
    const req = {
        body: {
            messages: [
                { role: 'user', content: 'Stream this' }
            ],
            model: 'test-model',
            stream: true
        },
        headers: {}
    };

    // Mock Express response
    const res = {
        setHeader: mock.fn(),
        write: mock.fn(),
        end: mock.fn()
    };

    // Run the handler
    await chatHandler(req, res);

    // Assertions
    assert.strictEqual(res.setHeader.mock.calls.length, 3);
    assert.strictEqual(res.write.mock.calls.length, 2);
    assert.strictEqual(res.end.mock.calls.length, 1);

    const chunkWriteCall = res.write.mock.calls[0].arguments[0];
    assert.ok(chunkWriteCall.includes('Mocked stream text'));

    // Restore mocked methods
    mock.restoreAll();
});

test('chatHandler - handle failure', async (t) => {
    // Mock axios to simulate an error
    mock.method(axios, 'post', async () => {
        throw new Error('Network error');
    });

    const req = {
        body: {
            messages: []
        },
        headers: {}
    };

    const res = {
        status: mock.fn(() => res),
        json: mock.fn()
    };

    await chatHandler(req, res);

    assert.strictEqual(res.status.mock.calls.length, 1);
    assert.strictEqual(res.status.mock.calls[0].arguments[0], 500);
    assert.strictEqual(res.json.mock.calls.length, 1);

    const errorResponse = res.json.mock.calls[0].arguments[0];
    assert.strictEqual(errorResponse.error.message, 'Network error');

    mock.restoreAll();
});
