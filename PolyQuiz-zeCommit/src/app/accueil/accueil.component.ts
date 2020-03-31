import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { QuizListService } from '../services/quizList.service';
import { Handicap } from '../models/handicap.models';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  constructor(private router: Router, public quizListService:QuizListService, public profileService:ProfileService) {
    this.router = router;
  }

  ngOnInit() {
  }

  



}
