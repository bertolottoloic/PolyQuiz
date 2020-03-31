import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizListService } from '../../../services/quizList.service'
import { QuizCreatePageComponent } from '../quiz-create-page/quiz-create-page.component'
import { Quiz } from '../../../models/quiz.models'
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-create-entrance',
  templateUrl: './quiz-create-entrance.component.html',
  styleUrls: ['./quiz-create-entrance.component.css']
})
export class QuizCreateEntranceComponent implements OnInit {

  
  @Output() quizId = new EventEmitter<number>();

  public quizForm: FormGroup;
  public quizCreate$:Observable<Quiz>;
  constructor(public formBuilder:FormBuilder, public quizListService:QuizListService) { 
    this.quizForm = this.formBuilder.group({
      name:[''],
      theme:[''],
    });
  }

  ngOnInit() {
  }

  changeRoute(){
    this.quizListService.changeRouteCreateQuiz("question");
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;

    this.quizCreate$ = this.quizListService.addQuiz(quizToCreate);
    this.quizCreate$.subscribe((result)=>{
      this.quizListService.setQuizzesFromUrl();
      this.quizId.emit(result.id);
    })
    
  }
  

}
