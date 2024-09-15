// Fichier Setup Jest

// Mock les appels WS car manque de voiture pour bien tester
global.WebSocket = jest.fn(() => ({
    send: jest.fn(),
    close: jest.fn(),
    onopen: jest.fn(),
    onmessage: jest.fn(),
    onerror: jest.fn(),
    onclose: jest.fn(),
}));

// Mock l'orientation de l'écran
jest.mock('expo-screen-orientation', () => ({
    lockAsync: jest.fn().mockResolvedValue(undefined),
    unlockAsync: jest.fn().mockResolvedValue(undefined),
    OrientationLock: {
        LANDSCAPE: 'LANDSCAPE',
    },
}));
