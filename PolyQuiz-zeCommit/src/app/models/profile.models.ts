import {Handicap} from './handicap.models';

export interface Profile {

    lastName: string;
    firstName: string;
    id: number;
    trouble: Handicap;
    image: string;

}
