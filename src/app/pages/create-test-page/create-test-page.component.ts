import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-create-test-page',
  templateUrl: './create-test-page.component.html',
  styleUrls: ['./create-test-page.component.scss'],
})
export class CreateTestPageComponent {
  test: ITest;

  constructor(
    private testService: TestService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onTestPropertiesSubmit(test: ITest, stepper: MatStepper): void {
    this.test = test;
    stepper.next();
  }

  onQuestionsSubmit(questions: IQuestion[], stepper: MatStepper): void {
    this.test.questions = questions;
    stepper.next();
  }

  goToTestProperties(stepper: MatStepper): void {
    stepper.previous();
  }

  goToQuestions(stepper: MatStepper): void {
    stepper.previous();
  }

  onSubmit(test: ITest): void {
    this.testService.createTest(test).subscribe(
      () => {
        this.openMessageDialog('Successfully created!');
        this.router.navigate(['/home-page']);
      },
      (error) => {
        console.log(error);
        this.openMessageDialog('Failed to create quiz.');
      }
    );
  }

  openMessageDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe();
  }
}
