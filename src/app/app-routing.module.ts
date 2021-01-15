import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { CreateTestPageComponent } from './pages/create-test-page/create-test-page.component';
import { CreateTestingPageComponent } from './pages/create-testing-page/create-testing-page.component';
import { EditTestPageComponent } from './pages/edit-test-page/edit-test-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { ViewTestPageComponent } from './pages/view-test-page/view-test-page.component';
import { ViewTestingPageComponent } from './pages/view-testing-page/view-testing-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'create-test',
    component: CreateTestPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test/:id',
    component: ViewTestPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test/edit/:id',
    component: EditTestPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-testing/:testId',
    component: CreateTestingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'testing',
    component: ViewTestingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'testing/:id',
    component: ViewTestingPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
