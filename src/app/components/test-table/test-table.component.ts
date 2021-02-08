import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
})
export class TestTableComponent {
  private testArray = [];
  @Output() deleteQuestion = new EventEmitter<string>();
  @Input() set tests(tests: Array<ITest>) {
    this.testArray = tests;
  }
  get tests(): Array<ITest> {
    return this.testArray;
  }

  constructor(private testService: TestService, public dialog: MatDialog) {}

  openConfirmDialog(testId: string): MatDialogRef<ConfirmDialogComponent, any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    const header = 'are-you-sure';
    const action = 'delete';
    dialogRef.componentInstance.header = header;
    dialogRef.componentInstance.buttonAction = action;
    dialogRef.componentInstance.testId = testId;
    return dialogRef;
  }

  openMessageDialog(message: string, header?: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe();
  }

  onDeleteTest(id: string): void {
    this.openConfirmDialog(id)
      .afterClosed()
      .subscribe((dialogResult: boolean) => {
        if (dialogResult === true) {
          this.testService.deleteTest(id).subscribe(
            (result: boolean) => {
              if (result === true) {
                this.openMessageDialog('successfully-deleted');
                this.deleteQuestion.next(id);
              } else {
                this.openMessageDialog('error-delete-test');
              }
            },
            (error) => {
              this.openMessageDialog('error-delete-test');
            }
          );
        }
      });
  }
}
