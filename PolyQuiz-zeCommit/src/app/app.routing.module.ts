import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfileListPageComponent } from './profiles/profile-list-page/profile-list-page.component';
import { QuizListPageComponent} from './quizzes/quiz-list-page/quiz-list-page.component';
import { QuizPageComponent } from './quizPage/quiz-page/quiz-page.component';
import {QuizPageVueComponent} from './quizPage/quiz-page-vue/quiz-page-vue.component';

const routes: Routes = [
  { path: '', component : AccueilComponent },
  { path: ':trouble/profileListPage', component : ProfileListPageComponent },
  { path: ':trouble/profileListPage/:idProfile/quizListPage', component : QuizListPageComponent },
  { path: ':trouble/profileListPage/:idProfile/quizListPage/:idQuiz', component : QuizPageComponent},
  { path: ':Vue/profileListPage/:idProfile/quizListPage/:idQuiz', component : QuizPageVueComponent},


]


@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})


export class AppRoutingModule {

}
