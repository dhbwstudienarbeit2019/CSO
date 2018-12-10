import { ISeekingMode } from "./ISeekingMode.interface";
import { Cat } from "./cat";
import { Position } from "./Point";
import * as MersenneTwister from 'mersenne-twister';

export class ClassicalSeekingMode implements ISeekingMode {
    private copies: Cat[];
    private fitnessValues: number[];
    private readonly mersenneTwister = new MersenneTwister();
    private j: number;

    constructor(private readonly seekingMemoryPool: number,
        private readonly seekingRangeOfSelectedDimension: number,
        private readonly countsOfDimensionsToChange: number,
        private readonly selfPositionConsidering: boolean,
    ) { }

    private createCopies(cat: Cat): void {

        this.j = this.seekingMemoryPool;
        this.copies = []//new Cat[this.seekingMemoryPool];
        if (this.selfPositionConsidering) {
            this.j = this.j - 1;
            this.copies[this.j] = cat;
        }
        for (let i = 0; i < this.j; i++) {
            const position = Position.doRandomPosition();
            const velocity = Position.doRandomPosition();
            this.copies[i] = new Cat(position, velocity, cat.FunctionToOptimize);
        }
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
        // console.log({ from: catPos, to: cat.Position });
    }

    private calculateSelectionProb(allTheSame: Boolean, fitnessMax: number, fitnessMin: number): void {
        if (allTheSame) {
            this.copies.forEach(cat => cat.SelectionProb = 1);
        } else {
            this.copies.forEach(cat =>
                cat.SelectionProb = Math.abs((cat.calculateFitness() - fitnessMin) / (fitnessMax - fitnessMin))
            );
        }
    }

    private chooseNewPosition(): Position {
        let selectedCat: number;
        let probability = new Array(this.seekingMemoryPool + 1);
        probability[0] = 0;
        for (let i = 0; i < this.seekingMemoryPool; i++) {
            probability[i + 1] = this.copies[i].SelectionProb + probability[i];
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
        this.fitnessValues = new Array(this.seekingMemoryPool);
        this.createCopies(cat);
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
