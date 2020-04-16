import {Quiz} from './quiz.models';
import { Profile } from './profile.models';
import { Stat } from './stat.models';

export class StatVue extends Stat {

  trial: Map<number, number>;


  constructor(quizz: Quiz, profile: Profile) {
    super(quizz, profile);
  }

  initStats(quiz: Quiz) {
    quiz.questions.forEach(element => {
      this.trial.set(element.id, 0);
    });
  }

}
