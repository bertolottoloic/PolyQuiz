import { Component, OnInit } from '@angular/core';
import {Profile} from '../../models/profile.models';
import {Quiz} from '../../models/quiz.models';
import {Question} from '../../models/question.models';
import {StatMemory} from '../../models/stat.models';
import {ProfileService} from '../../services/profile.service';
import {QuizListService} from '../../services/quizList.service';
import {ActivatedRoute} from '@angular/router';
import {Answer} from '../../models/answer.models';

@Component({
  selector: 'app-quiz-page-vue',
  templateUrl: './quiz-page-vue.component.html',
  styleUrls: ['./quiz-page-vue.component.css']
})
export class QuizPageVueComponent implements OnInit {

  public profile: Profile;
  public quiz: Quiz;
  public questionList: Question[];
  public question: Question;
  public index = 0;

  public quizDone: boolean;
  public stats: StatMemory;
  public size: number;


  constructor(public profileService: ProfileService, public quizService: QuizListService, private route: ActivatedRoute) {
    this.loadQuiz();
    this.loadProfile();

  }

  setQuizSize() {
    this.size = Number(this.route.snapshot.paramMap.get('size'));
  }

  loadQuiz() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('idQuiz'))
      this.quizService.quizzes$.subscribe((quizzes) => {
        let quiz = quizzes.filter((quiz) => quiz.id == id)[0]
        if (quiz) {
          this.quiz = quiz
          this.stats = new StatMemory(quiz);
          this.questionList = quiz.questions
          this.question = quiz.questions[this.index];
        }
      });
    });
  }

  loadProfile() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('idProfile'))
      this.profileService.profiles$.subscribe((profiles) => {
        let profil = profiles.filter((prf) => prf.id == id)[0]
        if (profil) {
          this.profile = profil;
        }
      })
    })
  }


  ngOnInit() {
    this.setQuizSize();
  }

  isCompleted() {
    if (this.stats.questionsDone.length == this.questionList.length) {
      this.quizDone = true;
    }
  }

  terminateQuiz() {
    this.quizDone = true;
  }

  UpdateMapStats(asw: Answer): void {
    if (this.stats.trial.get(asw.questionId) == null) {
      this.stats.trial.set(asw.questionId, 0);
    }
    this.stats.trial.set(asw.questionId, this.stats.trial.get(asw.questionId) + 1);
  }

  receiveQ($event) {
    this.UpdateMapStats($event);
    if ($event.isCorrect) {
      this.stats.questionsDone.push($event.questionId) //incrémente de 1 le nombre de question fini
      if (this.index + 1 < this.questionList.length) {
        this.index += 1; //passe à la question suivante si possible
      } else {
        //revient a une question non terminée
      }
    }
    this.isCompleted();
  }

  skipQ(n) { // saute n question(s)
    this.index = n;
  }
}
