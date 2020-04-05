import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Quiz } from '../../models/quiz.models'
import { ProfileService } from '../../services/profile.service'
import { Handicap } from 'src/app/models/handicap.models';
import {Router, ActivatedRoute} from '@angular/router';
import { Profile } from '../../models/profile.models';

@Component({
  selector: 'app-profile-create-page',
  templateUrl: './profile-create-page.component.html',
  styleUrls: ['./profile-create-page.component.css']
})
export class ProfileCreatePageComponent implements OnInit {

  public HANDICAP_LIST:Handicap[]=[Handicap.Memoire,Handicap.Vue,Handicap.Moteur];

  private trouble:Handicap;
  public profileForm: FormGroup;
  public profileCreate$:Observable<Profile>;


  constructor(public formBuilder:FormBuilder, public profileService:ProfileService, private router:Router,private route: ActivatedRoute) { 
    this.setTrouble();
    this.profileForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      birthDate:['',Validators.required],
      gender:['',Validators.required],
      trouble:[this.trouble.toString(),Validators.required],

    });
  }
  invalidFirstName()
  {
  	return (this.profileForm.controls.firstName.errors != null);
  }

  invalidLastName()
  {
  	return (this.profileForm.controls.lastName.errors != null);
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

  createProfile(){
    const profileToCreate: Profile = this.profileForm.getRawValue() as Profile;
    this.profileCreate$ = this.profileService.addProfile(profileToCreate);
    this.profileCreate$.subscribe((result)=>{
      if(result!=null){
        this.profileService.setProfilesFromUrl();
        this.goBack()
      }
    }) 
  }

  goBack():void{
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
