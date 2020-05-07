import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddThemeComponent } from 'src/app/manage/quiz/add-theme/add-theme.component';
import { Question } from 'src/app/models/question.models';
import { Quiz } from 'src/app/models/quiz.models';
import { Theme } from 'src/app/models/theme.models';
import { Trouble } from 'src/app/models/trouble.models';
import { DisplayQuestionComponent } from 'src/app/pop-up/visualisation/display-question/display-question.component';
import { QuizListService } from 'src/app/services/quizList.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UploadService } from 'src/app/services/upload.service';

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
  public imageReceived: FormData;

  constructor(public themeService: ThemeService, public quizService: QuizListService,  private route: ActivatedRoute, 
    public formBuilder: FormBuilder, public router: Router, public dialog: MatDialog, private uploadService: UploadService) {
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
    this.dialog.open(DisplayQuestionComponent, {
      height:"80%",
      width:"80%",
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
    quizToCreate.id = this.quiz.id;
    quizToCreate.trouble = this.trouble;
    if (this.imageReceived){   
      this.uploadService.addPicture(this.imageReceived).subscribe((image)=>{
        this.image = image;
        quizToCreate.image = this.image;
        this.quizService.editQuiz(quizToCreate);
      });
    } else {
      quizToCreate.image = this.quiz.image;
      this.quizService.editQuiz(quizToCreate);
    }
    
    this.router.navigate(['../..'], { relativeTo: this.route });

  }

  receiveImg(img: FormData) {
    this.imageReceived = img;
  }
}
