const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const WebSocket = require('ws');
const mqtt = require('mqtt');

dotenv.config();

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const mqttClient = mqtt.connect('mqtt://192.168.43.134:1883');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Route pour check si le server run correctement sur localhost:4000
app.get('/', (req, res) => {
    res.send('WebSocket server is running.');
});

// Route pour check si le server et superbase se connecte bien
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

// Expo GO et localhost pas compatible - test front + back insert
// app.post('/insertStats', async (req, res) => {
//     const { date_in_db, total_time, motionTimer, max_speed } = req.body;

//     const { data, error } = await supabase
//         .from('stats')
//         .insert([
//             { created_at, 'total-time': total_time, motion_time, 'max-speed': max_speed, distance }
//         ]);

//     if (error) {
//         console.error('Error inserting stats:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//         res.status(201).json(data);
//     }
// });

const server = app.listen(port, () => {
    console.log(`HTTP server running on http://localhost:${port}`);
});

// WebSocket setup
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log(`Received: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

const connectMQTT = () => {
    const mqttClient = mqtt.connect('mqtt://192.168.43.134:1883');

    mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker');
        mqttClient.subscribe(['esp32/track', 'esp32/sonar', 'esp32/light'], (err, granted) => {
            if (err) {
                console.error('Subscription error:', err);
            } else {
                console.log('Subscription successful:', granted);
            }
        });
    });

    mqttClient.on('error', (err) => {
        console.error('MQTT Client Error:', err);
    });

    mqttClient.on('message', (topic, message) => {
        console.log(`MQTT message received on topic ${topic}: ${message.toString()}`);
        // Broadcast the message to all connected WebSocket clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ topic, message: message.toString() }));
            }
        });
    });

    return mqttClient;
};


module.exports = {
    app,
    connectMQTT
};