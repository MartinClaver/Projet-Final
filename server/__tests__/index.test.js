const request = require('supertest');
const WebSocket = require('ws');
const mqtt = require('mqtt');

// Mock des modules
jest.mock('@supabase/supabase-js', () => ({
    createClient: jest.fn(() => ({
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({ data: [], error: null })
    }))
}));

jest.mock('mqtt');

// Import de l'application
const { app, connectMQTT } = require('../index');

describe('Server Tests', () => {
    let server;

    beforeAll(() => {
        server = app.listen(0);
    });

    afterAll((done) => {
        server.close(done);
    });

    test('GET / should return "WebSocket server is running."', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('WebSocket server is running.');
    });

    test('GET /test should return stats from Supabase', async () => {
        const mockStats = [{ id: 1, name: 'Test Stat' }];
        const { createClient } = require('@supabase/supabase-js');
        createClient().from().select.mockResolvedValue({ data: mockStats, error: null });

        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStats);
    }, 10000);

    test('GET /test should handle Supabase error', async () => {
        const { createClient } = require('@supabase/supabase-js');
        createClient().from().select.mockResolvedValue({ data: null, error: new Error('Supabase error') });

        const response = await request(app).get('/test');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal Server Error' });
    }, 10000);
});

describe('WebSocket Tests', () => {
    let server;
    let wss;

    beforeAll(() => {
        server = app.listen(0);
        wss = new WebSocket.Server({ server, path: '/ws' });
    });

    afterAll((done) => {
        wss.close(() => {
            server.close(done);
        });
    });

    test('WebSocket should handle connection', (done) => {
        const ws = new WebSocket(`ws://localhost:${server.address().port}/ws`);

        ws.on('open', () => {
            expect(ws.readyState).toBe(WebSocket.OPEN);
            ws.close();
        });

        ws.on('close', () => {
            done();
        });
    });
});

describe('MQTT Tests', () => {
    let mqttClientMock;

    beforeEach(() => {
        mqttClientMock = {
            on: jest.fn(),
            subscribe: jest.fn()
        };
        mqtt.connect.mockReturnValue(mqttClientMock);
    });

    test('MQTT client should connect and subscribe', () => {
        connectMQTT();

        expect(mqtt.connect).toHaveBeenCalledWith('mqtt://192.168.43.134:1883');
        expect(mqttClientMock.subscribe).toHaveBeenCalledWith(
            ['esp32/track', 'esp32/sonar', 'esp32/light'],
            expect.any(Function)
        );
    });

    test('MQTT client should handle messages', () => {
        connectMQTT();

        const messageCallback = mqttClientMock.on.mock.calls.find(call => call[0] === 'message')[1];
        const mockWsClient = { readyState: WebSocket.OPEN, send: jest.fn() };
        global.wss = { clients: [mockWsClient] };

        messageCallback('test/topic', 'test message');

        expect(mockWsClient.send).toHaveBeenCalledWith(JSON.stringify({
            topic: 'test/topic',
            message: 'test message'
        }));
    });
});
