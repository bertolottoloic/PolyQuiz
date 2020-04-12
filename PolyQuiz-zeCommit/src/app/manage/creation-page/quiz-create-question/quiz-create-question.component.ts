import { Component, OnInit } from '@angular/core';
import { QuizListService } from 'src/app/services/quizList.service';
import { Quiz } from 'src/app/models/quiz.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.models';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/quizPage/question/question-memory/question-memory.component';
import { DisplayQuestionComponent } from 'src/app/visualisation/display-question/display-question.component';
import { Theme } from 'src/app/models/theme.models';
import { ThemeService } from 'src/app/services/theme.service';
import { AddThemeComponent } from 'src/app/manage/add-theme/add-theme.component';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-quiz-create-question',
  templateUrl: './quiz-create-question.component.html',
  styleUrls: ['./quiz-create-question.component.css']
})
export class QuizCreateQuestionComponent extends Trouble implements OnInit {

  public quiz: Quiz;
  public themes: Theme[];
  public quizForm: FormGroup;
  public image: string;

  // tslint:disable-next-line: max-line-length
  constructor(public themeService: ThemeService, public quizService: QuizListService,  private route: ActivatedRoute, public formBuilder: FormBuilder, public router: Router, public dialog: MatDialog) {
    super(router);
    this.loadQuiz();
    this.themeService.themes$.subscribe((themes) => {
      if (themes) {
        this.themes = themes;
      }
    });
  }

  ngOnInit() {
  }

  loadQuiz() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('quizId'));
      this.quizService.quizzes$.subscribe((quizzes) => {
        const quiz = quizzes.find((quiz$) => quiz$.id === id);
        if (quiz) {
          console.log(quiz.theme.id);
          this.quiz = quiz;
          this.image = quiz.image;
          this.quizForm = this.formBuilder.group({
            name: [this.quiz.name, Validators.required],
            themeId: [this.quiz.theme.id, Validators.required],
            image: [this.quiz.image]
          });
        }
      });
    });
  }

  edit(question: Question) {
    this.router.navigate(['add-question/'+question.id], { relativeTo: this.route });

  }

  delete(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }
  openDialog(question: Question) {
    console.log(question);
    this.dialog.open(DisplayQuestionComponent, {
      data: {
        trouble: this.quiz.trouble,
        quest: question,
      }
    });
  }

  openTheme() {
    this.dialog.open(AddThemeComponent, {
      data: {
        themes: this.themes,
      }
    });
  }

  sendQuiz() {
    const quizToCreate = this.quizForm.getRawValue();
    if (this.image != null) {
      quizToCreate.image = this.image;
    } else {
      quizToCreate.image = this.quiz.image;
    }
    quizToCreate.id = this.quiz.id;
    quizToCreate.trouble = this.trouble;
    this.quizService.editQuiz(quizToCreate);
    this.router.navigate(['../..'], { relativeTo: this.route });

  }

  receiveImg(img: string) {
    this.image = img;
  }
}
