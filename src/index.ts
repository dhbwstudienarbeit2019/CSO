import { Config } from "./config.interface";
import { Point, ResultMessage, StartMessage } from "./message.interface";
import { Cat } from "./cat";
import { Position } from "./Point";
import { ClassicalSeekingMode } from "./ClassicalSeekingMode";
import { ClassicalTracingMode } from "./ClassicalTracingMode";
import * as MersenneTwister from 'mersenne-twister';

addEventListener('message', (message: MessageEvent) => {
    try {
        let data = <StartMessage>message.data;
        config = data.config;
        functionToOptimize = new Function('return ' + data.optimization.toString())();
        searchDomain = data.searchDomain;
        if (data.action === 'abort') {
            isRunning = false;
        }
        postMessage(<ResultMessage>{
            info: '',
            status: "finished",
            result: runCode()
        }, undefined, undefined);
    }
    catch (e) {
        postMessage(<ResultMessage>{ info: e.toString(), result: [], status: "error" }, undefined, undefined);
    }
});

let isRunning = false;
let isFinished = false;

let config: Config;

let functionToOptimize: (point: Point) => number;

let searchDomain: { min: Point, max: Point };

function runCode(): Point[] {
    let iterationCounter = 0;
    let minimumReached = false;

    let seekingMode = new ClassicalSeekingMode(config.seekingMemoryPool, config.seekingRangeOfSelectedDimension, config.countsOfDimensionsToChange, config.selfPositionConsidering);
    let tracingMode = new ClassicalTracingMode(config.constantNumber, searchDomain);
    let cats: Cat[];
    let bestPosition: Position;
    let results: Position[];
    let fitnessValueBest = 1000;
    let fitnessValueLeast = 0;

    for (let i = 0; i < config.numberOfCats; i++) {
        this.cats[i] = new Cat(Position.doRandomPosition(), Position.doRandomPosition(), functionToOptimize);
    }

    while (!minimumReached && iterationCounter < config.maximumNumberOfIterations) {

        for (let i = 0; i < config.numberOfCats; i++) {
            if (cats[i].calculateFitness() < fitnessValueBest) {
                fitnessValueBest = cats[i].calculateFitness();
                bestPosition = cats[i].Position;
            }
            if (cats[i].calculateFitness() > fitnessValueLeast) {
                fitnessValueLeast = cats[i].calculateFitness();
            }

            const randomNumber = MersenneTwister.random();
            if (randomNumber <= config.mixtureRatio) {
                cats[i].Mode = false;
            } else {
                cats[i].Mode = true;
            }
        }

        results[iterationCounter] = bestPosition;

        for (let i = 0; i < config.numberOfCats; i++) {
            if (cats[i].Mode) {
                seekingMode.seek(cats[i], fitnessValueBest, fitnessValueLeast);
            } else {
                tracingMode.trace(cats[i], bestPosition);
            }
        }

        iterationCounter++;

        if (iterationCounter >= 40) {
            for (let i = iterationCounter; i > (iterationCounter - 40); i--) {
                if (results[i] != results[i - 1]) {
                    minimumReached = false;
                    break;
                } else {
                    minimumReached = true;
                }
            }
        }
    }
    isRunning = false;
    isFinished = true;

    return results;
}