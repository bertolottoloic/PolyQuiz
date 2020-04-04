import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';


@Component({
  selector: 'app-profile-list-page',
  templateUrl: './profile-list-page.component.html',
  styleUrls: ['./profile-list-page.component.css']
})
export class ProfileListPageComponent implements OnInit {


  public trouble:Handicap;

  constructor(private router: Router) {
    this.setTrouble();

  }

  ngOnInit() {
  }

  setTrouble() {
    if (this.router.url.startsWith('/memoire')) {
      this.trouble = Handicap.Memoire;
    }
    if (this.router.url.startsWith('/vue')) {
      this.trouble = Handicap.Vue;
    }
    if (this.router.url.startsWith('/moteur')) {
      this.trouble = Handicap.Moteur;
    }
  }

}
