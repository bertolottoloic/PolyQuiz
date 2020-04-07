import { Component, OnInit } from '@angular/core';
import { QuizListService } from 'src/app/services/quizList.service';
import { Quiz } from 'src/app/models/quiz.models';
import { Handicap } from 'src/app/models/handicap.models';
import { Router, ActivatedRoute } from '@angular/router';
import { Trouble } from 'src/app/models/trouble.models';

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

  constructor(public quizServ:QuizListService,public router:Router,public route:ActivatedRoute) { 
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


  action(quiz:Quiz){
    if(this.state==State.Delete){
      this.quizServ.deleteQuiz(quiz);
    }
    if(this.state==State.Modify){
      this.router.navigate(["create/"+quiz.id],{ relativeTo: this.route })
    }
  }
}
