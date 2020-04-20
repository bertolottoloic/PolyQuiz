import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisplayQuestionComponent } from '../../display-question/display-question.component';
import { Handicap } from '../../../models/handicap.models';
import { Profile } from '../../../models/profile.models';
import { Stat } from 'src/app/models/stat.models';
import { Quiz } from 'src/app/models/quiz.models';
import { QuizListService } from 'src/app/services/quizList.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-display-window',
  templateUrl: './display-window.component.html',
  styleUrls: ['./display-window.component.css']
})
export class DisplayWindowComponent implements OnInit {

  stat: any[];
  quizzesDone: Quiz[];
  trouble: Handicap;
  profile: Profile;
  public selectedStat: any;
  constructor(private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DisplayQuestionComponent>, public profileService: ProfileService, public quizService: QuizListService,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.trouble=data.profile.trouble
      this.profile=data.profile

      this.profileService.getProfileStats(this.profile);
      this.profileService.selectedStats$.subscribe((res) => {
        if (res) {
          this.stat = res;

        }
      });
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
