import {Config} from "./config.interface";
import {Position} from "./Point";

export interface Point {
    x: number;
    y: number;
}

export interface StartMessage {
    action: 'start' | 'abort';
    config: Config;
    optimization: (point: Point) => number;
    searchDomain: Position;
}

export interface ResultMessage {
    status: 'finished' | 'error';
    info: string;
    result: Point[];
}
