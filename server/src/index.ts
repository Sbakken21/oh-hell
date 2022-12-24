import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ClientService } from "./services/ClientService";
import { GameService } from "./services/GameService";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const port = process.env.SERVER_PORT;
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080"
    }
});

const clientService = new ClientService();
const gameService = new GameService();

io.on("connection", (socket) => {
    clientService.addClient(socket);

    socket.on("lobby.create", (lobbyData) => {
        const client = clientService.getClient(socket.id);
        const game = gameService.addGame(client, lobbyData.maxPlayers);
        socket.join(game.getId());

        // tslint:disable-next-line:no-console
        console.log('Game ID: ' + game.getId());
        io.to(client.getSocketId()).emit('client.join', game.getId());
    });

    socket.on("lobby.join", (data) => {
        const client = clientService.getClient(socket.id);

        const game = gameService.getGame(data.gameId);
        socket.join(game.getId());
        game.addPlayer(client);

        const players = game.getPlayers();
        const playerList: any[] = [];

        for(const [index, socketKey] of game.getPlayerPositions().entries()) {
            const player = game.getPlayer(socketKey);
            if(index === 0) player.setActive(true);

            const playerInfo = {
                name: player.getName(),
                score: player.getScore(),
                status: player.getStatus(),
                socketId: player.getSocketId(),
                bid: player.getBid(),
                isActive: player.getActive(),
            };

            playerList.push(playerInfo);
        }

        // tslint:disable-next-line:no-console
        console.log(playerList);

        io.in(game.getId()).emit("lobby.join", {
            players: playerList
        });

        // tslint:disable-next-line:no-console
        console.log(`Player Count: ${game.getPlayerCount()}, ${game.getMaxPlayers()}`);

        if(game.getPlayerCount() === game.getMaxPlayers()){
            // tslint:disable-next-line:no-console
            console.log("Starting game...");
            game.start();

            io.in(game.getId()).emit("lobby.join", {
                trump: game.getTrump(),
                round: game.getRound(),
                players: playerList,
                phase: game.getPhase(),
                activePlayer: game.getActivePlayer(),
            });

            for(const player of Object.values(players)) {

                // tslint:disable-next-line:no-console
                console.log("HAND: " + player.getHand());


                // tslint:disable-next-line:no-console
                console.log("SOCKET: " + player.getSocketId());

                const playerInfo = {
                    hand: player.getHand(),
                    name: player.getName(),
                    score: player.getScore(),
                    status: player.getStatus(),
                    isActive: player.getActive(),
                };

                io.to(player.getSocketId()).emit("player.round", playerInfo);
            }
        }
    });

    socket.on("player.bid", (data) => {
        const game = gameService.getGame(data.gameId);
        const playerRef = game.getPlayer(socket.id);
        const bidsTaken = game.getBidsTaken();

        if(playerRef.getSocketId() === game.getPlayerPositions()[bidsTaken]){
            // tslint:disable-next-line:no-console
            console.log("BID: " + data.bid);
            game.setBid(playerRef, data.bid);
            game.setActivePlayer(game.getBidsTaken());
        }

        const players = game.getPlayers();
        const playerList: any[] = [];

        for(const player of Object.values(players)) {

            const playerInfo = {
                name: player.getName(),
                score: player.getScore(),
                status: player.getStatus(),
                socketId: player.getSocketId(),
                bid: player.getBid(),
                isActive: player.getActive(),
            };

            playerList.push(playerInfo);

            const emitPlayerInfo = {
                hand: player.getHand(),
                name: player.getName(),
                score: player.getScore(),
                status: player.getStatus(),
                isActive: player.getActive(),
            };

            io.to(player.getSocketId()).emit("player.update", emitPlayerInfo);
        }

        // End of bidding phase. TODO: start play phase
        if(game.getBidsTaken() >= game.getPlayerCount()) {
            game.setPhase(1);
            game.setActivePlayer((game.getRound() % game.getPlayerCount()) - 1);

        }

        io.in(game.getId()).emit("player.bid", {
            trump: game.getTrump(),
            round: game.getRound(),
            players: playerList,
            phase: game.getPhase(),
            activePlayer: game.getActivePlayer(),
        });
    });

    socket.on("player.play", (data) => {
        const game = gameService.getGame(data.gameId);
        const playerRef = game.getPlayer(socket.id);

        // tslint:disable-next-line:no-console
        console.log(playerRef);

        // TODO: check if card is playable here. Also needs frontend check



    });


    socket.on("disconnect", () => {
        clientService.removeClient(socket.id);

        // TODO: this needs to remove clients from the game as well

        // tslint:disable-next-line:no-console
        console.log("USER DISCONNECTED: " + socket.id);
    });
});

// Auth middleware
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if(!username) {
        return next(new Error("Invalid username"));
    }
    (socket as any).username = username;
    next();
});

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

httpServer.listen(port);