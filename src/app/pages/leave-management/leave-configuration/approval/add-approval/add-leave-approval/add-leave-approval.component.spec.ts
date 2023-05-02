import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveApprovalComponent } from './add-leave-approval.component';

describe('AddLeaveApprovalComponent', () => {
  let component: AddLeaveApprovalComponent;
  let fixture: ComponentFixture<AddLeaveApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
