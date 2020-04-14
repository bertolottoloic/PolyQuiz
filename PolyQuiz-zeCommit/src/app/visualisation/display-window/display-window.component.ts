import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisplayQuestionComponent } from '../display-question/display-question.component';
import { Handicap } from '../../models/handicap.models';
import { Profile } from '../../models/profile.models';
import { StatService } from 'src/app/services/stats.service';
import { Stat } from 'src/app/models/stat.models';
import { Quiz } from 'src/app/models/quiz.models';
import { QuizListService } from 'src/app/services/quizList.service';

@Component({
  selector: 'app-display-window',
  templateUrl: './display-window.component.html',
  styleUrls: ['./display-window.component.css']
})
export class DisplayWindowComponent implements OnInit {

  stat:Stat[];
  quizzesDone:Quiz[];
  trouble:Handicap;
  profile:Profile;
  constructor(private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DisplayQuestionComponent>, public statService:StatService, public quizService:QuizListService,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.trouble=data.profile.trouble
      this.profile=data.profile

      this.statService.getProfileStats(this.profile.id,this.profile.trouble)
      this.statService.selectedStat$.subscribe((res)=>{
        if(res){
          this.stat=res;

        }
      })
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
