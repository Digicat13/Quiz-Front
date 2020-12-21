import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ITest } from 'src/app/models/test';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
  @Input() test: ITest;

  constructor() {}

  createTestForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    testTimeLimit: new FormControl(),
    questionTimeLimit: new FormControl(),
  });

  ngOnInit(): void {}
}
