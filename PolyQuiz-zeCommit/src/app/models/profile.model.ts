export enum Handicap{
    Memoire="memoire",
    Vue="vue",
    Moteur="moteur"
}

export interface Profile {

    lastName: string;
    firstName: string;
    id:string;
    trouble: Handicap;
    image: string;

    
}
