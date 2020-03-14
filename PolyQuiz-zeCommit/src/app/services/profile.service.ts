import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

  private profiles: Profile[] =[];

  private URL : string;
  public profiles$: BehaviorSubject<Profile[]> = new BehaviorSubject(this.profiles);

  constructor(private http: HttpClient) {
    this.setProfilesFromUrl();
  }

  addProfile(profile: Profile) {
    this.profiles.push(profile);
    this.profiles$.next(this.profiles);
  }

  deleteProfile(profile: Profile) {
    this.profiles.splice(this.profiles.indexOf(profile,1));
    this.profiles$.next(this.profiles);
  }

  setProfilesFromUrl(){
    this.http.get<{profiles: Profile[]}>(this.URL).subscribe((result: {profiles: Profile[]}) =>{
      this.profiles = result.profiles;
      this.profiles$.next(this.profiles);
    });  
  }


}

