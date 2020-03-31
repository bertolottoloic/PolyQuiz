import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile.models';
import { Router } from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';
import { Subscriber, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  public profileList: Profile[] = [];

  constructor(public profileService: ProfileService, private router: Router) {
    
    this.profileService.profiles$.subscribe((profiles) => {
      this.profileList = profiles.filter(profile => profile.trouble === this.profileService.currentTrouble);
    }); 

  }

  ngOnInit() {
  }

  profileDeleted(profile: Profile) {
    console.log(profile);
    this.profileService.deleteProfile(profile);
  }

}
