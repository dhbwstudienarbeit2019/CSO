import {ISeekingMode} from "./ISeekingMode.interface";
import {Cat} from "./cat";
import {Position} from "./Point";
import * as MersenneTwister from 'mersenne-twister';

export class ClassicalSeekingMode implements ISeekingMode {
    private cat: Cat;
    private copies: Cat[];
    private fitnessValues: number[];
    private readonly mersenneTwister = new MersenneTwister();
    private j: number;

    constructor(private readonly seekingMemoryPool: number,
                private readonly seekingRangeOfSelectedDimension: number,
                private readonly countsOfDimensionsToChange: number,
                private readonly selfPositionConsidering: boolean) {
    }

    private createCopies(): void {
        this.j = this.seekingMemoryPool;
        this.copies = new Cat[this.seekingMemoryPool];
        if (this.selfPositionConsidering) {
            this.j = this.j - 1;
            this.copies[this.j] = this.cat;
        }
        for (let i = 0; i < this.j; i++) {
            const position = Position.doRandomPosition();
            const velocity = Position.doRandomPosition();
            this.copies[i] = new Cat(position, velocity, this.cat.FunctionToOptimize);
        }
    }

    private changePosition(cat: Cat) {
        if (this.countsOfDimensionsToChange == 1) {
            const dimension = this.mersenneTwister.random();
            const randomMove = (pos: Position, x, y) => ((this.mersenneTwister.random() > 0.5) ? pos.add : pos.subtract)(x, y);
            if (dimension < 0.5) {
                cat.Position = randomMove(cat.Position, cat.Position.x * this.seekingRangeOfSelectedDimension, 0);
            } else {
                cat.Position = randomMove(cat.Position, 0, cat.Position.y * this.seekingRangeOfSelectedDimension);
            }
        }
        if (this.countsOfDimensionsToChange == 2) {
            const randomOffset = (value, offset) => value + (this.mersenneTwister.random() < 0.5) ? -offset : offset;
            const catPos = cat.Position;
            cat.Position = new Position(
                randomOffset(catPos.x, catPos.x * this.seekingRangeOfSelectedDimension),
                randomOffset(catPos.y, catPos.y * this.seekingRangeOfSelectedDimension)
            );
        }
    }

    private calculateSelectionProb(allTheSame: Boolean, fitnessMax: number, fitnessMin: number): void {
        if (allTheSame) {
            this.copies.forEach(cat => cat.SelectionProb = 1);
        } else {
            this.copies.forEach(cat =>
                cat.SelectionProb = Math.abs((cat.calculateFitness() - fitnessMax)) / (fitnessMax - fitnessMin)
            );
        }
    }

    private chooseNewPosition(): Position {
        let selectedCat;
        let probability = new Number[this.seekingMemoryPool + 1];
        probability[0] = 0;
        for (let i = 0; i < this.seekingMemoryPool; i++) {
            probability[i + 1] = this.copies[i].SelectionProb + probability[i]
        }
        const twist = this.mersenneTwister.random();
        let selected = false;
        while (!selected) {
            for (let i = 0; i < probability.length; i++) {
                if (probability[i] > twist) {
                    selectedCat = i - 1;
                    selected = true;
                }
            }
        }
        return this.copies[selectedCat].Position;
    }

    seek(cat: Cat, fitnessMax: number, fitnessMin: number): void {
        let allTheSame: Boolean;
        this.fitnessValues = new Number[this.seekingMemoryPool];
        this.createCopies();
        for (let i = 0; i < this.j; i++) {
            this.changePosition(this.copies[i]);
            this.fitnessValues[i] = this.copies[i].calculateFitness();
        }
        if (this.selfPositionConsidering) {
            this.fitnessValues[this.j] = this.copies[this.j].calculateFitness();
        }
        for (let i = 1; i < this.fitnessValues.length; i++) {
            if (this.fitnessValues[i - 1] != this.fitnessValues[i]) {
                allTheSame = false;
                break;
            } else {
                allTheSame = true;
            }
        }
        this.calculateSelectionProb(allTheSame, fitnessMax, fitnessMin);
        cat.Position = this.chooseNewPosition();
    }
}
