import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
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
import {QuestionComponent} from './quizPage/question/question-memory/question-memory.component';
import {QuizPageSizeSelectionComponent} from './quizPage/quiz-page-vue/quiz-page-size-selection/quiz-page-size-selection.component';
import {EndQuizComponent} from './quizPage/end-quiz/end-quiz.component';
import {QuizPageVueComponent} from './quizPage/quiz-page-vue/quiz-page-vue.component';
import { HighlightDirective } from './quizPage/quiz-page-vue/highlight/highlight.directive';
import { QuizPageMoteurComponent } from './quizPage/quiz-page-moteur/quiz-page-moteur.component';
import { QuestionVueComponent } from './quizPage/question/question-vue/question-vue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizCreatePageComponent } from './manage/creation-page/quiz-create-page/quiz-create-page.component';
import { QuizCreateEntranceComponent } from './manage/creation-page/quiz-create-entrance/quiz-create-entrance.component';
import { QuizCreateQuestionComponent } from './manage/creation-page/quiz-create-question/quiz-create-question.component';
import { QuizCreateQuestionPageComponent } from './manage/creation-page/quiz-create-question-page/quiz-create-question-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpWarningComponent } from './pop-up/pop-up-warning/pop-up-warning.component';
import { MatDialogModule,MatDialogRef} from'@angular/material/dialog';
import { MenuComponent } from './menu/menu.component';
import { ManageProfilesComponent } from './manage/manage-profiles/manage-profiles.component';
import { ProfileCreatePageComponent } from './manage/profile-create-page/profile-create-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageQuizzesComponent } from './manage/manage-quizzes/manage-quizzes.component';
import { DisplayQuestionComponent } from './visualisation/display-question/display-question.component';
import { AddThemeComponent } from './manage/add-theme/add-theme.component';
import { ImageUploaderComponent } from './manage/image-uploader/image-uploader.component';
import { EditProfileComponent } from './manage/edit-profile/edit-profile.component';
import { DisplayWindowComponent } from './visualisation/display-profiles/display-window/display-window.component';
import { PopUpDeleteComponent } from './pop-up/pop-up-delete/pop-up-delete.component';
import { DisplayQuizComponent } from './visualisation/display-quiz/display-quiz.component';
import { FiltreQuizComponent } from './filtre-quiz/filtre-quiz.component';
import { DisplayStatComponent } from './visualisation/display-profiles/display-stat/display-stat.component';
import { NavbarQuestionComponent } from './navbar-question/navbar-question.component';
import { SizeBoxDirectiveDirective } from './directives/size-box-directive.directive';
import { PopUpAnswerComponent } from './quizPage/quiz-page-vue/pop-up-answer-component/pop-up-answer.component';
import { PopUpZoomComponent } from './quizPage/question/question-vue/pop-up-zoom/pop-up-zoom.component';


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
    PopUpWarningComponent,
    MenuComponent,
    ManageProfilesComponent,
    ProfileCreatePageComponent,
    NavbarComponent,
    ManageQuizzesComponent,
    DisplayQuestionComponent,
    AddThemeComponent,
    ImageUploaderComponent,
    EditProfileComponent,
    DisplayWindowComponent,
    PopUpDeleteComponent,
    DisplayQuizComponent,
    FiltreQuizComponent,
    DisplayStatComponent,
    NavbarQuestionComponent,
    SizeBoxDirectiveDirective,
    PopUpAnswerComponent,
    SizeBoxDirectiveDirective,
    PopUpZoomComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,

  ],
  providers: [
    NgxImageCompressService,
    {
      provide: MatDialogRef,
      useValue: {}
    },

  ],
  entryComponents: [DisplayQuizComponent, PopUpDeleteComponent, PopUpWarningComponent, PopUpAnswerComponent, DisplayQuestionComponent,
    AddThemeComponent, DisplayWindowComponent, PopUpZoomComponent],

  bootstrap: [AppComponent],

  exports: []
})
export class AppModule { }
