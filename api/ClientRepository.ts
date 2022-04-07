import { Client } from "./Client";

export class ClientRepository {
    private clients: Array<any>;

    constructor(){
        this.clients = [];
    }

    getClients(){
        return this.clients;
    }

    addClient(client: object){
        this.clients.push(client);
        return client;
    }

    getClientBySocketId(socketId: string){
        return this.clients.find((element) => { return element.socketId === socketId; });
    }
}