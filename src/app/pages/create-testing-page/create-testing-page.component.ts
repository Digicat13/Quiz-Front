import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/components/dialogs/message-dialog/message-dialog.component';
import { ITest } from 'src/app/models/test';
import { ITesting } from 'src/app/models/testing';
import { TestService } from 'src/app/services/test.service';
import { TestingService } from 'src/app/services/testing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-testing-page',
  templateUrl: './create-testing-page.component.html',
  styleUrls: ['./create-testing-page.component.scss'],
})
export class CreateTestingPageComponent implements OnInit {
  testName: string;
  testId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private testingService: TestingService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.testId) {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.testId = params.get('testId');
      });
    }

    this.getTestName(this.testId);
  }

  getTestName(testId): void {
    this.testService.getTest(testId).subscribe(
      (test: ITest) => {
        this.testName = test.name;
      },
      (error) => {
        console.log('Failed to retrieve test');
      }
    );
  }

  onSubmit(testing: ITesting): void {
    testing.testId = this.testId;
    this.testingService.createTesting(testing).subscribe(
      (result: ITesting) => {
        this.openMessageDialog(`Successfully created!`);
        this.router.navigate(['/testing', result.id]);
      },
      (error) => {
        this.openMessageDialog('Failed to create testing');
      }
    );
  }

  openMessageDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.afterClosed().subscribe();
  }
}
