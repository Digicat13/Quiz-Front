import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
  @Input() header: string;
  @Input() message: string;
  @Input() hint: string;

  constructor() {}

  ngOnInit(): void {}
}
