import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Answer} from '../../../models/answer.models';

export interface DialogData {
  answer;
  completed;
}

@Component({
  selector: 'app-pop-up-answer-component',
  templateUrl: './pop-up-answer.component.html',
  styleUrls: ['./pop-up-answer.component.css']
})
export class PopUpAnswerComponent {

  currentAnswer: boolean;
  completed: boolean;

  constructor(private router: Router, private route: ActivatedRoute,
              public dialogRef: MatDialogRef<PopUpAnswerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.currentAnswer = data.answer;
    this.completed = data.completed;
    dialogRef.disableClose = true;
  }

  action(): void {
    this.close();
    this.next();
  }

  next(): void {
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}

