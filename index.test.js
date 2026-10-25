const test = require('node:test');
const assert = require('node:assert');
const { app, messagesToPrompt } = require('./index');

test('messagesToPrompt should correctly format a single user message', () => {
    const messages = [{ role: 'user', content: 'Hello' }];
    const expected = 'User: Hello\nAssistant:';
    assert.strictEqual(messagesToPrompt(messages), expected);
});

test('messagesToPrompt should correctly format a conversation with system, user, and assistant messages', () => {
    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello! How can I help?' },
        { role: 'user', content: 'What is 2+2?' }
    ];
    const expected =
        'System: You are a helpful assistant.\n' +
        'User: Hi\n' +
        'Assistant: Hello! How can I help?\n' +
        'User: What is 2+2?\n' +
        'Assistant:';
    assert.strictEqual(messagesToPrompt(messages), expected);
});

test('messagesToPrompt should handle empty messages array', () => {
    const messages = [];
    assert.strictEqual(messagesToPrompt(messages), '');
});

test('messagesToPrompt should not append trailing "Assistant:" if the last message is from the assistant', () => {
    const messages = [
        { role: 'user', content: 'Hi' },
        { role: 'assistant', content: 'Hello there' }
    ];
    const expected = 'User: Hi\nAssistant: Hello there\n';
    assert.strictEqual(messagesToPrompt(messages), expected);
});

test('GET /v1/models should return 200 and expected mocked model data', async () => {
    const server = app.listen(0);
    const { port } = server.address();

    try {
        const response = await fetch(`http://localhost:${port}/v1/models`);
        assert.strictEqual(response.status, 200);

        const data = await response.json();
        assert.strictEqual(data.object, 'list');
        assert.strictEqual(Array.isArray(data.data), true);
        assert.strictEqual(data.data.length, 1);
        assert.strictEqual(data.data[0].id, 'aihorde-model');
        assert.strictEqual(data.data[0].object, 'model');
        assert.strictEqual(data.data[0].owned_by, 'aihorde');
    } finally {
        server.close();
    }
});
