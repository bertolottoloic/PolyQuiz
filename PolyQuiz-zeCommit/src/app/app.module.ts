import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AccueilComponent} from './accueil/accueil.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app.routing.module';
import {ProfileListPageComponent} from './profiles/profile-list-page/profile-list-page.component';
import {ProfileListComponent} from './profiles/profile-list/profile-list.component';
import {ProfileComponent} from './profiles/profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizListPageComponent} from './quizzes/quiz-list-page/quiz-list-page.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {QuizPageMemoryComponent} from './quizPage/quiz-page-memory/quiz-page-memory.component';
import {QuestionComponent} from './quizPage/question/question.component';
import {QuizPageSizeSelectionComponent} from './quizPage/quiz-page-vue/quiz-page-size-selection/quiz-page-size-selection.component';
import {EndQuizComponent} from './end-quiz/end-quiz.component';
import {QuizPageVueComponent} from './quizPage/quiz-page-vue/quiz-page-vue.component';
import { HighlightDirective } from './quizPage/quiz-page-vue/highlight/highlight.directive';
import { QuizPageMoteurComponent } from './quizPage/quiz-page-moteur/quiz-page-moteur.component';
import { QuestionVueComponent } from './quizPage/question/question-vue/question-vue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizCreateComponent } from './quizzes/creation-page/quiz-create/quiz-create.component';
import { QuizCreatePageComponent } from './quizzes/creation-page/quiz-create-page/quiz-create-page.component';
import { QuizCreateEntranceComponent } from './quizzes/creation-page/quiz-create-entrance/quiz-create-entrance.component';
import { QuizCreateQuestionComponent } from './quizzes/creation-page/quiz-create-question/quiz-create-question.component';
import { QuizCreateQuestionPageComponent } from './quizzes/creation-page/quiz-create-question-page/quiz-create-question-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    HeaderComponent,
    ProfileListPageComponent,
    ProfileListComponent,
    ProfileComponent,
    QuizListPageComponent,
    QuizListComponent,
    QuizComponent,
    QuizCreateComponent,
    QuizCreatePageComponent,
    QuizPageMemoryComponent,
    QuestionComponent,
    QuizPageSizeSelectionComponent,
    EndQuizComponent,
    QuizPageVueComponent,
    HighlightDirective,
    QuizPageMoteurComponent,
    QuestionVueComponent,
    QuizCreateEntranceComponent,
    QuizCreateQuestionComponent,
    QuizCreateQuestionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
