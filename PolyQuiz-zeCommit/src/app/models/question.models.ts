import { Answer} from './answer.models'
export interface Question {

    text: string;
    id:number;
    answers :Answer[];
    image?: string;
}