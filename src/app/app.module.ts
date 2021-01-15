import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { TestOverviewComponent } from './components/test-overview/test-overview.component';
import { CreateTestPageComponent } from './pages/create-test-page/create-test-page.component';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { LoginFormComponent } from './pages/login-page/login-form/login-form.component';
import { AppHttpInterceptor } from './helpers/app.http.interceptor';
import { appInitializer } from './helpers/app.initializer';
import { AuthenticationService } from './services/authentication.service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ViewTestPageComponent } from './pages/view-test-page/view-test-page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EditTestPageComponent } from './pages/edit-test-page/edit-test-page.component';
import { CreateTestingPageComponent } from './pages/create-testing-page/create-testing-page.component';
import { CreateTestingComponent } from './components/create-testing/create-testing.component';
import { ViewTestingPageComponent } from './pages/view-testing-page/view-testing-page.component';
import { TestingComponent } from './components/testing/testing.component';
import { TestInfoComponent } from './pages/quiz-page/test-info/test-info.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page/quiz-page.component';
import { TestQuestionComponent } from './pages/quiz-page/test-question/test-question.component';

const MaterialComponents = [
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatDividerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatStepperModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TestTableComponent,
    NavBarComponent,
    CreateTestComponent,
    AddQuestionComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
    TestOverviewComponent,
    CreateTestPageComponent,
    LoginPageComponent,
    LoginFormComponent,
    ViewTestPageComponent,
    LoaderComponent,
    EditTestPageComponent,
    CreateTestingPageComponent,
    CreateTestingComponent,
    ViewTestingPageComponent,
    TestingComponent,
    TestInfoComponent,
    QuizPageComponent,
    TestQuestionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponents,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
