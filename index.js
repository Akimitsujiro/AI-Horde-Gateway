require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[REQ] ${req.method} ${req.url}`);
    next();
});

// Mock /v1/models endpoint for clients that check it
app.get('/v1/models', (req, res) => {
    res.json({
        object: "list",
        data: [{ id: "aihorde-model", object: "model", created: Date.now(), owned_by: "aihorde" }]
    });
});

const PORT = process.env.PORT || 3000;
const AI_HORDE_BASE_URL = 'https://stablehorde.net/api/v2';
const DEFAULT_API_KEY = process.env.AI_HORDE_API_KEY || '0000000000';

// Convert OpenAI messages to a single prompt string
function messagesToPrompt(messages) {
    let prompt = '';
    for (const msg of messages) {
        if (msg.role === 'system') {
            prompt += `System: ${msg.content}\n`;
        } else if (msg.role === 'user') {
            prompt += `User: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
            prompt += `Assistant: ${msg.content}\n`;
        }
    }
    // Append Assistant: at the end to prompt the model to answer
    if (messages.length > 0 && messages[messages.length - 1].role !== 'assistant') {
        prompt += 'Assistant:';
    }
    return prompt;
}

// Utility to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const chatHandler = async (req, res) => {
    try {
        const {
            messages,
            model,
            temperature = 0.7,
            max_tokens = 500,
            top_p = 0.9,
            stream = false
        } = req.body;

        // Extract API key from Authorization header or use default
        let apikey = DEFAULT_API_KEY;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            apikey = authHeader.substring(7);
        }

        const prompt = messagesToPrompt(messages || []);

        // Ensure max_tokens is at least 16 (AI Horde requirement)
        const finalMaxTokens = Math.max(16, max_tokens);

        // Map 'Any' (from JanitorAI default) to empty array to let AI Horde decide
        const modelList = (model && model.toLowerCase() !== 'any') ? [model] : [];

        // Prepare request for AI Horde
        const payload = {
            prompt,
            params: {
                max_length: finalMaxTokens,
                temperature,
                top_p
            },
            models: modelList
        };

        console.log(`[REQ] Sending to AI Horde (Model: ${modelList.length > 0 ? modelList[0] : 'Any'})`);

        // 1. Submit async request
        const submitResponse = await axios.post(`${AI_HORDE_BASE_URL}/generate/text/async`, payload, {
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            }
        });

        const jobId = submitResponse.data.id;
        console.log(`[REQ] Job ID received: ${jobId}`);

        // 2. Poll for completion
        let isDone = false;
        let generatedText = '';
        
        while (!isDone) {
            await sleep(2000); // Wait 2 seconds between polls
            
            const statusResponse = await axios.get(`${AI_HORDE_BASE_URL}/generate/text/status/${jobId}`, {
                headers: { 'apikey': apikey }
            });

            const status = statusResponse.data;
            if (status.faulted) {
                throw new Error("AI Horde text generation failed.");
            }

            if (status.done) {
                isDone = true;
                if (status.generations && status.generations.length > 0) {
                    generatedText = status.generations[0].text;
                }
            } else {
                console.log(`[POLL] Job ${jobId}: Waiting for generation (Wait time: ${status.wait_time}s)`);
            }
        }

        console.log(`[REQ] Job ${jobId} finished successfully.`);

        // 3. Format response back to OpenAI format
        const responseId = `chatcmpl-${jobId}`;
        const createdTimestamp = Math.floor(Date.now() / 1000);

        if (stream) {
            // Fake streaming: Send everything in one chunk, then [DONE]
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

            const chunk = {
                id: responseId,
                object: 'chat.completion.chunk',
                created: createdTimestamp,
                model: model || 'aihorde-model',
                choices: [{
                    index: 0,
                    delta: { content: generatedText }
                }]
            };

            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
            res.write(`data: [DONE]\n\n`);
            return res.end();
        } else {
            // Standard JSON response
            return res.json({
                id: responseId,
                object: 'chat.completion',
                created: createdTimestamp,
                model: model || 'aihorde-model',
                choices: [{
                    index: 0,
                    message: {
                        role: 'assistant',
                        content: generatedText
                    },
                    finish_reason: 'stop'
                }],
                usage: {
                    prompt_tokens: 0, // AI Horde doesn't strictly return token usage
                    completion_tokens: 0,
                    total_tokens: 0
                }
            });
        }

    } catch (error) {
        console.error('[ERROR]', error.message);
        if (error.response && error.response.data) {
            console.error('[ERROR DETAILS]', error.response.data);
        }
        res.status(500).json({
            error: {
                message: error.message || 'An error occurred during text generation.',
                type: 'server_error',
                param: null,
                code: 500
            }
        });
    }
};

app.post('/v1/chat/completions', chatHandler);
app.post('/chat/completions', chatHandler);
app.post('/v1', chatHandler);
app.post('/', chatHandler);

app.listen(PORT, () => {
    console.log(`AI Horde JanitorAI Gateway running on http://localhost:${PORT}`);
    console.log(`Proxy URL for JanitorAI: http://localhost:${PORT}/v1/chat/completions`);
});
