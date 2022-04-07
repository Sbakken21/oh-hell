import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Deck } from "./Deck";
import { Hand } from "./Hand";

const app: Application = express();
const httpServer = createServer(app);
const port = 3000;
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8080"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);
    const deck = new Deck();
    const hand = new Hand(4);
    for(let i=1; i<=4; i++){
        hand.addCard(deck.removeCard());
    }
    console.log(hand.getHand());
});

httpServer.listen(port);