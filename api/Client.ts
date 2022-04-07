export class Client {
    private socketId: string;
    private status: string;
    private name: string;
    private score: number;

    constructor(socketId: string, status: string, name: string){
        this.socketId = socketId;
        this.status = status;
        this.name = name;
        this.score = 0;
    }

    getSocketId(){
        return this.socketId;
    }

    getName(){
        return this.name;
    }

    setName(name: string){
        this.name = name;
    }

    getStatus(){
        return this.status;
    }

    setStatus(status: string){
        this.status = status;
    }

    getScore(){
        return this.score;
    }

    setScore(score: number){
        this.score = score;
    }
}