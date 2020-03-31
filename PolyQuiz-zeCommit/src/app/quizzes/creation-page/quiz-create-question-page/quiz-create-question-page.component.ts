import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QuizListService } from 'src/app/services/quizList.service';
import { Answer } from 'src/app/models/answer.models';
import { Question } from 'src/app/models/question.models';

@Component({
  selector: 'app-quiz-create-question-page',
  templateUrl: './quiz-create-question-page.component.html',
  styleUrls: ['./quiz-create-question-page.component.css']
})
export class QuizCreateQuestionPageComponent implements OnInit {

  public questionForm: FormGroup;
  public answers: FormArray;
  
  @Input() quizId:number;
  
  constructor(public formBuilder:FormBuilder, public quizListService:QuizListService) { 
    
    this.initializeQuestionForm();
    
  }

  ngOnInit() {
    
  }

  changeValue(index:number){
    
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
      question.quizId = this.quizId;
      this.quizListService.addQuestion(this.quizId, question);
      this.initializeQuestionForm();
    }
  }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      text:[''],
      theme:[''],
      image:[''],
      answers: this.formBuilder.array([this.createAnswer()]),
    });
    this.addAnswer();
  }

  affiche(){
    console.log(this.answers);
    // console.log(this.quizId);
  }
  
  changeRoute(route:string){
    this.quizListService.changeRouteCreateQuiz(route);
  }

}
