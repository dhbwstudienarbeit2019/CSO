import {Cat} from "./cat";
import {Position} from "./Point";
import {Point} from "./message.interface";
import {ITracingMode} from "./ITracingMode.interface";
import * as MersenneTwister from 'mersenne-twister';


export class ClassicalTracingMode implements ITracingMode {
    private r: number;

    constructor(private readonly c: number, private readonly searchDomain: {min: Point, max: Point}) {
    }

    private updateVelocity(actualVelocity: Position, xbest: Position): Position {
        return new Position(
            actualVelocity.x + this.r * this.c * (xbest.x - actualVelocity.x),
            actualVelocity.y + this.r * this.c * (xbest.y - actualVelocity.y));
    }

    private static limitRange(value: number, min: number, max: number) {
        return Math.max(min, Math.min(max, value));
    }

    private checkVelocity(cat: Cat, velocity: Position): Position {
        const catPosition = cat.Position;
        const limitx = (x) => ClassicalTracingMode.limitRange(x, this.searchDomain.min.x, this.searchDomain.max.x);
        const limity = (y) => ClassicalTracingMode.limitRange(y, this.searchDomain.min.y, this.searchDomain.max.y);
        return new Position(
            limitx(catPosition.x),
            limity(catPosition.y)
        );
    }

    trace(cat: Cat, xbest: Position): void {
        this.r = MersenneTwister.random();
        cat.Position = this.checkVelocity(cat, this.updateVelocity(cat.Velocity, xbest));
    }
}