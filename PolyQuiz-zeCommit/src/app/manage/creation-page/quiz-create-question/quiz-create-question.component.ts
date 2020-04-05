import { Component, OnInit } from '@angular/core';
import { QuizListService } from 'src/app/services/quizList.service';
import { Quiz } from 'src/app/models/quiz.models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Question } from 'src/app/models/question.models';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/quizPage/question/question-memory/question-memory.component';
import { DisplayQuestionComponent } from 'src/app/display-question/display-question.component';

@Component({
  selector: 'app-quiz-create-question',
  templateUrl: './quiz-create-question.component.html',
  styleUrls: ['./quiz-create-question.component.css']
})
export class QuizCreateQuestionComponent implements OnInit {

  quiz:Quiz;
  public quizForm: FormGroup;


  constructor(public quizService:QuizListService,  private route: ActivatedRoute,public formBuilder:FormBuilder,public router:Router,public dialog: MatDialog) { 
    this.loadQuiz()
    
  }

  ngOnInit() {
  }

  loadQuiz() {
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('quizId'))
      this.quizService.quizzes$.subscribe((quizzes) => {
        let quiz = quizzes.filter((quiz) => quiz.id === id)[0]
        if (quiz) {
          this.quiz = quiz
          this.quizForm = this.formBuilder.group({
            name:[this.quiz.name,Validators.required],
            theme:[this.quiz.theme,Validators.required],
          });
        }
      })
    })
  }

  edit(question:Question){
    this.router.navigate(['add-question',{quest: JSON.stringify(question)}], { relativeTo: this.route });

  }

  delete(question:Question){
    this.quizService.deleteQuestion(this.quiz,question);
  }
  openDialog(question:Question) {
    console.log(question)
    this.dialog.open(DisplayQuestionComponent, {
      data: {
        trouble:this.quiz.trouble,
        quest: question,
      }
    });
  }
}
