const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const dotenv = require('dotenv');
const WebSocket = require('ws');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

app.get('/test', async (req, res) => {
    const { data: stats, error } = await supabase
        .from('stats')
        .select('*');

    if (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } else {
        console.log('DATA', stats);
        res.json(stats);
    }
});

const server = app.listen(4000, () => {
    console.log('HTTP server running on port 4000');
});

// WebSocket server setup
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log(`Received: ${message}`);
        // Handle the received message here
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:4000/ws');
