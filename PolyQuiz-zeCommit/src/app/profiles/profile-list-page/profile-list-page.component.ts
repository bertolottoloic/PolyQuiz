import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile-list-page',
  templateUrl: './profile-list-page.component.html',
  styleUrls: ['./profile-list-page.component.css']
})
export class ProfileListPageComponent implements OnInit {

  
  trouble:string = "";

  constructor(private router: Router) { 

  }

  ngOnInit() {
    this.setTrouble()
  }

  setTrouble() {
    if(this.router.url.endsWith("memoire")){ this.trouble="Mémoire" }
    if(this.router.url.endsWith("vue")){ this.trouble="Vue" }
    if(this.router.url.endsWith("moteur")){ this.trouble="Moteur" }
  }

}
