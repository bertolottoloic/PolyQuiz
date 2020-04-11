import { Component, OnInit } from '@angular/core';
import { QuizListService } from 'src/app/services/quizList.service';
import { Quiz } from 'src/app/models/quiz.models';
import { Router, ActivatedRoute } from '@angular/router';
import { Trouble } from 'src/app/models/trouble.models';
import { PopUpDeleteComponent } from 'src/app/pop-up-delete/pop-up-delete.component';
import { MatDialog } from '@angular/material/dialog';

export enum State{
  Delete="delete",
  Modify="modify",
  None="none"

}
@Component({
  selector: 'app-manage-quizzes',
  templateUrl: './manage-quizzes.component.html',
  styleUrls: ['./manage-quizzes.component.css']
})

export class ManageQuizzesComponent extends Trouble implements OnInit {

  public state=State.None;
  quizList:Quiz[];

  constructor(public quizServ:QuizListService,public router:Router,public route:ActivatedRoute,public dialog: MatDialog) { 
    super(router)
    this.quizServ.quizzes$.subscribe((quiz) => {
      this.quizList = quiz.filter(quiz => quiz.trouble === this.trouble);
      console.log("manage :"+this.quizList.length)

    }); 
  }

  ngOnInit() {
  }

  changeState(state:State){
    if(this.state==state){
      this.state=State.None;}
    else{
      this.state=state;
    }
  }

  openDialog(quiz:Quiz) {
    this.dialog.open(PopUpDeleteComponent, {
      data: {
        quiz: quiz,
      }
    });
  }

  action(quiz:Quiz){
    if(this.state==State.Delete){
      this.openDialog(quiz)
    }
    if(this.state==State.Modify){
      this.router.navigate(["create/"+quiz.id],{ relativeTo: this.route })
    }
  }
}
