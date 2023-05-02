import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeavePolicyAssignmentComponent } from './manage-leave-policy-assignment.component';

describe('ManageLeavePolicyAssignmentComponent', () => {
  let component: ManageLeavePolicyAssignmentComponent;
  let fixture: ComponentFixture<ManageLeavePolicyAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeavePolicyAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeavePolicyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
