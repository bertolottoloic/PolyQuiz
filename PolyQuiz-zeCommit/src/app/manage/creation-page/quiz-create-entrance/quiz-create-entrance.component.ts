import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { QuizListService } from '../../../services/quizList.service'
import { QuizCreatePageComponent } from '../quiz-create-page/quiz-create-page.component'
import { Quiz } from '../../../models/quiz.models'
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Handicap } from 'src/app/models/handicap.models';
import { Theme } from 'src/app/models/theme.models';
import { ThemeService } from 'src/app/services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { AddThemeComponent } from 'src/app/add-theme/add-theme.component';

@Component({
  selector: 'app-quiz-create-entrance',
  templateUrl: './quiz-create-entrance.component.html',
  styleUrls: ['./quiz-create-entrance.component.css']
})
export class QuizCreateEntranceComponent implements OnInit {

  
  private trouble:Handicap;
  public quizForm: FormGroup;
  public quizCreate$:Observable<Quiz>;
  public quizId:number;
  public themes:Theme[];

  constructor(public themeService:ThemeService, public formBuilder:FormBuilder, public quizListService:QuizListService, private router:Router,private route: ActivatedRoute,public dialog: MatDialog) { 
    this.themeService.themes$.subscribe((themes) => {
      if (themes) {
        this.themes = themes;
      }
    })
    this.setTrouble();
    this.quizForm = this.formBuilder.group({
      name:['',Validators.required],
      theme:['',Validators.required],
    });
  }

  ngOnInit() {
  }


  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToCreate.trouble = this.trouble; 
    this.quizCreate$ = this.quizListService.addQuiz(quizToCreate);
    this.quizCreate$.subscribe((result)=>{
      this.quizListService.setQuizzesFromUrl();
      this.quizListService.postQuiz = result;
      this.quizId=result.id;
      this.router.navigate([this.quizId], { relativeTo: this.route })
    }) 
    
  }

  setTrouble() {
    console.log(this.router.url);
    if (this.router.url.startsWith('/memoire')) {
      this.trouble = Handicap.Memoire;
    }
    if (this.router.url.startsWith('/vue')) {
      this.trouble = Handicap.Vue;
    }
    if (this.router.url.startsWith('/moteur')) {
      this.trouble = Handicap.Moteur;
    }
  }

  openDialog() {
    this.dialog.open(AddThemeComponent, {
      data: {
        themes:this.themes,
      }
    });
  }
  

}
