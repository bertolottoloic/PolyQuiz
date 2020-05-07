import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Handicap } from 'src/app/models/handicap.models';
import { Profile } from 'src/app/models/profile.models';
import { Trouble } from 'src/app/models/trouble.models';
import { ProfileService } from 'src/app/services/profile.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends Trouble implements OnInit {

  public HANDICAP_LIST: Handicap[] = [Handicap.Memoire, Handicap.Vue, Handicap.Moteur];

  public profileForm: FormGroup;
  public profileCreate$: Observable<Profile>;
  public profile: Profile;
  public image: string;
  public imageReceived: FormData;
  constructor(public router: Router, public formBuilder: FormBuilder, public profileService: ProfileService, public route: ActivatedRoute, private uploadService: UploadService) {
    super(router);
    let id: number;
    this.route.paramMap.subscribe(params => {
      id = Number(params.get('profileId'));
      this.profileService.profiles$.subscribe((res) => {
        const profile: Profile = res.find((profile$) => profile$.id === id);
        if (profile) {
          this.profile = profile;
          this.image = profile.image;
          this.profileForm = this.formBuilder.group({
            firstName: [profile.firstName, Validators.required],
            lastName: [profile.lastName, Validators.required],
            birthDate: [profile.birthDate.toString()!=''?formatDate(profile.birthDate.toString(), 'yyyy-MM-dd', 'en'):''],
            gender: [profile.gender.toString(), Validators.required],
            trouble: [this.trouble.toString(), Validators.required],
          });
        }
      });
    });
  }
  invalidFirstName() {
  	return (this.profileForm.controls.firstName.errors != null);
  }

  invalidLastName() {
  	return (this.profileForm.controls.lastName.errors != null);
  }

  ngOnInit() {
  }

  validProfile() {
    const profileToChange = this.profileForm.getRawValue();
    profileToChange.id = this.profile.id;
    if (this.imageReceived){     
      this.uploadService.addPicture(this.imageReceived).subscribe((image)=>{
        this.image = image;
        profileToChange.image = this.image;
        this.profileService.editProfile(profileToChange);
      });
    } else {
      profileToChange.image = this.profile.image;
      this.profileService.editProfile(profileToChange);
    }
    this.router.navigate(['../..'], { relativeTo: this.route });

  }

  receiveImg(img: FormData) {
    this.imageReceived = img;
  }

}
