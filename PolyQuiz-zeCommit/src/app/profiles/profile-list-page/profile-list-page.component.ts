import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile-list-page',
  templateUrl: './profile-list-page.component.html',
  styleUrls: ['./profile-list-page.component.css']
})
export class ProfileListPageComponent implements OnInit {


  trouble = '';

  constructor(private router: Router) {

  }

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
