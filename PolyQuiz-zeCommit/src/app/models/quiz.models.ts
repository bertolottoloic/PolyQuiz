import {Handicap} from './handicap.models'

export interface Quiz {

    name: string;
    theme: string;
    id:string;
    trouble: Handicap;
    image: string;
}