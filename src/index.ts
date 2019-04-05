import { Config } from "./config.interface";
import { Point, ResultMessage, StartMessage } from "./message.interface";
import { Cat } from "./cat";
import { Position } from "./Point";
import { ClassicalSeekingMode } from "./ClassicalSeekingMode";
import { ClassicalTracingMode } from "./ClassicalTracingMode";
import * as MersenneTwister from 'mersenne-twister';

export declare function addEventListener(event: string, handler: (any) => void): void;
export declare function postMessage(data: any);

function runCode(): Point[] {
    console.log('runcode');
    const mersenneTwister = new MersenneTwister();
    let minimumReached = false;

    const seekingMode = new ClassicalSeekingMode(
        config.seekingMemoryPool,
        config.seekingRangeOfSelectedDimension,
        config.countsOfDimensionsToChange,
        config.selfPositionConsidering);
    const tracingMode = new ClassicalTracingMode(config.constantNumber, searchDomain);
    let cats: Cat[] = [];
    let lastResult: Position;
    let bestPosition: Position;
    let lastCats: number[] = [];
    let results: Position[] = [];
    let fitnessValueBest = Number.POSITIVE_INFINITY;
    let fitnessValueLeast = Number.NEGATIVE_INFINITY;
    const minimumEpsilon = 1e-5;

    for (let i = 0; i < config.numberOfCats; i++) {
        cats[i] = new Cat(
            Position.doRandomPosition(
                searchDomain.min.x,
                searchDomain.max.x,
                searchDomain.min.y,
                searchDomain.max.y),
            Position.doRandomPosition(),
            functionToOptimize);
    }
    for (let iterationCounter = 0;
        !minimumReached &&
        iterationCounter < config.maximumNumberOfIterations;
        iterationCounter++) {
        for (let cat of cats) {
            const fitness = cat.calculateFitness();
            if (fitness < fitnessValueBest) {
                fitnessValueBest = fitness;
                bestPosition = cat.Position;
            }
            if (fitness > fitnessValueLeast) {
                fitnessValueLeast = fitness;
            }
            cat.Mode = mersenneTwister.random() >= config.mixtureRatio;
        }
        if (bestPosition !== undefined &&
            (lastResult === undefined ||
                !lastResult.compareToPoint(bestPosition, minimumEpsilon))) {
            lastResult = bestPosition;
            results.push(lastResult);
        }
        else {
            console.log([
                lastResult, bestPosition,
                fitnessValueBest, fitnessValueLeast,
                lastResult && bestPosition && lastResult.subtract(bestPosition.x, bestPosition.y),
                lastResult && bestPosition && !lastResult.compareToPoint(bestPosition, minimumEpsilon)]
            );
        }
        for (let i = 0; i < config.numberOfCats; i++) {
            if (cats[i].Mode) {
                seekingMode.seek(cats[i], fitnessValueBest, fitnessValueLeast);
                break;
            } else {
                if (bestPosition === undefined) {
                    console.log('no bestposition!');
                }
                tracingMode.trace(cats[i], bestPosition);
            }
        }
        lastCats[iterationCounter % config.numberForCheckMinimumReached] = fitnessValueBest;
        if (iterationCounter > (config.numberForCheckMinimumReached - 1)) {
            for (let i = 0; i < lastCats.length; i++) {
                if (Math.abs(lastCats[i] - lastCats[i + 1]) > minimumEpsilon) {
                    minimumReached = false;
                    break;
                }
                minimumReached = true;
            }
        }
    }
    return results;
}

addEventListener('message', (message: { data: any }) => {
    try {
        const data = <StartMessage>message.data;
        config = data.config;
        functionToOptimize = new Function('return ' + data.func.toString())();
        searchDomain = data.searchArea;
        if (data.action === 'abort') {
            isRunning = false;
        }
        postMessage(<ResultMessage>{
            info: '',
            status: "finished",
            result: runCode()
        });
    }
    catch (e) {
        postMessage(<ResultMessage>{ info: e.toString(), result: undefined, status: "error" });
    }
});

let isRunning = false;

let config: Config;
let functionToOptimize: (x: number, y: number) => number;
let searchDomain: { min: Point, max: Point };
