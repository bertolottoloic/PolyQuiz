import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Trouble } from 'src/app/models/trouble.models';
import { Profile } from 'src/app/models/profile.models';

export enum State{
  Delete="delete",
  Modify="modify",
  None="none"

}
@Component({
  selector: 'app-manage-profiles',
  templateUrl: './manage-profiles.component.html',
  styleUrls: ['./manage-profiles.component.css']
})
export class ManageProfilesComponent extends Trouble implements OnInit {
  public state=State.None;

  public profileList:Profile[];

  constructor(public router:Router,public profileService:ProfileService,public route:ActivatedRoute) { 
    super(router)
    this.profileService.profiles$.subscribe((prof) => {
      this.profileList = prof.filter(profile => profile.trouble === this.trouble);
    });
  }

  ngOnInit() {
  }


  changeState(state:State){
    if(this.state==state){
      this.state=State.None;}
    else{
      this.state=state;
    }
  }


  action(profile:Profile){
    if(this.state==State.Delete){
      this.profileService.deleteProfile(profile.id);
    }
    if(this.state==State.Modify){
      this.router.navigate(["create/"+profile.id],{ relativeTo: this.route })
    }
  }
}
