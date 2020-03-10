import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule} from './app.routing.module';
import { ProfileListPageComponent } from './profile/profile-list-page/profile-list-page.component';
import { ProfileListComponent } from './profile/profile-list/profile-list.component';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    ProfileListPageComponent,
    ProfileListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
