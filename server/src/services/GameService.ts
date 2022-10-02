import { Client } from "../models/Client";
import {Game} from "../models/Game";

export class GameService {
    private games: { [key: string]: Game; };

    constructor() {
        this.games = {};
    }

    addGame(owner: Client, maxPlayers: number) {
        let id = this.createId();

        while(this.games[id]){
            id = this.createId();
        }

        const game = new Game(id, owner, maxPlayers);

        this.games[game.getId()] = game;

        return game;
    }

    // TODO: testing only
    getGames(){
        return this.games;
    }

    getGame(gameId: string) {
        return this.games[gameId];
    }

    createId() {
        return Math.random().toString(36).slice(2, 7);
    }
}