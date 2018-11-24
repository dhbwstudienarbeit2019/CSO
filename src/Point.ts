import {Point} from "./message.interface";
import * as MersenneTwister from 'mersenne-twister';


export class Position implements Point {
    static readonly mersenneTwister = new MersenneTwister();

    constructor(public readonly x: number,
                public readonly y: number) {
        console.log(Position.mersenneTwister);
    }

    subtract(x: number, y: number) {
        return new Position(this.x - x, this.y - y);
    }

    add(x: number, y: number) {
        return new Position(this.x + x, this.y + y);
    }

    static doRandomPosition(): Position {
        return new Position(Position.mersenneTwister.random(), Position.mersenneTwister.random());
    }
}

