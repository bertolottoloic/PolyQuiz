import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.models';
import {QuizListService} from '../../services/quizList.service';
import { Handicap } from 'src/app/models/handicap.models';
import { Router } from '@angular/router';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent extends Trouble implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizListService: QuizListService, public router: Router) {
    super(router)
    this.quizListService.quizzes$.subscribe((quiz) => {
      this.quizList = quiz.filter(quiz => quiz.trouble === this.trouble);
      console.log(this.quizList.length)
    }); 

  }

  ngOnInit() {
  }

}
