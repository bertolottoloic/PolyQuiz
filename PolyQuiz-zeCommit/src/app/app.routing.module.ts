import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfileListPageComponent } from './profiles/profile-list-page/profile-list-page.component';


const routes:Routes=[
  { path: '', component : AccueilComponent },
  { path: 'profileListPage/memoire', component : ProfileListPageComponent },
  { path: 'profileListPage/vue', component : ProfileListPageComponent },
  { path: 'profileListPage/moteur', component : ProfileListPageComponent }
]


@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})


export class AppRoutingModule{

}
