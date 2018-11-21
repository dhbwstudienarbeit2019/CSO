import * as mersenneTwister from './node_modules/mersenne-twister';

class Position {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }
    setX(x: number): void {
        this.x = x;
    }
    getY(): number {
        return this.y;
    }
    setY(y: number): void {
        this.y = y;
    }
    getPosition(): Position {
        return this;
    }
    setPosition(x: number, y: number) {
        this.setX(x);
        this.setY(y);
    }
    doRandomPosition(): Position {
        return new Position(mersenneTwister.random(), mersenneTwister.random());
    }
}

let results: Position[];
let running: Boolean;
let finished: Boolean;


class Cat {
    private position: Position;
    private fitnessValue: number;
    private velocity: Position;
    private mode: Boolean;
    private selectionProperty: number;

    constructor (position: Position, velocity: Position) {
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
    getPosition(): Position {
        return this.position;
    }
    setPosition(position: Position) {
        this.position = position;
    }
    getVelocity(): Position {
        return this.velocity;
    }
    setVelocity(velocity: Position): void {
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

interface ITracingMode {
    trace: (cat: Cat, xbest: Position) => void;
}

class ClassicalTracingMode implements ITracingMode {
    private r: number;
    private c: number;
    private searchDomain: Position;

    constructor(c: number, searchDomain: Position) {
        this.c = c;
        this.searchDomain = searchDomain;
    }

    private updateVelocity(actualVelocity: Position, xbest: Position): Position {
        let newVelocity = new Position(0,0);
        newVelocity.setX(actualVelocity.getX() + this.r * this.c * (xbest.getX() - actualVelocity.getX()));
        newVelocity.setY(actualVelocity.getY() + this.r * this.c * (xbest.getY() - actualVelocity.getY()));
        return newVelocity;
    }

    private checkVelocity(cat: Cat, velocity: Position): Position {
        let newPosition = new Position(0,0);
        newPosition.setX(cat.getPosition().getX() + velocity.getX());
        newPosition.setY(cat.getPosition().getY() + velocity.getY());
        if(newPosition.getX() < this.searchDomain.getX()) {
            newPosition.setX(this.searchDomain.getX());
        }
        if(newPosition.getY() < this.searchDomain.getX()) {
            newPosition.setY(this.searchDomain.getX());
        }
        if(newPosition.getX() > this.searchDomain.getY()) {
            newPosition.setX(this.searchDomain.getY());
        }
        if(newPosition.getY() > this.searchDomain.getY()) {
            newPosition.setY(this.searchDomain.getY());
        }
        return newPosition;
    }

    trace(cat: Cat, xbest: Position): void {
        this.r = mersenneTwister.random();
        cat.setPosition(this.checkVelocity(cat, this.updateVelocity(cat.getVelocity(), xbest)));
    }
}

interface ISeekingMode {
    seek: (cat: Cat, fitnessMax: number, fitnessMin: number) => void;
}

class ClassicalSeekingMode implements ISeekingMode {
    private seekingMemoryPool: number;
    private seekingRangeOfSelectedDimension: number;
    private countsOfDimensionsToChange: number;
    private selfPositionConsidering: Boolean;
    private cat: Cat;
    private copies: Cat[];
    private fitnessValues: number[];
    private j: number;

    constructor(seekingMemoryPool: number, 
                seekingRangeOfSelectedDimension: number, 
                countsOfDimensionsToChange: number, 
                selfPositionConsidering: Boolean) {
                    this.seekingMemoryPool = seekingMemoryPool;
                    this.seekingRangeOfSelectedDimension = seekingRangeOfSelectedDimension;
                    this.countsOfDimensionsToChange = countsOfDimensionsToChange;
                    this.selfPositionConsidering = selfPositionConsidering;
    }
    
    private createCopies(): void {
        this.j = this.seekingMemoryPool;
        this.copies = new Cat[this.seekingMemoryPool];
        if(this.selfPositionConsidering) {
            this.j = this.j - 1;
            this.copies[this.j] = this.cat;
        }
        for(let i = 0; i < this.j; i++) {
            const position = new Position(1,2).doRandomPosition();
            const velocity = new Position(1,2).doRandomPosition();
            this.copies[i] = new Cat(position, velocity);
        }
    }

    private changePosition(cat: Cat) {
        if(this.countsOfDimensionsToChange == 1) {
            const dimension = mersenneTwister.random();
            const changer = mersenneTwister.random();
            if(dimension < 0.5) {
                if(changer < 0.5) {
                    cat.setPosition(new Position(cat.getPosition().getX() + cat.getPosition().getX() * this.seekingRangeOfSelectedDimension, cat.getPosition().getY()));
                } else {
                    cat.setPosition(new Position(cat.getPosition().getX() - cat.getPosition().getX() * this.seekingRangeOfSelectedDimension, cat.getPosition().getY()));
                }
            } else {
                if(changer < 0.5) {
                    cat.setPosition(new Position(cat.getPosition().getX(), cat.getPosition().getY() + cat.getPosition().getY() * this.seekingRangeOfSelectedDimension));
                } else {
                    cat.setPosition(new Position(cat.getPosition().getX(), cat.getPosition().getY() - cat.getPosition().getY() * this.seekingRangeOfSelectedDimension));
                }
            }
        }
        if(this.countsOfDimensionsToChange == 2) {
            const changerX = mersenneTwister.random();
            const changerY = mersenneTwister.random();
            let changedPositionX: number;
            let changedPositionY: number;
            if(changerX < 0.5) {
                changedPositionX = cat.getPosition().getX() + cat.getPosition().getX() * this.seekingRangeOfSelectedDimension;
            } else {
                changedPositionX = cat.getPosition().getX() - cat.getPosition().getX() * this.seekingRangeOfSelectedDimension;
            }
            if(changerY < 0.5) {
                changedPositionY = cat.getPosition().getY() + cat.getPosition().getY() * this.seekingRangeOfSelectedDimension;
            } else {
                changedPositionY = cat.getPosition().getY() - cat.getPosition().getY() * this.seekingRangeOfSelectedDimension;
            }
            cat.setPosition(new Position(changedPositionX, changedPositionY));
        }
    }

    private calculateSelectionProb(allTheSame: Boolean, fitnessMax: number, fitnessMin: number): void {
        if(allTheSame) {
            this.copies.forEach(cat => {
                cat.setSelectionProb(1);
            });
        } else {
            this.copies.forEach(cat => {
                cat.setSelectionProb(Math.abs((cat.calculateFitness() - fitnessMax)) / (fitnessMax - fitnessMin));
            });
        }
    }

    private chooseNewPosition(): Position {
        //Erzeuge Rouletterad & Wende es an
        let selectedCat;
        let probability = new Number[this.seekingMemoryPool + 1];
        probability[0] = 0;
        for(let i = 0; i < this.seekingMemoryPool; i++) {
            probability[i + 1] = this.copies[i].getSelectionProb() + probability[i]
        }
        const twist = mersenneTwister.random();
        let selected = false;
        while(!selected) {
            for(let i = 0; i < probability.length; i++) {
                if(probability[i] > twist) {
                    selectedCat = i - 1;
                    selected = true;
                }
            }
        }
        return this.copies[selectedCat].getPosition();
    }

    seek(cat: Cat, fitnessMax: number, fitnessMin: number): void {
        let allTheSame: Boolean;
        this.fitnessValues = new Number[this.seekingMemoryPool];
        this.createCopies();
        for(let i = 0; i < this.j; i++) {
            this.changePosition(this.copies[i]);
            this.fitnessValues[i] = this.copies[i].calculateFitness();
        }
        if(this.selfPositionConsidering) {
            this.fitnessValues[this.j] = this.copies[this.j].calculateFitness();
        }
        for(let i = 1; i < this.fitnessValues.length; i++) {
            if(this.fitnessValues[i-1] != this.fitnessValues[i]) {
                allTheSame = false;
            } else {
                allTheSame = true;
            }
        }
        this.calculateSelectionProb(allTheSame, fitnessMax, fitnessMin);
        cat.setPosition(this.chooseNewPosition());
    }
}

class Application {
    private numberOfCats: number;
    private mixtureRatio: number;
    private selfPositionConsidering: Boolean;
    private seekingRangeOfSelectedDimension: number;
    private countsOfDimensionsToChange: number;
    private seekingMemoryPool: number;
    private constantNumber: number;
    private searchDomain:Position;

    private seekingMode: ISeekingMode;
    private tracingMode: ITracingMode;
    private cats: Cat[];
    private fitnessValueBest: number;
    private fitnessValueLeast: number;
    private bestPosition: Position;

    private maximumNumberOfIterations = 500;
    private iterationcounter = 0;
    private results: Position[];

    constructor(numberOfCats: number, 
                mixtureRatio: number, 
                selfPositionConsidering: Boolean,
                seekingRangeOfSelectedDimension: number,
                countsOfDimensionsToChange: number,
                seekingMemoryPool: number,
                constantNumber: number,
                searchDomain: Position) {
                    this.numberOfCats = numberOfCats;
                    this.mixtureRatio = mixtureRatio;
                    this.selfPositionConsidering = selfPositionConsidering;
                    this.seekingRangeOfSelectedDimension = seekingRangeOfSelectedDimension;
                    this.countsOfDimensionsToChange = countsOfDimensionsToChange;
                    this.seekingMemoryPool = seekingMemoryPool;
                    this.constantNumber = constantNumber;
                    this.searchDomain = searchDomain;
                    this.seekingMode = new ClassicalSeekingMode(this.seekingMemoryPool, this.seekingRangeOfSelectedDimension, this.countsOfDimensionsToChange, this.selfPositionConsidering);
                    this.tracingMode = new ClassicalTracingMode(this.constantNumber, this.searchDomain);
                    this.cats = new Cat[this.numberOfCats];
                    this.results = new Position[this.maximumNumberOfIterations];
                    this.createCats();
    }

    private createCats() {
        for(let i = 0; i < this.numberOfCats; i++) {
            const velocity = new Position(0,0);
            const position = new Position(0,0);
            this.cats[i] = new Cat(position.doRandomPosition(), velocity.doRandomPosition());
        }
    }

    private giveCatsModi() {
        for(let i = 0; i < this.numberOfCats; i++) {
            const randomNumber = mersenneTwister.random();
            if(randomNumber <= this.mixtureRatio) {
                this.cats[i].setMode(false);
            } else {
                this.cats[i].setMode(true);
            }
        }
    }

    private checkForBestFitnessValue() {
        this.fitnessValueBest = 10000;
        for(let i = 0; i < this.numberOfCats; i++) {
            if(this.cats[i].calculateFitness() < this.fitnessValueBest) {
                this.fitnessValueBest = this.cats[i].calculateFitness();
                this.bestPosition = this.cats[i].getPosition();
            }
        }
    }

    private checkForLeastFitnessValue() {
        this.fitnessValueBest = -10000;
        for(let i = 0; i < this.numberOfCats; i++) {
            if(this.cats[i].calculateFitness() > this.fitnessValueBest) {
                this.fitnessValueLeast = this.cats[i].calculateFitness();
            }
        }
    }

    optimize() {
        while(this.iterationcounter < this.maximumNumberOfIterations) {
            this.checkForBestFitnessValue();
            this.checkForLeastFitnessValue();
            this.giveCatsModi();
            this.results[this.iterationcounter] = this.bestPosition;

            for(let i = 0; i < this.numberOfCats; i++) {
                if(this.cats[i].getMode()) {
                    this.seekingMode.seek(this.cats[i], this.fitnessValueBest, this.fitnessValueLeast);
                } else {
                    this.tracingMode.trace(this.cats[i], this.bestPosition);
                }
            }
            this.iterationcounter++;
        }
    }
}

function startWorker(functionToOptimize, 
                     searchDomain, 
                     constantNumber, 
                     numberOfCats, 
                     mixtureRatio, 
                     seekingMemoryPool, 
                     seekingRangeOfSelectedDimension, 
                     countsOfDimensionsToChange, 
                     selfPositionConsidering) {

    const application = new Application(numberOfCats, 
                                        mixtureRatio, 
                                        selfPositionConsidering, 
                                        seekingRangeOfSelectedDimension, 
                                        countsOfDimensionsToChange, 
                                        seekingMemoryPool, 
                                        constantNumber, 
                                        searchDomain);
    
    application.optimize();

    finished = running;
    running = false;
};

addEventListener('message', function (message) {
    try {
        if (message.data.messageType == "start") {
            running = true;
            finished = false;
            startWorker(message.data.functionToOptimize,
                        message.data.searchDomain, 
                        message.data.constantNumber,
                        message.data.numberOfCats, 
                        message.data.mixtureRatio,
                        message.data.seekingMemoryPool, 
                        message.data.seekingRangeOfSelectedDimension,
                        message.data.countsOfDimensionsToChange,
                        message.data.selfPositionConsidering);
  //          postMessage({
  //              messageType: "return",
   //             finished: finished,
   //             msaImgData: message.data.msaImgData,
  //              startX: message.data.startX,
  //              startY: message.data.startY,
  //              index: message.data.index
  //          });
            return;
        }
        if (message.data.messageType == "stop") {
            running = false;
            finished = false;
            return;
        }
    } catch (e) {
  //      postMessage({
  //          messageType: "error",
  //          messageError: e.name + " " + e.message + " " + e.stack
   //     });

    }
    this.close();
});