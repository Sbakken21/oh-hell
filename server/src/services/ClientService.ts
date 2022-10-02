import { Client } from "../models/Client";

export class ClientService {
    private clients: { [key: string]: Client; };

    constructor() {
        this.clients = {};
    }

    addClient(socket: any) {
        const client = new Client(socket);

        this.clients[client.getSocketId()] = client;
    }

    getClient(socketId: string) {
        return this.clients[socketId];
    }

    removeClient(socketId: string) {
        delete this.clients[socketId];
    }
}