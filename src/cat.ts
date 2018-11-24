import {Position} from "./Point";

export class Cat {
    private position: Position;
    private readonly fitnessValue: number;
    private velocity: Position;
    private mode: boolean;
    private selectionProperty: number;

    constructor(position: Position, velocity: Position) {
        this.position = position;
        this.fitnessValue = 10000;
        this.velocity = velocity;
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
        this.velocity = velocity;
    }

    calculateFitness(): number {

        //TODO

        return this.fitnessValue;
    }

    public set SelectionProb(selectionProb: number) {
        this.selectionProperty = selectionProb;
    }

    public get SelectionProb(): number {
        return this.selectionProperty;
    }
}
