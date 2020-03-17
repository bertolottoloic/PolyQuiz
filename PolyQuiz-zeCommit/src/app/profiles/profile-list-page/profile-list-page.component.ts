import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile-list-page',
  templateUrl: './profile-list-page.component.html',
  styleUrls: ['./profile-list-page.component.css']
})
export class ProfileListPageComponent implements OnInit {

  private state$: Observable<object>;


  constructor(private location:Location) { }

  ngOnInit() {
    console.log(this.location.getState());


  }

}
