import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftAssignmentComponent } from './add-shift-assignment.component';

describe('AddShiftAssignmentComponent', () => {
  let component: AddShiftAssignmentComponent;
  let fixture: ComponentFixture<AddShiftAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShiftAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
