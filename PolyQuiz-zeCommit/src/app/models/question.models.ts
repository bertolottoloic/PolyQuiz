import { Answer} from './answer.models'
export interface Question {

    text: string;
    id:string;
    answers :Answer[];
    rightAnswer: Answer;
    image?: string;

    
}