import { Component, OnInit, Input } from '@angular/core';
import { StatMemory } from '../models/stat.models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-end-quiz',
  templateUrl: './end-quiz.component.html',
  styleUrls: ['./end-quiz.component.css']
})
export class EndQuizComponent implements OnInit {

  public trouble: string;

  @Input() stats: StatMemory;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setTrouble();
  }

  setTrouble() {
      console.log(this.router.url);
      if (this.router.url.startsWith('/memoire')) {
        this.trouble = 'Mémoire';
      }
      if (this.router.url.startsWith('/vue')) {
        this.trouble = 'Vue';
      }
      if (this.router.url.startsWith('/moteur')) {
        this.trouble = 'Moteur';
      }
  }

}
