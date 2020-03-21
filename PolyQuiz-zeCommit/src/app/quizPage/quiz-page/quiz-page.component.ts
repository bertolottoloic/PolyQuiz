import { Component, OnInit, Input } from '@angular/core';
import { Quiz} from '../../models/quiz.models';
import{ quizListService} from '../../services/quizList.service';
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

  constructor(public quizService: quizListService,private router: Router) {
    this.quiz=this.quizService.getQuiz(this.router.url.split("/")[5])
    this.questionList=this.quiz.questions;
    this.question=this.questionList[0]
    //QUESTION SUR CE POINT : OBSERVABLE REQUIRED ? ou simple return 
    console.log(this.quiz)
  }

  ngOnInit() {
  }


}
