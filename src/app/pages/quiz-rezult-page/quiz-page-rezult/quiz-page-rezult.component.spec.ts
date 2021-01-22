import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPageRezultComponent } from './quiz-page-rezult.component';

describe('QuizPageRezultComponent', () => {
  let component: QuizPageRezultComponent;
  let fixture: ComponentFixture<QuizPageRezultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPageRezultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPageRezultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
