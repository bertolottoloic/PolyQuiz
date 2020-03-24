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

  constructor() { }

  ngOnInit() {
  }

  @Input()
  question: Question;

  @Input()
  lastQuestion: boolean;

  @Output() 
  nextQ :EventEmitter<number> = new EventEmitter();

  nextQuestion(answer:Answer){
    if(this.isCorrect(answer)){
      this.nextQ.emit(1)
    }
    else{
      answer.display='hidden';
    }
  }

  isCorrect(answer: Answer):boolean{
    if(answer.isCorrect){
      return true
    }
    else{
      return false
    }
  }
}
