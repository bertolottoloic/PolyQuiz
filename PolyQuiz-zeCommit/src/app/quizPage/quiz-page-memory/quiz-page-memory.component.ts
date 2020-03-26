import { Component, OnInit, Input } from '@angular/core';
import { Quiz} from '../../models/quiz.models';
import{ QuizListService} from '../../services/quizList.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question.models';
import { StatMemory } from 'src/app/models/stat.models';

@Component({
  selector: 'app-quiz-page-memory',
  templateUrl: './quiz-page-memory.component.html',
  styleUrls: ['./quiz-page-memory.component.css']
})
export class QuizPageMemoryComponent implements OnInit {

  public quiz: Quiz;
  public questionList: Question[];
  public question: Question;
  public index: number=0;
  public quizDone: boolean;
  public stats: StatMemory;
  private timer: number;

  constructor(public quizService: QuizListService,private route: ActivatedRoute) {
    let id:number;
    this.route.paramMap.subscribe(params => {
      id=Number(params.get('idQuiz'))
      this.quizService.quizzes$.subscribe((quizzes) => {
        let quiz= quizzes.filter((quiz)=>quiz.id==id)[0]
        if(quiz){
          this.quiz=quiz
          this.questionList=quiz.questions
          this.question=quiz.questions[this.index];
        }
      })
    })
    this.stats=new StatMemory(); //creation objet stat
    this.timer=Date.now(); //debut chrono

}

  ngOnInit() {
    
  }

  receiveQ($event) {
    if (this.index + $event < this.questionList.length) {
      this.index += $event;
    } else {
      this.stats.time=Date.now()-this.timer //temps mis pour completer le quiz
      this.quizDone = true; //fin du quiz
    }
  }

  skipQ(n) { // saute n question(s)
    this.index = n;
  }
}
