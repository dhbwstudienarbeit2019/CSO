import { Config } from "./config.interface";
import { Position } from "./Point";

export interface Point {
    x: number;
    y: number;
}

export interface StartMessage {
    action: 'start' | 'abort';
    config: any;
    searchArea: {
        min: Point
        max: Point
    };
    func: string; // (x: number, y: number) => number;
}

export interface ResultMessage {
    status: 'finished' | 'error';
    info: string;
    result: Point[]
}