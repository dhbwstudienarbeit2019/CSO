import { ISeekingMode } from "./ISeekingMode.interface";
import { Cat } from "./cat";
import { Position } from "./Point";
import * as MersenneTwister from 'mersenne-twister';

export class ClassicalSeekingMode implements ISeekingMode {
    private fitnessValues: number[];
    private readonly mersenneTwister = new MersenneTwister();
    private j: number;

    constructor(private readonly seekingMemoryPool: number,
        private readonly seekingRangeOfSelectedDimension: number,
        private readonly countsOfDimensionsToChange: number,
        private readonly selfPositionConsidering: boolean,
    ) { }

    private createCopies(cat: Cat): Cat[] {
        this.j = this.seekingMemoryPool;
        const copies = []
        if (this.selfPositionConsidering) {
            this.j = this.j - 1;
            copies[this.j] = cat;
        }
        for (let i = 0; i < this.j; i++) {
            const position = cat.Position;
            const velocity = Position.doRandomPosition();
            copies[i] = new Cat(position, velocity, cat.FunctionToOptimize);
        }
        return copies;
    }

    private changePosition(cat: Cat) {
        if (cat.Position === undefined) {
            console.error('catpos undefined');
        }
        const catPos = cat.Position;
        if (this.countsOfDimensionsToChange == 1) {
            const dimension = this.mersenneTwister.random();
            const randomMove = (pos: Position, x, y) => ((this.mersenneTwister.random() > 0.5) ? pos.add : pos.subtract)(x, y);
            if (dimension < 0.5) {
                cat.Position = randomMove(catPos, catPos.x * this.seekingRangeOfSelectedDimension, 0);
            } else {
                cat.Position = randomMove(catPos, 0, catPos.y * this.seekingRangeOfSelectedDimension);
            }
        }
        if (this.countsOfDimensionsToChange == 2) {
            const randomOffset = (value, offset) => value + (this.mersenneTwister.random() < 0.5) ? -offset : offset;
            cat.Position = new Position(
                randomOffset(catPos.x, catPos.x * this.seekingRangeOfSelectedDimension),
                randomOffset(catPos.y, catPos.y * this.seekingRangeOfSelectedDimension)
            );
        }
    }

    private calculateSelectionProb(copies: Cat[], fitnessMax: number, fitnessMin: number): void {
        let allTheSame = false;
        for (let i = 1; i < this.fitnessValues.length; i++) {
            allTheSame = (this.fitnessValues[i - 1] === this.fitnessValues[i]);
            if (!allTheSame) {
                break;
            }
        }
        if (allTheSame) {
            copies.forEach(cat => cat.SelectionProb = 1);
        } else {
            copies.forEach(cat =>
                cat.SelectionProb = Math.abs((cat.calculateFitness() - fitnessMin) / (fitnessMax - fitnessMin))
            );
        }
    }

    private chooseNewPosition(copies: Cat[]): Position {
        let selectedCat: number;
        let probability = []
        probability[0] = 0;
        for (let i = 0; i < this.seekingMemoryPool; i++) {
            probability[i + 1] = copies[i].SelectionProb + probability[i];
        }
        let probhigh = probability[this.seekingMemoryPool - 1];
        for (let i = 0; i < this.seekingMemoryPool; i++) {
            probability[i] = probability[i] / probhigh;
        }
        const twist = this.mersenneTwister.random();
        for (let i = 0; i < probability.length; i++) {
            if (probability[i] > twist) {
                selectedCat = i - 1;
                break;
             }
       }
        return copies[selectedCat].Position;
    }

    seek(cat: Cat, fitnessMax: number, fitnessMin: number): void {
        this.fitnessValues = new Array(this.seekingMemoryPool);
        const copies: Cat[] = this.createCopies(cat);
        for (let i = 0; i < this.j; i++) {
            this.changePosition(copies[i]);
            this.fitnessValues[i] = copies[i].calculateFitness();
        }
        if (this.selfPositionConsidering) {
            this.fitnessValues[this.j] = copies[this.j].calculateFitness();
        }
        this.calculateSelectionProb(copies, fitnessMax, fitnessMin);
        cat.Position = this.chooseNewPosition(copies);
    }
}
