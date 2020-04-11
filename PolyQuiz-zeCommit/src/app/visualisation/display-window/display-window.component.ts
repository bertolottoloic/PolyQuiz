import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisplayQuestionComponent } from '../display-question/display-question.component';
import { Handicap } from '../../models/handicap.models';
import { Profile } from '../../models/profile.models';

@Component({
  selector: 'app-display-window',
  templateUrl: './display-window.component.html',
  styleUrls: ['./display-window.component.css']
})
export class DisplayWindowComponent implements OnInit {

  trouble:Handicap;
  profile:Profile;
  constructor(private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DisplayQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.trouble=data.profile.trouble
      this.profile=data.profile
    }

  ngOnInit() {
  }

  close():void{
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.close();
  }

}
