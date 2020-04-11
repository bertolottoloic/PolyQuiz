import { Component, OnInit, Inject } from '@angular/core';
import { Quiz } from '../models/quiz.models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {

  public quiz: Quiz;
  constructor(private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DisplayQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.quiz=data.quiz;
    }

  ngOnInit() {
  }


  close(): void {
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.close();
  }

}
