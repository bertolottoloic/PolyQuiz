import { Component, OnInit, Input } from '@angular/core';
import { Handicap } from '../models/handicap.models';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../models/profile.models';

@Component({
  selector: 'app-navbar-question',
  templateUrl: './navbar-question.component.html',
  styleUrls: ['./navbar-question.component.css']
})
export class NavbarQuestionComponent implements OnInit {

  @Input()
  
  @Input()
  title:string;
 

  constructor() { 
   
  }

  ngOnInit() {
  
  }
}
