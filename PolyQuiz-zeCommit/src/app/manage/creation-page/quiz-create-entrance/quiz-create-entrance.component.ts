import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { QuizListService } from '../../../services/quizList.service';
import { QuizCreatePageComponent } from '../quiz-create-page/quiz-create-page.component';
import { Quiz } from '../../../models/quiz.models';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Handicap } from 'src/app/models/handicap.models';
import { Theme } from 'src/app/models/theme.models';
import { ThemeService } from 'src/app/services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { AddThemeComponent } from 'src/app/add-theme/add-theme.component';
import { THEME_LIST } from 'src/app/mocks/theme.mock';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-quiz-create-entrance',
  templateUrl: './quiz-create-entrance.component.html',
  styleUrls: ['./quiz-create-entrance.component.css']
})
export class QuizCreateEntranceComponent extends Trouble implements OnInit {


  public quizForm: FormGroup;
  public quizCreate$: Observable<Quiz>;
  public quizId: number;
  public themes: Theme[];
  public image: string;

  // tslint:disable-next-line: max-line-length
  constructor(public themeService: ThemeService, public formBuilder: FormBuilder, public quizListService: QuizListService, public router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    super(router);
    this.themeService.themes$.subscribe((themes) => {
      if (themes) {
        this.themes = themes;
      }
    });
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      themeId: ['', Validators.required],
    });

  }

  ngOnInit() {
  }


  addQuiz() {
    const quizToCreate = this.quizForm.getRawValue();
    quizToCreate.themeId = parseInt(quizToCreate.themeId, 10);
    quizToCreate.trouble = this.trouble;
    if (this.image == null) {
      quizToCreate.image = this.themes.find(value => value.id === quizToCreate.themeId).image;
    } else {
    quizToCreate.image = this.image;
  }
    console.log(quizToCreate);
    this.quizCreate$ = this.quizListService.addQuiz(quizToCreate);
    this.quizCreate$.subscribe((result) => {
      this.quizListService.setQuizzesFromUrl();
      this.quizListService.postQuiz = result;
      this.quizId = result.id;
      this.router.navigate([this.quizId], { relativeTo: this.route });
    });
  }

  deleteTheme(theme: Theme){
    this.themeService.deleteTheme((theme.id).toString()).subscribe(() => {
      this.themeService.setThemesFromUrl();
      this.quizListService.setQuizzesFromUrl();
    });
  }

  openDialog() {
    this.dialog.open(AddThemeComponent, {
      data: {
      }
    });
  }

  receiveImg(img: string) {
    this.image = img;
  }

  editTheme(theme: Theme) {
    this.dialog.open(AddThemeComponent, {
      data: {
        theme,
      }
    });
  }

}
