import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShiftAssignmentComponent } from './manage-shift-assignment.component';

describe('ManageShiftAssignmentComponent', () => {
  let component: ManageShiftAssignmentComponent;
  let fixture: ComponentFixture<ManageShiftAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShiftAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShiftAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
