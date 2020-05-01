import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from 'src/app/models/quiz.models';
import {Trouble} from 'src/app/models/trouble.models';
import {PopUpDeleteComponent} from 'src/app/pop-up/pop-up-delete/pop-up-delete.component';
import {QuizListService} from 'src/app/services/quizList.service';
import {DisplayQuizComponent} from 'src/app/visualisation/display-quiz/display-quiz.component';

export enum State {
  Delete= 'delete',
  Modify= 'modify',
  None= 'none'

}
@Component({
  selector: 'app-manage-quizzes',
  templateUrl: './manage-quizzes.component.html',
  styleUrls: ['./manage-quizzes.component.css']
})

export class ManageQuizzesComponent extends Trouble implements OnInit {

  public filterTheme:number;
  public filter:string;
  public state = State.None;
  public quizList: Quiz[];
  public noFilterQuizList:Quiz[];

  constructor(public quizServ: QuizListService, public router: Router, public route: ActivatedRoute, public dialog: MatDialog) {
    super(router);
    this.quizServ.quizzes$.subscribe((quiz) => {
      this.quizList = quiz.filter(quiz$ => quiz$.trouble === this.trouble);
      this.noFilterQuizList=this.quizList;
    });
  }

  ngOnInit() {
  }

  changeState(state: State) {
    if (this.state === state) {
      this.state = State.None; } else {
      this.state = state;
    }
  }

  openDialog(quiz: Quiz) {
    this.dialog.open(PopUpDeleteComponent, {
      data: {
        quiz,
      }
    });
  }
  openDialogDisplay(quiz: Quiz) {
    this.dialog.open(DisplayQuizComponent, {
      height: '80%',
      width: '80%',
      data: {
        quiz,
      }
    });
  }

  action(quiz: Quiz) {
    if(this.state=='none'){
      this.openDialogDisplay(quiz);
    }
    if (this.state === State.Delete) {
      this.openDialog(quiz);
    }
    if (this.state === State.Modify) {
      this.router.navigate(['create/' + quiz.id], { relativeTo: this.route });
    }
  }

  applyfilter(): void {
    if(this.filter){
      this.quizList=this.noFilterQuizList.filter(
        quiz => quiz.name.toLowerCase().match(this.filter)||quiz.theme.name.toLowerCase().match(this.filter))
    }
    else if(this.filterTheme!=0&&this.filterTheme){
      this.quizList=this.noFilterQuizList.filter(
        quiz => quiz.theme.id==this.filterTheme)
    }
    else{
        this.quizList=this.noFilterQuizList
    }
  }

  applyFilterTheme($event){
    this.filterTheme=$event
    this.applyfilter()
  }

  applyFilterName($event){
    this.filter=$event
    this.applyfilter()

  }
}
