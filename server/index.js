const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const WebSocket = require('ws');
// const mqtt = require('mqtt');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Basic root route for checking server status
app.get('/', (req, res) => {
    res.send('WebSocket server is running.');
});

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

app.post('/api/insertStats', async (req, res) => {
    const { created_at, total_time, motion_time, max_speed, distance } = req.body;

    const { data, error } = await supabase
        .from('stats')
        .insert([
            { created_at, 'total-time': total_time, motion_time, 'max-speed': max_speed, distance }
        ]);

    if (error) {
        console.error('Error inserting stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } else {
        res.status(201).json(data);
    }
});

const server = app.listen(port, () => {
    console.log(`HTTP server running on http://localhost:${port}`);
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

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});


// // MQTT setup
// const mqttClient = mqtt.connect('mqtt://192.168.43.134:1883');

// mqttClient.on('connect', () => {
//     console.log('Connected to MQTT broker');
//     // Subscribe to multiple topics
//     mqttClient.subscribe(['esp32/track', 'esp32/sonar', 'esp32/light'], (err, granted) => {
//         if (err) {
//             console.error('Subscription error:', err);
//         } else {
//             console.log('Subscription successful:', granted);
//         }
//     });
// });

// mqttClient.on('error', (err) => {
//     console.error('MQTT Client Error:', err);
// });

// mqttClient.on('message', (topic, message) => {
//     console.log(`MQTT message received on topic ${topic}: ${message.toString()}`);
//     // Broadcast the message to all connected WebSocket clients
//     wss.clients.forEach(client => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ topic, message: message.toString() }));
//         }
//     });
// });
