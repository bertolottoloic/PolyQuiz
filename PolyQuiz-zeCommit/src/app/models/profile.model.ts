export enum Handicap{
    Memoire="memoire",
    Vue="vue",
    Moteur="moteur"
}

export interface Profile {

    name: string;
    firstName: string;
    id:string;
    trouble: Handicap;
    
}
