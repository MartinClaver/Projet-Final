import React, { createContext, useContext, useEffect, useState } from 'react';
import WebSocket from 'react-native-websocket';

// Create a Context for the WebSocket
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://192.168.43.136/ws');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (e) => {
            console.log('Received:', e.data);
        };

        socket.onerror = (e) => {
            console.log('WebSocket error:', e.message);
        };

        socket.onclose = (e) => {
            console.log('WebSocket closed:', e.code, e.reason);
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
