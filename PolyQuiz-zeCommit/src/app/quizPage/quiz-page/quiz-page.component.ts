import { Component, OnInit, Input } from '@angular/core';
import { Quiz} from '../../models/quiz.models';
import{ quizListService} from '../../services/quizList.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {

  public quiz: Quiz;

  constructor(public quizService: quizListService,private router: Router) {
    console.log(this.quizService.getQuiz(this.router.url.split("/")[5]))
    //QUESTION SUR CE POINT : OBSERVABLE REQUIRED ? ou simple return 
  }

  ngOnInit() {
  }


}
