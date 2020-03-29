import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz-page-size-selection',
  templateUrl: './quiz-page-size-selection.component.html',
  styleUrls: ['./quiz-page-size-selection.component.css']
})
export class QuizPageSizeSelectionComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}


