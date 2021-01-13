import { Component, OnInit } from '@angular/core';
import { ITest } from 'src/app/models/test';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  public buttonAction = 'Ok';
  public header: string;
  public hint: string;
  public message: string;
  public testId: string;
  constructor() {}

  ngOnInit(): void {}
}
