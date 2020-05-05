import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import {ProfileService} from '../../../services/profile.service';
import {Handicap} from 'src/app/models/handicap.models';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../models/profile.models';
import {Trouble} from 'src/app/models/trouble.models';
import { UploadService } from 'src/app/services/upload.service';
import {serverUrlAssets} from 'src/configs/server.config'

@Component({
  selector: 'app-profile-create-page',
  templateUrl: './profile-create-page.component.html',
  styleUrls: ['./profile-create-page.component.css']
})
export class ProfileCreatePageComponent extends Trouble implements OnInit {

  public HANDICAP_LIST: Handicap[] = [Handicap.Memoire, Handicap.Vue, Handicap.Moteur];

  public profileForm: FormGroup;
  public profileCreate$: Observable<Profile>;
  private imageReceived: FormData;
  private link: string;
  private link$: BehaviorSubject<string> = new BehaviorSubject(this.link);

  constructor(
    public formBuilder: FormBuilder,
    public profileService: ProfileService,
    public router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService) {
    super(router);
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: [''],
      gender: ['', Validators.required],
      trouble: [this.trouble.toString(), Validators.required],
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


  createProfile() {
    const profileToCreate: Profile = this.profileForm.getRawValue() as Profile;
    profileToCreate.image="assets/img/profil/";
    profileToCreate.image+=profileToCreate.gender.toString()==="Homme"?"homme.png":"femme.png";
    if(!this.imageReceived){
      this.postProfile(profileToCreate);
    }
    else{
      this.uploadService.addPicture(this.imageReceived).subscribe((res)=>{
        profileToCreate.image = serverUrlAssets + '/' +res;
        this.postProfile(profileToCreate);
      });
    }
  }

  postProfile(profileToCreate: Profile){
    this.profileCreate$ = this.profileService.addProfile(profileToCreate);
    this.profileCreate$.subscribe((result) => {
      if (result != null) {
        this.profileService.setProfilesFromUrl();
        this.goBack();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  receiveImg(img: FormData) {
    this.imageReceived = img;
  }


}
