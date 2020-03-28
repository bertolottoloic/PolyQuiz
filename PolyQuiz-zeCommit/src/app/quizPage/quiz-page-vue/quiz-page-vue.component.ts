import { Component, OnInit } from '@angular/core';
import { Quiz} from '../../models/quiz.models';
import { QuizListService} from '../../services/quizList.service';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.models';

@Component({
  selector: 'app-quiz-page-vue',
  templateUrl: './quiz-page-vue.component.html',
  styleUrls: ['./quiz-page-vue.component.css']
})
export class QuizPageVueComponent implements OnInit {
  public size: number;

  constructor(private router: Router) {


  }

  ngOnInit() {
  }




}


