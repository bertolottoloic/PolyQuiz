import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Trouble } from 'src/app/models/trouble.models';

@Component({
  selector: 'app-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.css']
})
export class ManageProfilesComponent extends Trouble implements OnInit {

  constructor(public router:Router,public profileService:ProfileService) { 
    super(router)
    }

  ngOnInit() {
  }

  deleteClem(id){
    this.profileService.deleteProfile(id).subscribe(()=>this.profileService.setProfilesFromUrl())
  }
}
