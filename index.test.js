const test = require('node:test');
const assert = require('node:assert');
const axios = require('axios');

test('AI Horde text generation failed error path', async (t) => {
    // Mock axios post to simulate successful submission to AI Horde
    t.mock.method(axios, 'post', async (url) => {
        if (url.includes('/generate/text/async')) {
            return { data: { id: 'test-faulted-job-id' } };
        }
        return { data: {} };
    });

    // Mock axios get to simulate checking status and getting a faulted response
    t.mock.method(axios, 'get', async (url) => {
        if (url.includes('/generate/text/status/test-faulted-job-id')) {
            return { data: { faulted: true } };
        }
        return { data: {} };
    });

    // Use a different port for testing to avoid conflicts
    process.env.PORT = '3005';

    // Require the index.js file to start the server
    const { server } = require('./index.js');

    // Wait for the server to start
    await new Promise(r => setTimeout(r, 500));

    try {
        // Send a mock request to the chat completion endpoint
        const fetchRes = await fetch('http://localhost:3005/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Test message' }],
                model: 'aihorde-model'
            })
        });

        const body = await fetchRes.json();

        // Assert that we get a 500 Internal Server Error
        assert.strictEqual(fetchRes.status, 500);

        // Assert that the error response matches the expected structure and message
        assert.ok(body.error, 'Response should contain an error object');
        assert.strictEqual(body.error.message, "AI Horde text generation failed.");
        assert.strictEqual(body.error.code, 500);
    } finally {
        // Ensure server is properly closed to allow the test runner to exit
        if (server) {
            server.close();
        }
    }
});
