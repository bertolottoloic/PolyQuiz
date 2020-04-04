import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';

@Component({
  selector: 'app-quiz-list-page',
  templateUrl: './quiz-list-page.component.html',
  styleUrls: ['./quiz-list-page.component.css']
})
export class QuizListPageComponent implements OnInit {

  trouble:Handicap;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.setTrouble();
  }

  setTrouble() {
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
