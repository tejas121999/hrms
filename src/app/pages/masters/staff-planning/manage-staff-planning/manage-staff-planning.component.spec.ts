import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStaffPlanningComponent } from './manage-staff-planning.component';

describe('ManageStaffPlanningComponent', () => {
  let component: ManageStaffPlanningComponent;
  let fixture: ComponentFixture<ManageStaffPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStaffPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStaffPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
