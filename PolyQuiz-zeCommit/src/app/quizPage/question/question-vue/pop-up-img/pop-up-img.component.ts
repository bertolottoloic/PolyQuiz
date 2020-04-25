import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Answer } from 'src/app/models/answer.models';

export interface DialogData {
  answer: Answer;
}

@Component({
  selector: 'app-pop-up-img',
  templateUrl: './pop-up-img.component.html',
  styleUrls: ['./pop-up-img.component.css']
})
export class PopUpImgComponent implements OnInit {
  public answer: Answer;
  public validate: boolean;
  constructor(public dialogRef: MatDialogRef<PopUpImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.answer = this.data.answer;
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close({validate: this.validate,answer: this.answer});
  }

}
