import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopUpWarningComponent, DialogData } from '../pop-up-warning/pop-up-warning.component';
import { Quiz } from '../../models/quiz.models';
import { QuizListService } from '../../services/quizList.service';
import { Profile } from '../../models/profile.models';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-pop-up-delete',
  templateUrl: './pop-up-delete.component.html',
  styleUrls: ['./pop-up-delete.component.css']
})
export class PopUpDeleteComponent implements OnInit {

  public quizToDelete:Quiz;
  public profileToDelete:Profile;

  constructor(public profileService:ProfileService, public quizService:QuizListService, private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<PopUpWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      if(data.quiz){
        this.quizToDelete=data.quiz
      }
      if(data.profile){
        this.profileToDelete=data.profile
      }
    }

  ngOnInit() {
  }

  close():void{
    this.dialogRef.close();

  }
  onNoClick(): void {
    this.close();
  }

  action(){
    if(this.quizToDelete){
      this.quizService.deleteQuiz(this.quizToDelete);
    }
    if(this.profileToDelete){
      this.profileService.deleteProfile(this.profileToDelete.id);
    }
    this.close()
  }
}
