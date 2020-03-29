import { Component, OnInit, Input } from '@angular/core';
import { StatMemory } from '../models/stat.models';

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.css']
})
export class EndQuizComponent implements OnInit {

  @Input() stats: StatMemory;

  constructor() { }

  ngOnInit() {
  }

}
