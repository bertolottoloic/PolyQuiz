import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.models';
import { QUIZ_LIST } from '../mocks/quizzes-list.mock';
import { serverUrl, httpOptionsBase } from '../../configs/server.config';
import { Handicap } from '../models/handicap.models';
import { Question } from '../models/question.models';

@Injectable({
    providedIn: 'root'
})
export class QuizListService {
  private URL : string = serverUrl + "/quizzes";
  public createPageRoute:string='quiz';
  public createPageRoute$: BehaviorSubject<string> = new BehaviorSubject(this.createPageRoute);
  public postQuiz:Quiz;
  public postQuiz$: BehaviorSubject<Quiz> = new BehaviorSubject(this.postQuiz);
  public quizzes: Quiz[]=QUIZ_LIST;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();
  private httpOptions = httpOptionsBase;
  private questionsPath = 'questions';
  public currentTrouble:Handicap;

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

  addQuiz(quiz: Quiz): Observable<Quiz> {

    // this.http.post<Quiz>(this.URL, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    return this.http.post<Quiz>(this.URL, quiz, this.httpOptions);
  }

  addQuestion(quizId: number, question: Question) {
    const questionUrl = this.URL + '/' + quizId + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quizId);
      this.setQuizzesFromUrl();
    });
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.URL + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  setSelectedQuiz(quizId: number) {
    const urlWithId = this.URL + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  changeRouteCreateQuiz(route:string){
    this.createPageRoute$.next(route);
  }

}
