import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent {
  @Output() testPropertiesSubmit = new EventEmitter();
  @Input() testForm: FormGroup;
  submitted = false;

  constructor(private testService: TestService) {}

  get name(): AbstractControl {
    return this.testForm.get('name');
  }
  get description(): AbstractControl {
    return this.testForm.get('description');
  }
  get timeOption(): AbstractControl {
    return this.testForm.get('timeOption');
  }
  get testTimeLimit(): AbstractControl {
    return this.testForm.get('testTimeLimit');
  }
  get questionTimeLimit(): AbstractControl {
    return this.testForm.get('questionTimeLimit');
  }

  getTest(testId: string): Promise<ITest> {
    return this.testService.getTest(testId).toPromise();
  }

  validateTestProperties(): boolean {
    if (this.name.invalid) {
      return true;
    }
    if (this.description.invalid) {
      return true;
    }
    if (this.timeOption.invalid) {
      return true;
    }
    if (this.testTimeLimit.invalid) {
      return true;
    }
    if (this.questionTimeLimit.invalid) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.validateTestProperties()) {
      return;
    }
    this.testPropertiesSubmit.emit();
  }
}
