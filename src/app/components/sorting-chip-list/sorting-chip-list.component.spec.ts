import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingChipListComponent } from './sorting-chip-list.component';

describe('SortingChipListComponent', () => {
  let component: SortingChipListComponent;
  let fixture: ComponentFixture<SortingChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingChipListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
