import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { QuizListService } from 'src/app/services/quizList.service';
import { Handicap } from 'src/app/models/handicap.models';

@Component({
  selector: 'app-quiz-create-page',
  templateUrl: './quiz-create-page.component.html',
  styleUrls: ['./quiz-create-page.component.css']
})
export class QuizCreatePageComponent implements OnInit {

  trouble:Handicap;
  public quizId:number;
  public questionId:number
  constructor(private router:Router,public quizListService:QuizListService) {
  }

  ngOnInit() {
    this.setTrouble();
  }

  setTrouble() {
    console.log(this.router.url);
    if (this.router.url.startsWith('/memoire')) {
      this.trouble = Handicap.Memoire;
    }
    if (this.router.url.startsWith('/vue')) {
      this.trouble = Handicap.Vue;
    }
    if (this.router.url.startsWith('/moteur')) {
      this.trouble = Handicap.Moteur;
    }
  }


  
  
}
