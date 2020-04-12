import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizListService } from 'src/app/services/quizList.service';
import { Answer } from 'src/app/models/answer.models';
import { Question } from 'src/app/models/question.models';
import { ActivatedRoute, Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { Trouble } from 'src/app/models/trouble.models';


@Component({
  selector: 'app-quiz-create-question-page',
  templateUrl: './quiz-create-question-page.component.html',
  styleUrls: ['./quiz-create-question-page.component.css']
})
export class QuizCreateQuestionPageComponent extends Trouble implements OnInit {

  public questionForm: FormGroup;
  public questionType: FormGroup;
  public answers: FormArray;
  public quizId:number;
  public questId:number;
  question:Question;
  public imageQuestion:string;
  public type:string;

  constructor(public formBuilder:FormBuilder, public quizListService:QuizListService,public route:ActivatedRoute,public router:Router) {
    super(router)
    this.questionType=this.formBuilder.group({
      type: ['text'],
    });
    this.route.paramMap.subscribe(params => {
      if(params!=null){
        this.quizId = Number(params.get('quizId'))
        this.questId= Number(params.get('questionId'))
        if(this.questId){
        this.quizListService.quizzes$.subscribe((value)=>{
          if(value){
            const quiz = value.find((val)=>val.id==this.quizId)
            if(quiz){
              this.question=quiz.questions.find((ques)=>ques.id==this.questId)
              this.fillQuestionForm();
            }
          }
        })
      }
    }
    })

  }

  ngOnInit() {
    if(this.question){
      this.fillQuestionForm();
    }
    else{
      this.initializeQuestionForm();
    }
  }

  controlRightAnswer():boolean{
    let nbTrue=0;
    this.answers.value.forEach(element => {
      if(element.isCorrect==true){
        nbTrue++;
      }
    });
    return nbTrue>0?true:false;
  }


  get formData() { return <FormArray>this.questionForm.get('answers'); }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      text: [''],
      image:[''],
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
    if(this.questionForm.valid&&this.controlRightAnswer()) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizListService.addQuestion(this.quizId, question);
      this.initializeQuestionForm();
      this.router.navigate(["../"],{ relativeTo: this.route })
    }
  }

  changeQuestion() {
    if(this.questionForm.valid) {
      const question=this.questionForm.getRawValue();
      question.image=this.questionForm.value.image

      let validQuestion:any;
       if( this.question.image||this.imageQuestion ) validQuestion = question;
       else validQuestion = {text:question.text,quizId:question.quizId,answers:question.answers}
      validQuestion.id = this.question.id;
      this.quizListService.editQuestion(this.quizId, validQuestion);
      this.initializeQuestionForm();
      this.router.navigate(["../.."],{ relativeTo: this.route })

    }
  }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      text:['',Validators.required],
      image:[],
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
    if(this.question.image){
      this.imageQuestion=this.question.image
    }
    this.fillAnswers();

  }

  fillAnswers(){
    this.answers = this.questionForm.get('answers') as FormArray;
    for(let i = 1; i<4 ; i++)  {
        this.answers.push(this.fillAnswer(this.question.answers[i]));
      }
  }

  fillAnswer(answer:Answer): FormGroup {
    return this.formBuilder.group({
      text: [answer.text],
      isCorrect: [answer.isCorrect],
      id: [answer.id],
      image: [answer.image]
    });
  }

  invalidAnswer(index)
  {
  	return (this.answers.at(index).value.text=='');
  }
  invalidQuestion()
  {
  	return (this.questionForm.controls.text.errors!=null);
  }
  receiveImg(img: string) {
    this.imageQuestion = img;
    this.questionForm.value.image=img;

  }
  receiveImgAnsw($img:string,elm){
    elm.value.image=$img;
    console.log(this.questionForm)
  }


}
