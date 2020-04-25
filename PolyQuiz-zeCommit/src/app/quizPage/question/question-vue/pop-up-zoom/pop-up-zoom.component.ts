import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Answer } from 'src/app/models/answer.models';

export interface DialogData {
  answer: Answer;
  isText: boolean;
}

@Component({
  selector: 'app-pop-up-img',
  templateUrl: './pop-up-zoom.component.html',
  styleUrls: ['./pop-up-zoom.component.css']
})
export class PopUpZoomComponent implements OnInit {
  public answer: Answer;
  public isText: boolean;
  public validate: boolean;
  constructor(public dialogRef: MatDialogRef<PopUpZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.answer = this.data.answer;
    this.isText = this.data.isText;
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close({validate: this.validate,answer: this.answer});
  }

}
