import { Component, OnInit } from '@angular/core';
import { Quiz} from '../../models/quiz.models';
import { QuizListService} from '../../services/quizList.service';
import { Router } from '@angular/router';
import { Question } from 'src/app/models/question.models';

@Component({
  selector: 'app-quiz-page-size-selection',
  templateUrl: './quiz-page-size-selection.component.html',
  styleUrls: ['./quiz-page-size-selection.component.css']
})
export class QuizPageSizeSelectionComponent implements OnInit {
  public size = 3;

  constructor(private router: Router) {


  }

  ngOnInit() {
    this.setSize();
  }


  private setSize() {
    this.size = 3;
  }
}


