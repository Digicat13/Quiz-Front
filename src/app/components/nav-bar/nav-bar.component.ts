import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: IUser;
  langs = environment.locales;
  currentLanguage = environment.defaultLanguage;
  toggleControl = new FormControl(false);
  @Output() themeChanged = new EventEmitter<boolean>();

  constructor(
    public authenticationService: AuthenticationService,
    private translateService: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(
      (u: IUser) => (this.user = u)
    );
  }

  ngOnInit(): void {
    const darkModeEnabled = JSON.parse(
      localStorage.getItem('darkThemeEnabled')
    );
    this.toggleControl.setValue(darkModeEnabled);

    this.toggleControl.valueChanges.subscribe((darkMode: boolean) => {
      this.themeChanged.next(darkMode);
    });
  }

  logout(): void {
    this.authenticationService.logout();
  }

  changeLanguage(lang: string): void {
    localStorage.setItem('currentLanguage', JSON.stringify(lang));
    this.translateService.use(lang);
  }
}
