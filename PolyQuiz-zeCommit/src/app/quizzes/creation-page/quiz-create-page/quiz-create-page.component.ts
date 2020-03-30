import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { AbstractExtendedWebDriver } from 'protractor/built/browser';
import { QuizListService } from 'src/app/services/quizList.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quiz-create-page',
  templateUrl: './quiz-create-page.component.html',
  styleUrls: ['./quiz-create-page.component.css']
})
export class QuizCreatePageComponent implements OnInit {

  trouble = ''
  private route:string;
  public quizId:number;
  public questionId:number
  constructor(private router:Router,public quizListService:QuizListService) {
    this.quizListService.createPageRoute$.subscribe((route) => this.route = route);
  }

  ngOnInit() {
    this.setTrouble();
  }

  setTrouble() {
    console.log(this.router.url);
    if (this.router.url.startsWith('/memoire')) {
      this.trouble = 'Mémoire';
    }
    if (this.router.url.startsWith('/vue')) {
      this.trouble = 'Vue';
    }
    if (this.router.url.startsWith('/moteur')) {
      this.trouble = 'Moteur';
    }
  }

  receiptQuizId(id:number){
    this.quizId = id;
    console.log(id);
    this.quizListService.changeRouteCreateQuiz('question')
  }

  
  
}
