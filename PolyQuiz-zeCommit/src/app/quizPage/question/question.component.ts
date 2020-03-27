import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question.models';
import { Answer } from 'src/app/models/answer.models';
import { AbstractExtendedWebDriver } from 'protractor/built/browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public wrongAnswers :Answer[]=[];

  @Output()
  public nextQ: EventEmitter<Answer> = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
  }

  @Input()
  question: Question;

  @Input()
  lastQuestion: boolean;

  nextQuestion(answer:Answer){
    this.nextQ.emit(answer)

    if(!answer.isCorrect){
      this.wrongAnswers.push(answer)
    }
  } 
}
