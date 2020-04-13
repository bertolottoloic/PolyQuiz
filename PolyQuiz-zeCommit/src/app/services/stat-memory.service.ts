import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../../configs/server.config';

import { StatMemory } from '../models/stat-memory.models';

@Injectable({
    providedIn: 'root'
})

export class ThemeService {

  public stats: StatMemory[];

  private URL: string = serverUrl + '/stat-memory';
  public stats$: BehaviorSubject<StatMemory[]> = new BehaviorSubject(this.stats);
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setStatsFromUrl();
  }


  setStatsFromUrl(){
    this.http.get<StatMemory[]>(this.URL).subscribe((stat) =>{
      this.stats = stat;
      this.stats$.next(this.stats);
    });
  }

}

