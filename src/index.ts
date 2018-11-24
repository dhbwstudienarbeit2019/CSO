import {Config} from "./config.interface";
import {Point, ResultMessage, StartMessage} from "./message.interface";

addEventListener('message', (message: MessageEvent) => {
    try {
        let data = <StartMessage> message.data;
        config = data.config;
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
        postMessage(<ResultMessage>{info: e.toString(), result: [], status: "error"}, undefined, undefined);
    }
});

let isRunning = false;

let config: Config;

function runCode(): Point[] {
    // #TODO Your code should go here
    return [];
}