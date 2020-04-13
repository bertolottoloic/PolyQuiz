import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { httpOptionsBase, serverUrl } from '../../configs/server.config';
import { PROFILE_LIST } from '../mocks/profiles-list.mock';
import { Profile } from '../models/profile.models';


@Injectable({
    providedIn: 'root'
})

export class ProfileService {

  private profiles: Profile[] = PROFILE_LIST;

  private URL: string = serverUrl + '/profiles';
  public profiles$: BehaviorSubject<Profile[]> = new BehaviorSubject(this.profiles);
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setProfilesFromUrl();
  }

  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.URL, profile, this.httpOptions);

  }

  deleteProfile(id: number) {
    return this.http.delete(this.URL + '/' + id, this.httpOptions).subscribe(() => {
      this.setProfilesFromUrl();
    });
  }

  editProfile(profile: Profile) {
    console.log(profile);
    return this.http.put<Profile>(this.URL + '/' + profile.id, profile, this.httpOptions).subscribe(() => {
      this.setProfilesFromUrl();
    });
  }

  setProfilesFromUrl() {
    this.http.get<Profile[]>(this.URL).subscribe((profiles) => {
      this.profiles = profiles;
      this.profiles$.next(this.profiles);
    });
  }

}

