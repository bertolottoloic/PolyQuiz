import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { PROFILE_LIST } from 'src/app/mocks/profiles-list.mock'
import { Handicap } from 'src/app/models/profile.model'


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  public profileList: Profile[] = [];

  constructor(public profileService: ProfileService) {
    this.profileService.profiles$.subscribe((profiles: Profile[]) => {this.profileList = profiles;});
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
}
