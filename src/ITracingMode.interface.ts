import {Cat} from "./cat";
import {Position} from "./Point";

export interface ITracingMode {
    trace: (cat: Cat, xbest: Position) => void;
}