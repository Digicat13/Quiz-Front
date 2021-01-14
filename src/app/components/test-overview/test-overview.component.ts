import { Component, Input } from '@angular/core';
import { ITest } from 'src/app/models/test';

@Component({
  selector: 'app-test-overview',
  templateUrl: './test-overview.component.html',
  styleUrls: ['./test-overview.component.scss'],
})
export class TestOverviewComponent {
  @Input() test: ITest;

  constructor() {}
}
