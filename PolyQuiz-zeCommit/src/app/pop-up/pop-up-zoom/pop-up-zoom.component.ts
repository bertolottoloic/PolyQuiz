import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Answer } from 'src/app/models/answer.models';

export interface DialogData {
  answer?: Answer;
  isText?: boolean;
  img?: string;
}

@Component({
  selector: 'app-pop-up-img',
  templateUrl: './pop-up-zoom.component.html',
  styleUrls: ['./pop-up-zoom.component.css']
})
export class PopUpZoomComponent implements OnInit {
  public answer: Answer;
  public img: string;
  public isText: boolean;
  public validate: boolean;
  constructor(public dialogRef: MatDialogRef<PopUpZoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (this.data.answer) {
      this.answer = this.data.answer;
      if (!data.isText) {
        this.img = this.answer.image;
      }
      this.isText = this.data.isText;
    }
    if (this.data.img) {
      this.img = this.data.img;
      this.isText = false;
    }

    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  closeForAnswer() {
    this.dialogRef.close({validate: this.validate,answer: this.answer});
  }

  closeForQuestion() {
    this.dialogRef.close();
  }

}
