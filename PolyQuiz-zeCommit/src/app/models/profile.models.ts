import {Handicap} from './handicap.models';

export enum gender {
    male = 'homme',
    female = 'femme',
  }

export interface Profile {

    lastName: string;
    firstName: string;
    id: number;
    trouble: Handicap;
    gender?: gender;
    age?:number;
    image: string;

}
