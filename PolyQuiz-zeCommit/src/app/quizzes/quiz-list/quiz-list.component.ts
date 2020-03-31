import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.models';
import {QuizListService} from '../../services/quizList.service';
import { Handicap } from 'src/app/models/handicap.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public trouble: Handicap;

  constructor(public quizListService: QuizListService, private router: Router) {
    //this.quizListService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
    this.setTrouble();

    this.quizListService.quizzes$.subscribe((profiles) => {
      this.quizList = profiles.filter(profile => profile.trouble === this.trouble);
    }); 

    //this.quizList = this.getSpecifyQuiz();
  }

  ngOnInit() {
  }

  getSpecifyQuiz() {
    if (this.router.url.startsWith('/memoire')) {
       return this.quizList.filter(quiz => quiz.trouble === Handicap.Memoire);
    }
    if (this.router.url.startsWith('/vue')) {
      return this.quizList.filter(quiz => quiz.trouble === Handicap.Vue);
    }
    if (this.router.url.startsWith('/moteur')) {
      return this.quizList.filter(quiz => quiz.trouble === Handicap.Moteur);
    }
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
