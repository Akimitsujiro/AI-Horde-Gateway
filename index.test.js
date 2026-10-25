const { test } = require('node:test');
const assert = require('node:assert');
const { messagesToPrompt } = require('./index');

test('messagesToPrompt should return empty string for empty messages array', () => {
    const messages = [];
    const prompt = messagesToPrompt(messages);
    assert.strictEqual(prompt, '');
});

test('messagesToPrompt should format system, user, and assistant messages correctly', () => {
    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello!' },
        { role: 'assistant', content: 'Hi there!' },
        { role: 'user', content: 'How are you?' }
    ];

    const prompt = messagesToPrompt(messages);
    const expectedPrompt =
        "System: You are a helpful assistant.\n" +
        "User: Hello!\n" +
        "Assistant: Hi there!\n" +
        "User: How are you?\n" +
        "Assistant:";

    assert.strictEqual(prompt, expectedPrompt);
});

test('messagesToPrompt should not append Assistant: if the last message is from assistant', () => {
    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello!' },
        { role: 'assistant', content: 'Hi there!' }
    ];

    const prompt = messagesToPrompt(messages);
    const expectedPrompt =
        "System: You are a helpful assistant.\n" +
        "User: Hello!\n" +
        "Assistant: Hi there!\n";

    assert.strictEqual(prompt, expectedPrompt);
});
