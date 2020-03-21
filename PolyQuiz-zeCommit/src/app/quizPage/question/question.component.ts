import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question.models';

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
  question: Question

}
