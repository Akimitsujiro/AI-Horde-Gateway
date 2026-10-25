const test = require('node:test');
const assert = require('node:assert');
const { messagesToPrompt } = require('../index');

test('messagesToPrompt', async (t) => {
    await t.test('handles empty messages array', () => {
        const result = messagesToPrompt([]);
        assert.strictEqual(result, '');
    });

    await t.test('handles system role', () => {
        const messages = [{ role: 'system', content: 'You are a helpful assistant.' }];
        const expected = 'System: You are a helpful assistant.\nAssistant:';
        const result = messagesToPrompt(messages);
        assert.strictEqual(result, expected);
    });

    await t.test('handles user role', () => {
        const messages = [{ role: 'user', content: 'Hello there!' }];
        const expected = 'User: Hello there!\nAssistant:';
        const result = messagesToPrompt(messages);
        assert.strictEqual(result, expected);
    });

    await t.test('handles assistant role', () => {
        const messages = [{ role: 'assistant', content: 'Hi! How can I help?' }];
        const expected = 'Assistant: Hi! How can I help?\n';
        const result = messagesToPrompt(messages);
        assert.strictEqual(result, expected);
    });

    await t.test('handles mixed roles', () => {
        const messages = [
            { role: 'system', content: 'You are a friendly assistant.' },
            { role: 'user', content: 'Hello!' },
            { role: 'assistant', content: 'Hi there!' },
            { role: 'user', content: 'How are you?' }
        ];
        const expected = 'System: You are a friendly assistant.\nUser: Hello!\nAssistant: Hi there!\nUser: How are you?\nAssistant:';
        const result = messagesToPrompt(messages);
        assert.strictEqual(result, expected);
    });

    await t.test('handles mixed roles ending with assistant', () => {
        const messages = [
            { role: 'user', content: 'Hello!' },
            { role: 'assistant', content: 'Hi there! I am an assistant.' }
        ];
        const expected = 'User: Hello!\nAssistant: Hi there! I am an assistant.\n';
        const result = messagesToPrompt(messages);
        assert.strictEqual(result, expected);
    });
});
