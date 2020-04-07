import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QuizListService } from 'src/app/services/quizList.service';
import { Answer } from 'src/app/models/answer.models';
import { Question } from 'src/app/models/question.models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from 'src/app/quizPage/question/question-memory/question-memory.component';

@Component({
  selector: 'app-quiz-create-question-page',
  templateUrl: './quiz-create-question-page.component.html',
  styleUrls: ['./quiz-create-question-page.component.css']
})
export class QuizCreateQuestionPageComponent implements OnInit {

  public questionForm: FormGroup;
  public answers: FormArray;
  public quizId:number;
  question:Question;
  
  
  constructor(public formBuilder:FormBuilder, public quizListService:QuizListService,public route:ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      if(params!=null){
        this.quizId = Number(params.get('quizId'))}
    })
    
  }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.question=JSON.parse(params.get('quest')) as Question;
    });
    if(this.question){
      this.fillQuestionForm();
    }
    else{
      this.initializeQuestionForm();
    }
  }


  get formData() { return <FormArray>this.questionForm.get('answers'); }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      text: [''],
      isCorrect: [false],
    });
  }


  addAnswer(): void {
    this.answers = this.questionForm.get('answers') as FormArray;

    for(let i = 0; i<3 ; i++)  {
        this.answers.push(this.createAnswer());
      }
  }

  addQuestion() {
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizListService.addQuestion(this.quizId, question);
      this.initializeQuestionForm();
    }
  }

  changeQuestion() {
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizListService.editQuestion(this.quizId, question);
      this.initializeQuestionForm();
    }
  }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      text:[''],
      image:[''],
      answers: this.formBuilder.array([this.createAnswer()]),
    });
    this.addAnswer();
  }

  fillQuestionForm(){
    this.questionForm = this.formBuilder.group({
      text:[this.question.text],
      image:[this.question.image],
      answers: this.formBuilder.array([this.fillAnswer(this.question.answers[0])]),
    });
    this.fillAnswers();

  }

  fillAnswers(){
    this.answers = this.questionForm.get('answers') as FormArray;
    console.log(this.answers)
    for(let i = 1; i<4 ; i++)  {
        this.answers.push(this.fillAnswer(this.question.answers[i]));
      }
  }

  fillAnswer(answer:Answer): FormGroup {
    return this.formBuilder.group({
      text: [answer.text],
      isCorrect: [answer.isCorrect],
    });
  }

 

}
