import * as WebSocket from 'ws';
import { UserMessage } from './models';

// Create a new WebSocket server
const port: number = Number(process.env.PORT) || 3000;
const server: WebSocket.Server = new WebSocket.Server({ port: port });

// Add a handler when clients connect to the WebSocket
server.on('connection', ws => {
    console.log('new connection');
    // Whenever we receive a message, parse it into our UserMessage model and broadcast
    // it to all connected clients
    ws.on('message', message => {
        try {
            const userMessage: UserMessage = new UserMessage(message.toString());
            broadcast(JSON.stringify(userMessage));
        } catch (e: any) { }
    });
});

function broadcast(data: string): void {
    server.clients.forEach(client => {
        client.send(data);
    });
};

console.log('Server is running on port', port);