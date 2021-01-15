import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {
  @Output() testPropertiesSubmit = new EventEmitter<ITest>();
  @Input() testId: string;
  test: ITest;

  constructor(private testService: TestService) {}

  createTestForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    timeOption: new FormControl(null),
    testTimeLimit: new FormGroup({
      hours: new FormControl(null, [Validators.pattern('^[0-9]$')]),
      minutes: new FormControl(null, [Validators.pattern('^[0-5]?[0-9]$')]),
    }),
    questionTimeLimit: new FormGroup({
      minutes: new FormControl(null, [Validators.pattern('[0-9]{0,2}')]),
      seconds: new FormControl(null, [Validators.pattern('[0-5]?[0-9]')]),
    }),
  });

  get name(): AbstractControl {
    return this.createTestForm.get('name');
  }
  get description(): AbstractControl {
    return this.createTestForm.get('description');
  }
  get timeOption(): AbstractControl {
    return this.createTestForm.get('timeOption');
  }
  get testTimeLimit(): AbstractControl {
    return this.createTestForm.get('testTimeLimit');
  }
  get questionTimeLimit(): AbstractControl {
    return this.createTestForm.get('questionTimeLimit');
  }

  async ngOnInit(): Promise<void> {
    if (this.testId) {
      await this.getTest(this.testId).then((test: ITest) => {
        this.test = test;
      });
      this.setFormValues();
    }
  }

  getTest(testId: string): Promise<ITest> {
    return this.testService.getTest(testId).toPromise();
  }

  onSubmit(): void {
    if (this.createTestForm.invalid) {
      return;
    }
    const test: ITest = {};

    if (this.timeOption.value === 'testTime') {
      const hours = +this.testTimeLimit.get('hours').value;
      const minutes = +this.testTimeLimit.get('minutes').value;
      if (hours || minutes) {
        test.testTimeLimit = moment()
          .hours(hours ? hours : 0)
          .minutes(minutes ? minutes : 0)
          .seconds(0);
      } else {
        return;
      }
    } else if (this.timeOption.value === 'questionTime') {
      const minutes = +this.questionTimeLimit.get('minutes').value;
      const seconds = +this.questionTimeLimit.get('seconds').value;
      if (minutes || seconds) {
        test.questionTimeLimit = moment()
          .hours(0)
          .minutes(minutes ? minutes : 0)
          .seconds(seconds ? seconds : 0);
      } else {
        return;
      }
    }

    test.name = this.name.value;
    test.description = this.description.value;

    this.test = test;
    this.testPropertiesSubmit.emit(this.test);
  }

  setFormValues(): void {
    if (this.test) {
      this.name.setValue(this.test.name);
      this.description.setValue(this.test.description);
      if (this.test.testTimeLimit) {
        this.timeOption.setValue('testTime');
        this.testTimeLimit
          .get('hours')
          .setValue(this.test.testTimeLimit.hours());
        this.testTimeLimit
          .get('minutes')
          .setValue(this.test.testTimeLimit.minutes());
      } else if (this.test.questionTimeLimit) {
        this.timeOption.setValue('questionTime');
        this.questionTimeLimit
          .get('minutes')
          .setValue(this.test.questionTimeLimit.minutes());
        this.questionTimeLimit
          .get('seconds')
          .setValue(this.test.questionTimeLimit.seconds());
      }
    }
  }
}
