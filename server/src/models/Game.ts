import {Deck} from "./Deck";
import {Client} from "./Client";
import { Card } from "./Card";

export class Game {
    private id: string;
    private name: string;
    private maxPlayers: number;
    private players: any;
    private owner: Client;
    private round: number;
    private deck: Deck;
    private trump: Card;

    constructor(id: string, owner: Client, maxPlayers: number) {
        this.id = id;
        this.owner = owner;
        this.players = {};
        this.round = 1;
        this.maxPlayers = maxPlayers;
    }

    start() {
        this.deck = new Deck();
        
        for(const id in this.players) {
            const player = this.players[id];

            player.setHand(this.deck.getPlayerHand(this.round));
        }

        // this.players.forEach((player) => {
        //     player.setHand(this.deck.getPlayerHand(this.round));
        // });

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
    }

    getPlayers() {
        return this.players;
        // const playerOutput: { name: string; score: number; status: number; socketId: string; bid: number; isActive: boolean; }[] = [];

        // for(const id in this.players) {
        //     const player = this.players[id];

        //     let playerInfo = {
        //         name: player.getName(),
        //         score: player.getScore(),
        //         status: player.getStatus(),
        //         socketId: player.getSocketId(),
        //         bid: player.getBid(),
        //         isActive: player.getActive(),
        //     };

        //     playerOutput.push(playerInfo); 
        // }

        // // this.players.forEach((player) => {
        // //     let playerInfo = {
        // //         name: player.getName(),
        // //         score: player.getScore(),
        // //         status: player.getStatus(),
        // //         socketId: player.getSocketId(),
        // //         bid: player.getBid(),
        // //         isActive: player.getActive(),
        // //     };

        // //     playerOutput.push(playerInfo);
        // // });
        
        // return playerOutput;
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

        for(const id in this.players) {
            const player = this.players[id];
            if(player.getActive()) return player;
        }

        // return this.players.forEach((player) => {
        //     if(player.getActive()) return player;
        // })
    }

    getPlayer(socketId: string) {

        return this.players[socketId];

        // return this.players.forEach((player) => {
        //     if(player.getSocketId() == socketId) {
        //         return player;
        //     }
        // });
    }
}