import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile.models';
import { Router } from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  public profileList: Profile[] = [];

  constructor(public profileService: ProfileService, private router: Router) {
    this.profileService.profiles$.subscribe((profiles: Profile[]) => {this.profileList = profiles;});
    console.log(this.profileList);
    this.profileList = this.getSpecifyProfil();
  }

  ngOnInit() {
  }

  profileSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }

  profileDeleted(profile: Profile) {
    console.log(profile);
    this.profileService.deleteProfile(profile);
  }

  getSpecifyProfil() {
    if (this.router.url.startsWith('/memoire')) {
       return this.profileList.filter(profile => profile.trouble === Handicap.Memoire);
    }
    if (this.router.url.startsWith('/vue')) {
      return this.profileList.filter(profile => profile.trouble === Handicap.Vue);
    }
    if (this.router.url.startsWith('/moteur')) {
      return this.profileList.filter(profile => profile.trouble === Handicap.Moteur);
    }
  }
}
