import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProfileListPageComponent } from './profiles/profile-list-page/profile-list-page.component';
import { QuizListPageComponent} from './quizzes/quiz-list-page/quiz-list-page.component';
import { QuizPageMemoryComponent } from './quizPage/quiz-page-memory/quiz-page-memory.component';
import {QuizPageVueComponent} from './quizPage/quiz-page-vue/quiz-page-vue.component';

const routes: Routes = [
  { path: '', component : AccueilComponent },
  { path: ':trouble/profile-list-page', component : ProfileListPageComponent },
  { path: ':trouble/profile-list-page/:idProfile/quiz-list-page', component : QuizListPageComponent },
  { path: 'memoire/profile-list-page/:idProfile/quiz-list-page/:idQuiz', component : QuizPageMemoryComponent},
  { path: 'vue/profile-list-page/:idProfile/quiz-list-page/:idQuiz', component : QuizPageVueComponent},


]


@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})


export class AppRoutingModule {

}
