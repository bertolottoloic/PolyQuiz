import {Quiz} from './quiz.models';
import { Profile } from './profile.models';
import { Stat } from './stat.models';

export class StatVue extends Stat {

  trial: Map<number, boolean>;


  constructor(quizz: Quiz, profile: Profile) {
    super(quizz, profile);
    this.trial = new Map();
    this.initStats(quizz);
  }

  initStats(quiz: Quiz) {
    quiz.questions.forEach(element => {
      this.trial.set(element.id, false);
    });
  }

}
