import {Component, Inject, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.models';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.css']
})
export class DisplayQuizComponent implements OnInit {

  public display:number=null;
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

  actionDisplay(id:number){
    if(this.display==id){
      this.display=null;
    }
    else{
      this.display=id;
    }

  }

}
