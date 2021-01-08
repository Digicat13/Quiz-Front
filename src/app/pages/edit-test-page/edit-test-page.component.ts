import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';
import { IQuestion } from 'src/app/models/question';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-edit-test-page',
  templateUrl: './edit-test-page.component.html',
  styleUrls: ['./edit-test-page.component.scss'],
})
export class EditTestPageComponent implements OnInit {
  test: ITest;
  testId: string;
  questionsToDelete = new Array<{ id: string }>();
  answersToDelete = new Array<{ id: string }>();

  constructor(
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.testId = params.get('id');
    });
  }

  onStepOne(test: ITest, stepper: MatStepper): void {
    this.test = test;
    stepper.next();
  }

  onStepTwo(questions: IQuestion[], stepper: MatStepper): void {
    this.test.questions = questions;
    stepper.next();
  }

  returnStepOne(stepper: MatStepper): void {
    stepper.previous();
  }

  returnStepTwo(stepper: MatStepper): void {
    stepper.previous();
  }

  onQuestionDelete(questionId: string): void {
    this.questionsToDelete.push({ id: questionId });
  }

  onAnswerDelete(answerId: string): void {
    this.answersToDelete.push({ id: answerId });
  }

  onSubmit(test: ITest): void {
    console.log(test);
    test.id = this.testId;
    this.testService.editTest(test).subscribe(
      (result: ITest) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.answersToDelete.length > 0) {
      this.answersToDelete.forEach((answer) => {
        this.testService.deleteQuestion(answer.id).subscribe();
      });
    }
    if (this.questionsToDelete.length > 0) {
      this.questionsToDelete.forEach((question) => {
        this.testService.deleteQuestion(question.id).subscribe();
      });
    }

    this.openMessageDialog('Successfully edited!');
    this.router.navigate(['/home-page']);
  }

  openMessageDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe();
  }
}
