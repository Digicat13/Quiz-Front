import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  user: IUser;
  langs = environment.locales;
  currentLanguage = environment.defaultLanguage;

  constructor(
    public authenticationService: AuthenticationService,
    private translateService: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(
      (u: IUser) => (this.user = u)
    );
  }

  logout(): void {
    this.authenticationService.logout();
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }
}
