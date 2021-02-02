import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITest } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
})
export class TestTableComponent implements OnInit {
  tests: Array<ITest> = [];
  sortSelect = new FormControl('name');

  constructor(
    private testService: TestService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTests();
  }

  openConfirmDialog(testId: string): MatDialogRef<ConfirmDialogComponent, any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    const header = 'Are you sure?';
    const action = 'Delete';
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
                this.openMessageDialog('Successfully deleted');
                this.getTests();
              } else {
                this.openMessageDialog('Couldn`t delete this test');
              }
            },
            (error) => {
              this.openMessageDialog('Couldn`t delete this test');
            }
          );
        }
      });
  }

  getTests(): void {
    this.testService.getAll().subscribe((data: ITest[]) => {
      this.tests = data;
    });
  }
}
