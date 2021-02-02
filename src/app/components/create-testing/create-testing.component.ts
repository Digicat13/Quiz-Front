import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ITesting } from 'src/app/models/testing';

@Component({
  selector: 'app-create-testing',
  templateUrl: './create-testing.component.html',
  styleUrls: ['./create-testing.component.scss'],
})
export class CreateTestingComponent {
  @Output() testingSubmit = new EventEmitter<ITesting>();

  constructor() {}

  createTestingForm = new FormGroup({
    intervieweeName: new FormControl(null),
    allowedStartDate: new FormControl(null),
    allowedStartTime: new FormControl(null),
    allowedEndDate: new FormControl(null),
    allowedEndTime: new FormControl(null),
    numberOfRuns: new FormControl(null),
  });

  get form(): FormGroup {
    return this.createTestingForm;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const testing: ITesting = {};

    if (this.form.get('intervieweeName').value) {
      testing.intervieweeName = this.form.get('intervieweeName').value;
    }
    if (this.form.get('allowedStartDate').value) {
      testing.allowedStartDate = this.form.get('allowedStartDate').value;
      const time: Moment = moment(
        this.form.get('allowedStartTime').value,
        'HH:mm'
      );
      testing.allowedStartDate.setHours(time.hours());
      testing.allowedStartDate.setMinutes(time.minutes());
      const offset = moment(testing.allowedStartDate).add(2, 'hours');
      testing.allowedStartDate = offset.toDate();
    }
    if (this.form.get('allowedEndDate').value) {
      testing.allowedEndDate = this.form.get('allowedEndDate').value;
      const time: Moment = moment(
        this.form.get('allowedEndTime').value,
        'HH:mm'
      );
      testing.allowedEndDate.setHours(time.hours());
      testing.allowedEndDate.setMinutes(time.minutes());
      const offset = moment(testing.allowedEndDate).add(2, 'hours');
      testing.allowedEndDate = offset.toDate();
    }
    if (this.form.get('numberOfRuns').value) {
      testing.numberOfRuns = this.form.get('numberOfRuns').value;
    }

    this.testingSubmit.emit(testing);
  }
}
