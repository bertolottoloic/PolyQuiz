import {Component, Input, OnInit} from '@angular/core';
import {StatMemory} from '../models/stat.models';
import {Router} from '@angular/router';
import { Trouble } from '../models/trouble.models';
import { Quiz } from '../models/quiz.models';

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.css']
})
export class EndQuizComponent extends Trouble implements OnInit {

  @Input() quiz: Quiz;
  @Input() stats: StatMemory;

  constructor(public router: Router) {
    super(router);
  }

  ngOnInit() {
    console.log(this.stats);

  }


}
