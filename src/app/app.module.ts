import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const MaterialComponents = [
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TestTableComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponents,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
