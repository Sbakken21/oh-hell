import {Deck} from "./Deck";
import {Client} from "./Client";
import { Card } from "./Card";

export class Game {
    private id: string;
    private name: string;
    private maxPlayers: number;
    private players: any;
    private playerPositions: string[];
    private owner: Client;
    private round: number;
    private deck: Deck;
    private trump: Card;
    private bidsTaken: number;
    private cardsTaken: number;
    private phase: number;

    constructor(id: string, owner: Client, maxPlayers: number) {
        this.id = id;
        this.owner = owner;
        this.players = {};
        this.playerPositions = [];
        this.round = 0;
        this.maxPlayers = maxPlayers;
        this.bidsTaken = 0;
        this.cardsTaken = 0;
        this.phase = 0;
    }

    start() {
        this.deck = new Deck();
        this.round++;
        this.bidsTaken = 0;

        for(const player of Object.values(this.getPlayers())) {
            player.setHand(this.deck.getPlayerHand(this.round));
        }

        this.setTrump();
    }

    getTrump() {
        return this.trump;
    }

    setTrump() {
        this.trump = this.deck.removeCard();
    }

    getId() {
        return this.id;
    }

    addPlayer(player: Client) {
        this.players[player.getSocketId()] = player;
        this.playerPositions.push(player.getSocketId());
    }

    getPlayers(): object {
        return this.players;
    }

    getRound() {
        return this.round;
    }

    getMaxPlayers() {
        return this.maxPlayers;
    }

    getPlayerCount() {
        return Object.entries(this.players).length;
    }

    getActivePlayer() {
        for(const player of Object.values(this.getPlayers())) {
            if(player.getActive()) {
                return {
                    name: player.getName(),
                    id: player.getSocketId(),
                }
            }
        }
    }

    getPlayer(socketId: string) {
        return this.players[socketId];
    }

    getPlayerPositions() {
        return this.playerPositions;
    }

    setBid(player: Client, bid: number) {
        player.setBid(bid);
        this.bidsTaken++;
    }

    getBidsTaken() {
        return this.bidsTaken;
    }

    setActivePlayer(position: number) {
        for(const player of Object.values(this.getPlayers())) {
            if(player.getSocketId() === this.getPlayerPositions()[position]) {
                player.setActive(true);
            } else {
                player.setActive(false);
            }
        }
    }

    setPhase(phase: number) {
        this.phase = phase;
    }

    getPhase() {
        return this.phase;
    }

    // setCardTaken(player: Client, card: Card) {

    // }
}