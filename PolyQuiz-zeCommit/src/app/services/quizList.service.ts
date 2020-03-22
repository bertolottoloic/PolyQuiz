import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.models';
import { QUIZ_LIST } from '../mocks/quizzes-list.mock';
import { serverUrl, httpOptionsBase } from '../../configs/server.config';

@Injectable({
    providedIn: 'root'
})

export class QuizListService {

  private quizzes: Quiz[];

  private URL : string = serverUrl + "/quizzes";
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(private http:HttpClient) {
    this.setQuizzesFromUrl()
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  getQuiz(id){
    return this.quizzes.filter((quiz)=>quiz.id==id)[0]
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz,1));
    this.quizzes$.next(this.quizzes);
  }

  setQuizzesFromUrl(){
    this.http.get<Quiz[]>(this.URL).subscribe((result) =>{
      console.log(result)
      this.quizzes = result;
      this.quizzes$.next(this.quizzes);
    });  
  }


}
