import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { QuizListService } from '../services/quizList.service';
import { Handicap } from '../models/handicap.models';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router, public quizListService:QuizListService) {
    this.router = router;
  }

  ngOnInit() {
  }

  setCurrentTrouble(trouble:string){
    if(trouble==="memoire"){
      this.quizListService.currentTrouble = Handicap.Memoire;
    } else if(trouble==="vue"){
      this.quizListService.currentTrouble = Handicap.Vue;
    } else if(trouble==="moteur"){
      this.quizListService.currentTrouble = Handicap.Moteur;
    }
    console.log(this.quizListService.currentTrouble);
  }



}
