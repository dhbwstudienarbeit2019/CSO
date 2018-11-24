import {Cat} from './cat';

export interface ISeekingMode {
    seek: (cat: Cat, fitnessMax: number, fitnessMin: number) => void;
}
