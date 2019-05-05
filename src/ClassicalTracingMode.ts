import { Cat } from "./cat";
import { Position } from "./Point";
import { Point } from "./message.interface";
import { ITracingMode } from "./ITracingMode.interface";
import * as MersenneTwister from 'mersenne-twister';


export class ClassicalTracingMode implements ITracingMode {
    private r: number;
    private static readonly mersenneTwister = new MersenneTwister();
    constructor(private readonly c: number, private readonly searchDomain: { min: Point, max: Point }) {
    }

    private updateVelocity(actualVelocity: Position, xbest: Position): Position {
        if (actualVelocity === undefined) { console.log('undefined velocity'); }
        if (xbest === undefined) { console.trace('undefined xbest'); }

        return new Position(
            actualVelocity.x + this.r * this.c * (xbest.x - actualVelocity.x),
            actualVelocity.y + this.r * this.c * (xbest.y - actualVelocity.y));
    }

    private static limitRange(value: number, min: number, max: number) {
        return Math.max(min, Math.min(max, value));
    }

    private checkVelocity(velocity: Position): Position {
        const newPosition = velocity;
        const limitx = (x) => ClassicalTracingMode.limitRange(x, this.searchDomain.min.x, this.searchDomain.max.x);
        const limity = (y) => ClassicalTracingMode.limitRange(y, this.searchDomain.min.y, this.searchDomain.max.y);
        return new Position(
            limitx(newPosition.x),
            limity(newPosition.y)
        );
    }

    trace(cat: Cat, xbest: Position): void {
        this.r = ClassicalTracingMode.mersenneTwister.random();
        cat.Position = this.checkVelocity(this.updateVelocity(cat.Velocity, xbest));
    }
}