import {Handicap} from './handicap.models'
import { Question} from './question.models'

export interface Quiz {

    name: string;
    theme: string;
    id:string;
    trouble: Handicap;
    image: string;
    questions: Question[],
}