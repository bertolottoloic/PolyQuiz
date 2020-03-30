import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from 'src/app/models/question.models';
import {Answer} from 'src/app/models/answer.models';
import {ActivatedRoute, Router} from '@angular/router';
import {StatMemory} from '../../../models/stat.models';

@Component({
  selector: 'app-question-vue',
  templateUrl: './question-vue.component.html',
  styleUrls: ['./question-vue.component.css']
})
export class QuestionVueComponent implements OnInit {

  public wrongAnswers: Answer[] = [];
  public trouble: string;

  constructor(private router: Router, private route: ActivatedRoute) {
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
    this.setTrouble();
  }

  getSize($event) {
    this.size = $event;
  }

  nextQuestion(answer: Answer) {
    this.nextQ.emit(answer);

    if (!answer.isCorrect) {
      this.wrongAnswers.push(answer);
    }
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
}
