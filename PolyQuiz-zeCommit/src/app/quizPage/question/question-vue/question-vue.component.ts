import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from 'src/app/models/question.models';
import {Answer} from 'src/app/models/answer.models';
import {ActivatedRoute, Router} from '@angular/router';
import {StatMemory} from '../../../models/stat-memory.models';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-question-vue',
  templateUrl: './question-vue.component.html',
  styleUrls: ['./question-vue.component.css']
})
export class QuestionVueComponent extends Trouble implements OnInit {

  public wrongAnswers: Answer[] = [];

  constructor(public router: Router, private route: ActivatedRoute) {
    super(router);
  }

  @Output()
  public nextQ: EventEmitter<Answer> = new EventEmitter();

  @Input()
  question: Question;

  @Input()
  lastQuestion: boolean;

  @Input()
  size: number;

  ngOnInit() {
  }

  getSize($event) {
    this.size = $event;
  }

  nextQuestion(answer: Answer) {
    this.nextQ.emit(answer);
  }

}
