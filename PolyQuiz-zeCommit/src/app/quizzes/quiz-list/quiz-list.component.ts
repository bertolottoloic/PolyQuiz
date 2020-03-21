import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.models';
import{ quizListService} from '../../services/quizList.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: quizListService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {this.quizList = quizzes;});
   }

  ngOnInit() {
  }

}
