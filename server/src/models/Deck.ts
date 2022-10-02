import {Card} from "../models/Card";

export class Deck {
    private cards: Card[];

    constructor() {
        this.cards = [];

        for(let value=1; value<14; value++){
            for(const suit of ['spade', 'club', 'heart', 'diamond']) {
                this.cards.push(new Card(suit, value));
            }
        }

        this.shuffleDeck();
    }

    removeCard() {
        return this.cards.pop();
    }

    getPlayerHand(amount: number) {
        return this.cards.splice(0, amount);
    }

    getDeck() {
        return this.cards;
    }

    shuffleDeck() {
        for(let i=this.cards.length-1; i>0; i--) {
            const j = Math.floor(Math.random() * i);
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}