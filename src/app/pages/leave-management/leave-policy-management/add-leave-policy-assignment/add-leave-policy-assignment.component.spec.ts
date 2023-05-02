import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavePolicyAssignmentComponent } from './add-leave-policy-assignment.component';

describe('AddLeavePolicyAssignmentComponent', () => {
  let component: AddLeavePolicyAssignmentComponent;
  let fixture: ComponentFixture<AddLeavePolicyAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeavePolicyAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeavePolicyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
