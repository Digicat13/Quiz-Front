import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  public buttonAction = 'Ok';
  public header: string;
  public hint: string;
  public message: string;
  public testId: string;
  constructor() {}
}
