import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.css']
})
export class ManageProfilesComponent implements OnInit {

  public trouble: Handicap

  constructor(private router:Router,public profileService:ProfileService) { 
    this.setTrouble(); }

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

  deleteClem(id){
    this.profileService.deleteProfile(id).subscribe(()=>this.profileService.setProfilesFromUrl())
  }
}
