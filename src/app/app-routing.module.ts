import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { AuthGuard } from './helpers/auth.guard';
import { CreateTestPageComponent } from './pages/create-test-page/create-test-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'add-question',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-test',
    component: CreateTestPageComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
