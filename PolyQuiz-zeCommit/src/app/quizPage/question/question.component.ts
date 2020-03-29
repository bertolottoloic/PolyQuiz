import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from 'src/app/models/question.models';
import {Answer} from 'src/app/models/answer.models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public wrongAnswers: Answer[] = [];
  public size: number;

  @Output()
  public nextQ: EventEmitter<Answer> = new EventEmitter();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setQuizSize();
  }

  setQuizSize() {
    this.size = Number(this.route.snapshot.paramMap.get('size'));
  }

  @Input()
  question: Question;

  @Input()
  lastQuestion: boolean;

  nextQuestion(answer: Answer) {
    this.nextQ.emit(answer);

    if (!answer.isCorrect) {
      this.wrongAnswers.push(answer);
    }
  }
}
