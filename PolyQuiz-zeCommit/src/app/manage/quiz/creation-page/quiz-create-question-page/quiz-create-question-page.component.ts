import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer.models';
import { Question } from 'src/app/models/question.models';
import { Trouble } from 'src/app/models/trouble.models';
import { QuizListService } from 'src/app/services/quizList.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-quiz-create-question-page',
  templateUrl: './quiz-create-question-page.component.html',
  styleUrls: ['./quiz-create-question-page.component.css']
})
export class QuizCreateQuestionPageComponent extends Trouble implements OnInit {

  public questionForm: FormGroup;
  public questionType: FormGroup;
  public answers: FormArray;
  public quizId: number;
  public questId: number;
  question: Question;
  public imageQuestion = '';
  public receivedImageQuestion: FormData;
  public imageAnswers: string[] = [];
  public receivedImageAnswers: FormData[] = [];
  public images: Observable<string>[] = []
  public type: string;
  public answersAreText = true;

  constructor(public formBuilder: FormBuilder, public quizListService: QuizListService, public route: ActivatedRoute, public router: Router, private uploadService: UploadService) {
    super(router);
    this.questionType = this.formBuilder.group({
      type: [true],
    });
    this.route.paramMap.subscribe(params => {
      if (params != null) {
        this.quizId = Number(params.get('quizId'));
        this.questId = Number(params.get('questionId'));
        if (this.questId) {
          this.quizListService.quizzes$.subscribe((value) => {
            if (value) {
              const quiz = value.find((val) => val.id == this.quizId);
              if (quiz) {
                this.question = quiz.questions.find((ques) => ques.id == this.questId);
                if(this.question) {
                    this.questionType = this.formBuilder.group({
                    type: [this.question.answersAreText],
                  });
                  if (this.question.answers.length > 0) {
                    this.fillQuestionForm();
                  }
                }
              }
            }
          });
        }
      }
    });

  }

  ngOnInit() {
    if (this.question) {
      this.fillQuestionForm();
    } else {
      this.initializeQuestionForm();
    }
  }


  get formData() {
    return this.questionForm.get('answers') as FormArray;
  }

  createAnswer(): FormGroup {
    return this.formBuilder.group({
      text: [''],
      isCorrect: [false],
      image: ['']
    });
  }


  addAnswer(): void {
    this.answers = this.questionForm.get('answers') as FormArray;

    for (let i = 0; i < 3; i++) {
      this.answers.push(this.createAnswer());
    }
  }

  addQuestion() {
    if (this.questionForm.valid && this.controlRightAnswer()) {
      const question = this.questionForm.getRawValue();
      question.answersAreText = this.questionType.value.type;
      if(this.receivedImageQuestion) this.images.push(this.uploadService.addPicture(this.receivedImageQuestion));
      else this.images.push(new Observable(observer => observer.next('')));
      this.postImageAnswers(question);
      combineLatest(this.images).subscribe((array)=>{
        question.image = array[0]
        for (let i = 1; i < array.length; i++) {
          this.imageAnswers[i-1] = (array[i]=='') ? '' : array[i]
          question.answers[i-1].image = this.imageAnswers[i-1];
          question.answers[i-1].text = (question.answersAreText) ? question.answers[i-1].text : '';
        }
        this.quizListService.addQuestion(this.quizId, question);
      });
      
      this.initializeQuestionForm();
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  changeQuestion() {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue();
      question.id = this.question.id;
      question.answersAreText = this.questionType.value.type;
      if(this.receivedImageQuestion) this.images.push(this.uploadService.addPicture(this.receivedImageQuestion));
      else this.images.push(new Observable(observer => observer.next('')));
      this.postImageAnswers(question);
      combineLatest(this.images).subscribe((array) => {
        question.image = (array[0]=='') ? this.question.image : array[0];
        for(let i=1; i<array.length ; i++){
          if(question.answersAreText) question.answers[i-1].image = '';
          else{
            question.answers[i-1].text = ''
            if(array[i]=='') question.answers[i-1].image = this.question.answers[i-1].image
            else {
              this.imageAnswers[i-1] = array[i];
              question.answers[i-1].image = this.imageAnswers[i-1];
            }
          }
        }
        this.quizListService.editQuestion(this.quizId, question);
      });

      
      
      this.initializeQuestionForm();
      this.router.navigate(['../..'], {relativeTo: this.route});

    }
  }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      text: ['', Validators.required],
      answers: this.formBuilder.array([this.createAnswer()]),
    });
    this.addAnswer();
  }

  fillQuestionForm() {
    this.questionForm = this.formBuilder.group({
      text: [this.question.text, Validators.required],
      answers: this.formBuilder.array([this.fillAnswer(this.question.answers[0])]),
    });
    if (this.question.image) {
      this.imageQuestion = this.question.image;
    }

    this.fillAnswers();

  }

  fillAnswers() {
    this.answers = this.questionForm.get('answers') as FormArray;
    this.imageAnswers[0] = this.question.answers[0].image;
    for (let i = 1; i < 4; i++) {
      this.answers.push(this.fillAnswer(this.question.answers[i]));
      this.imageAnswers[i] = this.question.answers[i].image;
    }
  }

  fillAnswer(answer: Answer): FormGroup {
    return this.formBuilder.group({
      text: [answer.text],
      isCorrect: [answer.isCorrect],
      id: [answer.id]
    });
  }

  invalidImage(index) {
    return (this.imageAnswers[index] == null);
  }

  invalidAnswer(index) {
    return (this.answers.at(index).value.text === '');
  }

  invalidQuestion() {
    return (this.questionForm.controls.text.errors != null);
  }

  controlRightAnswer(): boolean {
    let nbTrue = 0;
    this.answers.value.forEach(element => {
      if (element.isCorrect === true) {
        nbTrue++;
      }
    });
    return nbTrue === 1;
  }

  controlText() {
    let i = 0;
    for (let j = 0; j < 4; j++) {
      if (this.answers.value[j].text == '') {
        i++;
      }
    }
    return i == 0;
  }

  controlImage() {
    for (let i = 0; i < 4; i++) {
      if (this.imageAnswers[i] == null && this.receivedImageAnswers[i]==null) {
        return false;
      }
    }
    return true;
  }

  receiveImg(img: FormData) {
    this.receivedImageQuestion = img;
  }

  receiveImgAnsw($img: FormData, index) {
    this.receivedImageAnswers[index] = $img;
  }

  postImageAnswers(question: any){

    for(let i=0; i<question.answers.length; i++){
      if(this.receivedImageAnswers && this.receivedImageAnswers[i]) this.images.push(this.uploadService.addPicture(this.receivedImageAnswers[i]))
      else this.images.push(new Observable(observer => observer.next('')))
    }
  }


}
