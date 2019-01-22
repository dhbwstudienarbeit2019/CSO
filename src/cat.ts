import { Position } from "./Point";
import { Point } from "./message.interface";

export class Cat {
    private position: Position;
    private velocity: Position;
    private mode: boolean;
    private selectionProperty: number;
    private functionToOptimize: (x: number, y: number) => number;

    constructor(position: Position, velocity: Position, functionToOptimize: (x: number, y: number) => number) {
        this.position = position;
        this.velocity = velocity;
        this.functionToOptimize = functionToOptimize;
    }

    public get FunctionToOptimize(): ((x: number, y: number) => number) {
        return this.functionToOptimize;
    }

    public set Mode(mode: boolean) {
        this.mode = mode;
    }

    public get Mode(): boolean {
        return this.mode;
    }

    public get Position(): Position {
        return this.position;
    }

    public set Position(position: Position) {
        this.position = position;
    }

    public get Velocity(): Position {
        return this.velocity;
    }

    public set Velocity(velocity: Position) {
        if (velocity === undefined) {
            console.trace();
        }
        this.velocity = velocity;
    }

    calculateFitness(): number {
        return this.functionToOptimize(this.position.x, this.position.y);
    }

    public set SelectionProb(selectionProb: number) {
        this.selectionProperty = selectionProb;
    }

    public get SelectionProb(): number {
        return this.selectionProperty;
    }
}
