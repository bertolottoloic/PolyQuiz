import { Component, OnInit } from '@angular/core';
import { QuizListService } from 'src/app/services/quizList.service';

@Component({
  selector: 'app-quiz-create-question',
  templateUrl: './quiz-create-question.component.html',
  styleUrls: ['./quiz-create-question.component.css']
})
export class QuizCreateQuestionComponent implements OnInit {

  constructor(public quizListService:QuizListService) { }

  ngOnInit() {
  }

  changeRoute(route:string){
    this.quizListService.changeRouteCreateQuiz(route);
  }
}
