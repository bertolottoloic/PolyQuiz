import { Answer} from './answer.models'
export interface Question {

    question: string;
    id:string;
    answers :Answer[];
    rightAnswer: Answer;
    image?: string;

    
}