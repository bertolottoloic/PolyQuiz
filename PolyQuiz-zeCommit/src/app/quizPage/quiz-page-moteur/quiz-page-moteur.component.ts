import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.models';
import { Quiz } from 'src/app/models/quiz.models';
import { Question } from 'src/app/models/question.models';
import { StatMemory } from 'src/app/models/stat.models';
import { ProfileService } from 'src/app/services/profile.service';
import { QuizListService } from 'src/app/services/quizList.service';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/answer.models';

@Component({
  selector: 'app-quiz-page-moteur',
  templateUrl: './quiz-page-moteur.component.html',
  styleUrls: ['./quiz-page-moteur.component.css']
})
export class QuizPageMoteurComponent implements OnInit {

  public profile: Profile;
  public quiz: Quiz;
  public questionList: Question[];
  public question: Question;
  public index: number = 0;

  public quizDone: boolean;
  public stats: StatMemory;
  private timer: number;

  constructor(public profileService: ProfileService, public quizService: QuizListService, private route: ActivatedRoute) {
    this.loadQuiz();
    this.loadProfile();
    this.timer = Date.now(); //debut chrono
  }

  loadQuiz() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('idQuiz'))
      this.quizService.quizzes$.subscribe((quizzes) => {
        let quiz = quizzes.filter((quiz) => quiz.id == id)[0]
        if (quiz) {
          this.quiz = quiz
          this.stats = new StatMemory(quiz); //creation objet stat
          this.questionList = quiz.questions
          this.question = quiz.questions[this.index];
        }
      })
    })
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
  }

  isCompleted() {
    if (this.stats.questionsDone.length == this.questionList.length) {
      this.stats.time = Date.now() - this.timer //temps mis pour completer le quiz
      this.quizDone = true;
    }
  }

  terminateQuiz() {
    this.stats.time = Date.now() - this.timer //temps mis pour completer le quiz
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
