import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Profile} from '../../models/profile.models';
import { Router } from '@angular/router';
import { Handicap } from 'src/app/models/handicap.models';
import { Subscriber, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent extends Trouble implements OnInit {

  public profileList: Profile[] = [];

  constructor(public profileService: ProfileService, public router: Router) {
    super(router)
    this.profileService.profiles$.subscribe((profiles) => {
      this.profileList = profiles.filter(profile => profile.trouble === this.trouble);
    }); 

  }

  ngOnInit() {
  }


}
