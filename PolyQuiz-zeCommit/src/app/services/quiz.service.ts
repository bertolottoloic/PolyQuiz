import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.models';
import { QUIZ_LIST } from '../mocks/quizzes-list.mock';

@Injectable({
    providedIn: 'root'
})

export class quizService {

  private quizzes: Quiz[] = QUIZ_LIST;

  private URL : string;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(private http:HttpClient) {
    
  }

  addProfile(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteProfile(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz,1));
    this.quizzes$.next(this.quizzes);
  }

  setProfilesFromUrl(){
    this.http.get<{quizzes: Quiz[]}>(this.URL).subscribe((result: {quizzes: Quiz[]}) =>{
      this.quizzes = result.quizzes;
      this.quizzes$.next(this.quizzes);
    });  
  }


}
