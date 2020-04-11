import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {THEME_LIST} from '../mocks/theme.mock';
import { serverUrl, httpOptionsBase } from '../../configs/server.config';

import { Handicap } from '../models/handicap.models';
import { Theme } from '../models/theme.models';

@Injectable({
    providedIn: 'root'
})

export class ThemeService {

  public themes: Theme[] = THEME_LIST;

  private URL : string = serverUrl+"/themes";
  public themes$: BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);
  private httpOptions = httpOptionsBase;

  constructor(private http:HttpClient) {
    this.setThemesFromUrl()
  }

  addTheme(theme: Theme){
    return this.http.post<Theme>(this.URL, theme, this.httpOptions)
  }

  editTheme(theme:Theme){
    return this.http.post<Theme>(this.URL+"/"+(theme.id), theme, this.httpOptions)
  }

  deleteTheme(id: string) {
    console.log(this.URL+"/"+id)
    return this.http.delete(this.URL+"/"+id, this.httpOptions)
  }

  setThemesFromUrl(){
    this.http.get<Theme[]>(this.URL).subscribe((themes) =>{
      this.themes = themes;
      this.themes$.next(this.themes);
    });
  }

}

