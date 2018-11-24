import {Point} from "./message.interface";

export class Cat {
    private position: Point;
    private fitnessValue: number;
    private velocity: Point;
    private mode: Boolean;
    private selectionProperty: number;

    constructor(position: Point, velocity: Point) {
        this.position = position;
        this.fitnessValue = 10000;
        this.velocity = velocity;
    }

    setMode(mode: Boolean) {
        this.mode = mode;
    }

    getMode(): Boolean {
        return this.mode;
    }

    getPosition(): Point {
        return this.position;
    }

    setPosition(position: Point) {
        this.position = position;
    }

    getVelocity(): Point {
        return this.velocity;
    }

    setVelocity(velocity: Point): void {
        this.velocity = velocity;
    }

    calculateFitness(): number {

        //TODO

        return this.fitnessValue;
    }

    setSelectionProb(selectionProb: number) {
        this.selectionProperty = selectionProb;
    }

    getSelectionProb(): number {
        return this.selectionProperty;
    }
}
