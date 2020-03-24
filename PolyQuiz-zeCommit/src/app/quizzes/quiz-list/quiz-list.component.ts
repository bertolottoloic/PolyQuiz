import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.models';
import{ QuizListService} from '../../services/quizList.service';
import { Handicap } from '../models/handicap.models';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizListService: QuizListService) {
    this.quizListService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
    //this.quizListService.quizzes$.subscribe((quizzes) => this.quizList = quizzes.filter((quiz) => quiz.trouble==Handicap.Memoire));
  }


  ngOnInit() {
  }



}
