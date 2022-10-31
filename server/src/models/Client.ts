import {Card} from "./Card";

export class Client {
    private socketId: string;
    private socket: object;
    private status: number;
    private name: string;
    private score: number;
    private lobby: string;
    private hand: Card[];
    private bid: number;
    private active: boolean;

    constructor(socket: any) {
        this.socketId = socket.id;
        this.socket = socket;
        this.score = 0;
        this.status = 1;
        this.name = socket.username;
        this.hand = [];
        this.active = false;
        this.bid = null;
    }

    getSocketId() {
        return this.socketId;
    }

    setSocketId(socketId: string) {
        this.socketId = socketId;
    }

    getSocket() {
        return this.socketId;
    }

    setSocket(socket: object) {
        this.socket = socket;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status: number) {
        this.status = status;
    }

    getScore() {
        return this.score;
    }

    setScore(score: number) {
        this.score = score;
    }

    getLobby() {
        return this.lobby;
    }

    setLobby(lobby: string) {
        this.lobby = lobby;
    }

    getHand() {
        return this.hand;
    }

    setHand(cards: Card[]) {
        this.hand = cards;
    }

    getBid() {
        return this.bid;
    }

    setBid(bid: number) {
        this.bid = bid;
    }

    getActive() {
        return this.active;
    }

    setActive(active: boolean) {
        this.active = active;
    }
}