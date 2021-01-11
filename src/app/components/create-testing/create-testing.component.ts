import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-testing',
  templateUrl: './create-testing.component.html',
  styleUrls: ['./create-testing.component.scss'],
})
export class CreateTestingComponent implements OnInit {
  constructor() {}

  createTestingForm = new FormGroup({
    intervieweeName: new FormControl(null),
    allowedStartDate: new FormControl(null),
    allowedEndDate: new FormControl(null),
    numberOfRuns: new FormControl(null),
  });

  ngOnInit(): void {}

  onSubmit(): void {}
}
