import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.models';
import { QUIZ_LIST } from '../mocks/quizzes-list.mock';
import { serverUrl, httpOptionsBase } from '../../configs/server.config';
import { Handicap } from '../models/handicap.models';

@Injectable({
    providedIn: 'root'
})
export class QuizListService {
  private URL : string = serverUrl + "/quizzes";

  public quizzes: Quiz[]=QUIZ_LIST;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(private http:HttpClient) {
    this.setQuizzesFromUrl()
  }


  setQuizzesFromUrl(){
    this.http.get<Quiz[]>(this.URL).subscribe((result) =>{
      this.quizzes = result;
      this.quizzes$.next(this.quizzes);
      
    });  
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz,1));
    this.quizzes$.next(this.quizzes);
  }
  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

}
