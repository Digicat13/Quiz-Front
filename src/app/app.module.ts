import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { TestOverviewComponent } from './components/test-overview/test-overview.component';
import { CreateTestPageComponent } from './pages/create-test-page/create-test-page.component';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { LoginFormComponent } from './pages/login-page/login-form/login-form.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';

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
    TestOverviewComponent,
    CreateTestPageComponent,
    LoginPageComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponents,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
