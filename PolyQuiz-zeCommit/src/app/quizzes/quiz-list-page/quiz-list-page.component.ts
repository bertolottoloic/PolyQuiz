import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-quiz-list-page',
  templateUrl: './quiz-list-page.component.html',
  styleUrls: ['./quiz-list-page.component.css']
})
export class QuizListPageComponent extends Trouble implements OnInit {
  public value:string;
  public valueTheme:string;

  constructor(public router: Router) {
    super(router)
  }

  ngOnInit() {
  }

  onKey(value: string) {
    this.value=value
  }

  applyFilterName($event){
    this.value=$event;

  }

  applyFilterTheme($event){
    this.valueTheme=$event;
    console.log($event)
  }

}
