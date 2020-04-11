import {Component, OnInit, SimpleChanges, OnChanges, Input} from '@angular/core';
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
export class QuizListComponent extends Trouble implements OnChanges {

  @Input() filter;

  public quizList: Quiz[] = [];
  public noFilterQuizList:Quiz[]=[];

  constructor(public quizListService: QuizListService, public router: Router) {
    super(router)
    this.quizListService.quizzes$.subscribe((quiz) => {
      this.quizList = quiz.filter(quiz => quiz.trouble === this.trouble);
      this.noFilterQuizList=this.quizList;
    });

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.filter){
      this.filter=this.filter.toLowerCase();
      this.quizList=this.noFilterQuizList.filter(
        quiz => quiz.name.toLowerCase().match(this.filter)||quiz.theme.name.toLowerCase().match(this.filter))
    }
    else{
        this.quizList=this.noFilterQuizList;
    }
  }

}
