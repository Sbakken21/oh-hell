export class Hand {
    private hand: Array<any>;
    private round: number;

    constructor(round: number){
        this.round = round;
        this.hand = [];
    }

    addCard(card: object){
        this.hand.push(card);
    }

    getHand(){
        return this.hand;
    }
}