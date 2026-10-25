const axios = require('axios');

async function runTests() {
    const url = 'http://localhost:3000/v1/chat/completions';

    console.log("--- Testing Invalid Request (No messages) ---");
    try {
        await axios.post(url, {
            model: "test-model"
        });
        console.error("FAIL: Expected invalid request to throw error");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log("PASS: Received 400 Bad Request");
            console.log("Error details:", error.response.data);
        } else {
            console.error("FAIL: Expected 400 status, got:", error.response?.status);
        }
    }

    console.log("\n--- Testing Invalid Request (Messages not array) ---");
    try {
        await axios.post(url, {
            messages: "not an array",
            model: "test-model"
        });
        console.error("FAIL: Expected invalid request to throw error");
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log("PASS: Received 400 Bad Request");
            console.log("Error details:", error.response.data);
        } else {
            console.error("FAIL: Expected 400 status, got:", error.response?.status);
        }
    }
}

runTests();
