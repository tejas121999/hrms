import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffPlanningComponent } from './add-staff-planning.component';

describe('AddStaffPlanningComponent', () => {
  let component: AddStaffPlanningComponent;
  let fixture: ComponentFixture<AddStaffPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
