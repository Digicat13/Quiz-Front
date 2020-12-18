import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
  constructor() {}

  createTestForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    testTimeLimit: new FormControl(),
    questionTimeLimit: new FormControl(),
  });

  ngOnInit(): void {}
}
