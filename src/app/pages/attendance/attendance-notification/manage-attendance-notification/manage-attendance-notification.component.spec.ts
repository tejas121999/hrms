import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendanceNotificationComponent } from './manage-attendance-notification.component';

describe('ManageAttendanceNotificationComponent', () => {
  let component: ManageAttendanceNotificationComponent;
  let fixture: ComponentFixture<ManageAttendanceNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAttendanceNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAttendanceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
