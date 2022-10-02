import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "./models/Game";
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
        const playerTest: any[] = [];

        for(const id in players) {
            const player = players[id];

            let playerInfo = {
                name: player.getName(),
                score: player.getScore(),
                status: player.getStatus(),
                socketId: player.getSocketId(),
                bid: player.getBid(),
                isActive: player.getActive(),
            };

            playerTest.push(playerInfo);
        }

        // tslint:disable-next-line:no-console
        // console.log(playerTest);
        
        io.in(game.getId()).emit("lobby.join", {
            players: playerTest
        });

        // tslint:disable-next-line:no-console
        console.log(game.getPlayerCount(), game.getMaxPlayers());

        if(game.getPlayerCount() == game.getMaxPlayers()){
            console.log("Starting game...");
            game.start();

            io.in(game.getId()).emit("lobby.join", {
                trump: game.getTrump(),
                round: game.getRound(),
                players: playerTest
            });

            for(const id in players) {
                const player = players[id];
                console.log("HAND: " + player.getHand());
                console.log(player.getSocketId());
                io.to(player.getSocketId()).emit("player.round", player.getHand());
            }
        }
    });

    socket.on("player.bid", (data) => {
        const game = gameService.getGame(data.gameId);
        let player = game.getPlayer(socket.id);
        console.log("BID: " + data.bid);
        player.setBid(data.bid);

        const players = game.getPlayers();
        const playerTest: any[] = [];

        for(const id in players) {
            const player = players[id];

            let playerInfo = {
                name: player.getName(),
                score: player.getScore(),
                status: player.getStatus(),
                socketId: player.getSocketId(),
                bid: player.getBid(),
                isActive: player.getActive(),
            };

            playerTest.push(playerInfo);
        }

        io.in(game.getId()).emit("player.bid", {
            bidPlayer: game.getActivePlayer(),
            players: playerTest,
        });
    })


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