import { OverlayContainer } from '@angular/cdk/overlay';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  HostBinding,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { IUser } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  title = 'Quizzer';
  currentUser: IUser;
  isLoading: boolean;
  @HostBinding('class') className = '';

  constructor(
    private authenticatinService: AuthenticationService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    translateService: TranslateService,
    private overlay: OverlayContainer
  ) {
    const language = JSON.parse(localStorage.getItem('currentLanguage'));
    if (language) {
      translateService.use(language);
    } else {
      localStorage.setItem(
        'currentLanguage',
        JSON.stringify(environment.defaultLanguage)
      );
      translateService.use(environment.defaultLanguage);
    }

    this.authenticatinService.currentUser.subscribe(
      (user: IUser) => (this.currentUser = user)
    );

    const darkModeEnabled = JSON.parse(
      localStorage.getItem('darkThemeEnabled')
    );
    if (darkModeEnabled) {
      this.changeTheme(darkModeEnabled);
    } else {
      this.changeTheme(environment.darkThemeEnabled);
    }

    moment.fn.toJSON = function (): any {
      return this.format('HH:mm:ss');
    };
  }

  ngAfterViewChecked(): void {
    this.loadingService.loadingStatus.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading)
    );
    this.cdr.detectChanges();
  }

  changeTheme(darkMode: boolean): void {
    const darkClassName = 'darkMode';
    this.className = darkMode ? darkClassName : '';
    if (darkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }

    localStorage.setItem('darkThemeEnabled', JSON.stringify(darkMode));
  }
}
