import { Quiz } from './quiz.models';
import { Question } from './question.models';

export class StatMemory {

    quiz:Quiz;
    score:number;
    time:number;
    trial:Map<number,number>;
    questionsDone: number[];
    nbRightAnswers:number;
    nbWrongAnswers:number;

    constructor(quizz: Quiz) {
        this.quiz=quizz;
        this.score = 0;
        this.time=0;
        this.trial=new Map();
        this.questionsDone=[];
        this.nbRightAnswers=0;
        this.nbWrongAnswers=0;
    }


}