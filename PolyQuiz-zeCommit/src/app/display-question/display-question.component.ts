import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../pop-up-warning/pop-up-warning.component';
import { Question } from '../models/question.models';
import { Handicap } from '../models/handicap.models';

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent{

  question:Question;
  trouble:Handicap;
  constructor(private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DisplayQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.question=data.quest;
      this.trouble=data.trouble;
      console.log(this.question)
    }
  
    



  goHome():void{
    this.router.navigate([""])
  }


  close():void{
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.close();
  }

}
