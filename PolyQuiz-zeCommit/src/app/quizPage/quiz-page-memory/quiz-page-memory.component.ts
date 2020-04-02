import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.models';
import {QuizListService} from '../../services/quizList.service';
import {ProfileService} from '../../services/profile.service';

import {Question} from 'src/app/models/question.models';
import {StatMemory} from 'src/app/models/stat.models';
import {Answer} from 'src/app/models/answer.models';
import {Profile} from 'src/app/models/profile.models';

import { Inject} from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopUpWarningComponent } from 'src/app/pop-up-warning/pop-up-warning.component';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-quiz-page-memory',
  templateUrl: './quiz-page-memory.component.html',
  styleUrls: ['./quiz-page-memory.component.css']
})
export class QuizPageMemoryComponent implements OnInit {

  public profile: Profile;
  public quiz: Quiz;
  public questionList: Question[];
  public question: Question;
  public index: number = 0;

  public quizDone: boolean;
  public stats: StatMemory;
  private timer: number;


  constructor(private router: Router,public profileService: ProfileService, public quizService: QuizListService, private route: ActivatedRoute,public dialog: MatDialog) {
    this.loadQuiz();
    this.loadProfile();
    this.timer = Date.now(); //debut chrono

  }


  loadQuiz() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('idQuiz'))
      this.quizService.quizzes$.subscribe((quizzes) => {
        let quiz = quizzes.filter((quiz) => quiz.id === id)[0]
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
        let profil = profiles.filter((prf) => prf.id === id)[0]
        if (profil) {
          this.profile = profil;
        }
      })
    })
  }


  ngOnInit() {
  }

  openDialog(path:string) {
    this.dialog.open(PopUpWarningComponent, {
      data: {
        path: path,
        url:this.route
      }
    });
  }


  isCompleted():boolean {
    if (this.stats.questionsDone.length == this.questionList.length) {
      this.terminateQuiz();
    }
    return false;
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
      if(!this.stats.questionsDone.includes($event.questionId)){
        this.stats.questionsDone.push($event.questionId)} //incrémente de 1 le nombre de question fini
      if(!this.isCompleted()){
        this.searchNextQuestion()
      }
    }
    this.isCompleted();
  }

  searchNextQuestion(){
    for(let i=0; i<this.questionList.length;i++){
      if(!this.stats.questionsDone.includes(this.questionList[i].id)){
        this.index=i;
        break;
      }
    }
  }
  

  skipQ(n) { // saute n question(s)
    this.index = n;
  }
}

