import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { httpOptionsBase, serverUrl } from '../../configs/server.config';
import { Stat } from '../models/stat.models';
import { StatMemory } from '../models/stat-memory.models';
import { Handicap } from '../models/handicap.models';


@Injectable({
    providedIn: 'root'
})

export class StatService {

  private stats: Stat[];
  public MEMORY = '/stat-memory';
  public VUE = '/stat-vue';
  public MOTEUR = '/stat-moteur';

  private URL: string = serverUrl + '/stats';
  public stats$: BehaviorSubject<Stat[]> = new BehaviorSubject(this.stats);
  private selectedStats: Stat[];
  public selectedStat$: BehaviorSubject<Stat[]> = new BehaviorSubject(this.selectedStats);
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  addStat(stat: any, trouble: string): Observable<Stat> {
    const statToCreate = {...stat};
    if (trouble === this.MEMORY) {
      let trial = statToCreate.trial;
      trial = [...statToCreate.trial].reduce((o, [key, value]) => (o[key] = value, o), {});
      statToCreate.trial = trial;
    }
    return this.http.post<Stat>(this.URL + trouble, statToCreate, this.httpOptions);
  }

  deleteStat(id: number, trouble: string) {
    return this.http.delete(this.URL + trouble + '/' + id, this.httpOptions).subscribe(() => {
      this.setStatsFromUrl(trouble);
    });
  }

  editStat(stat: Stat, trouble: string) {
    console.log(stat);
    return this.http.put<Stat>(this.URL + trouble + '/' + stat.id, stat, this.httpOptions).subscribe(() => {
      this.setStatsFromUrl(trouble);
    });
  }

  setStatsFromUrl(trouble: string) {
    this.http.get<Stat[]>(this.URL + trouble).subscribe((stats) => {
      this.stats = stats;
      this.stats$.next(this.stats);
    });
  }

  getProfileStats(profileId: number, trouble: Handicap) {
    let troubleUrl:string=this.convertTroubleToString(trouble);

    this.http.get<Stat[]>(this.URL + troubleUrl + '/p/' + profileId).subscribe((stats) => {
      this.selectedStats = stats;
      this.selectedStat$.next(this.selectedStats);
    });
  }

  convertTroubleToString(trouble:Handicap):string{
    let troubleUrl:string;
    switch(trouble){
      case Handicap.Memoire:
        troubleUrl=this.MEMORY;
        break;
      case Handicap.Moteur:
        troubleUrl=this.MOTEUR;
        break;
      case Handicap.Vue:
        troubleUrl=this.VUE;
        break;
    }
    return troubleUrl;
  }

}

