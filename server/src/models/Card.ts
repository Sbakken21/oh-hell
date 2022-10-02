export class Card {
    private suit: string;
    private value: number;

    constructor(suit: string, value: number) {
        this.suit = suit;
        this.value = value;
    }

    getSuit() {
        return this.suit;
    }

    getValue() {
        return this.value;
    }
}