import {Quiz} from './quiz.models';
import { Profile } from './profile.models';

export class StatMemory {
  id:number;
  profileId:number;
  quizId: number;
  score: number;
  time: number;
  trial: Map<number, number>;
  questionsDone: number[];
  nbRightAnswers: number;
  nbWrongAnswers: number;

  constructor(quizz: Quiz,profile:Profile) {
    this.quizId=quizz.id;
    this.profileId=profile.id;
    this.score = 0;
    this.time = 0;
    this.trial = new Map();
    this.questionsDone = [];
    this.nbRightAnswers = 0;
    this.nbWrongAnswers = 0;
    this.initStats(quizz);
  }

  initStats(quiz:Quiz) {
    quiz.questions.forEach(element => {
      this.trial.set(element.id, 0);
    });
  }


}
