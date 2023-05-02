import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprovalNotificationComponent } from './add-approval-notification.component';

describe('AddApprovalNotificationComponent', () => {
  let component: AddApprovalNotificationComponent;
  let fixture: ComponentFixture<AddApprovalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApprovalNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApprovalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
