import { Point } from "./message.interface";
const MersenneTwister = require('mersenne-twister');

export class Position implements Point {
    static readonly mersenneTwister = new MersenneTwister();

    constructor(public readonly x: number,
        public readonly y: number) {
    }
    compareToPoint(point: Point, sigma: number) {
        return this.subtract(point.x, point.y).asAbsoluteDistance() < sigma;
    }
    asAbsoluteDistance() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    subtract(x: number, y: number) {
        return new Position(this.x - x, this.y - y);
    }

    add(x: number, y: number) {
        return new Position(this.x + x, this.y + y);
    }

    static doRandomPosition(minX: number = 0, maxX: number = 1, minY: number = 0, maxY: number = 1): Position {
        return new Position(
            minX + (maxX - minX) * Position.mersenneTwister.random(),
            minY + (maxY - minY) * Position.mersenneTwister.random());
    }
}

