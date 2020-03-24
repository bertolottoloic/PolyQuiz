import { Component, OnInit, Input } from '@angular/core';
import { Quiz} from '../../models/quiz.models';
import{ QuizListService} from '../../services/quizList.service';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.models';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {

  public quiz: Quiz;
  public questionList: Question[];
  public question: Question;
  public index: number;

  constructor(public quizService: QuizListService,private router: Router) {
    this.quiz=this.quizService.getQuiz(this.router.url.split("/")[5])
    this.questionList=this.quiz.questions;
    this.question=this.questionList[this.index];
    this.index=0;
    //QUESTION SUR CE POINT : OBSERVABLE REQUIRED ? ou simple return 
    //Creer uun service pour gerer les stats de quiz ?
  }

  ngOnInit() {
  }

  receiveQ($event){
    if(this.index+$event<this.questionList.length){
      this.index+=$event
    }
  }

  skipQ(n){
    this.index=n;
  }

  isEnd($event) {
    if(this.index+$event !=this.questionList.length) {
      return false;
    }
    else {
      return true;
    }
  }



}
