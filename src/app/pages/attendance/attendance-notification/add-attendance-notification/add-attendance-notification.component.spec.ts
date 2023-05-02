import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceNotificationComponent } from './add-attendance-notification.component';

describe('AddAttendanceNotificationComponent', () => {
  let component: AddAttendanceNotificationComponent;
  let fixture: ComponentFixture<AddAttendanceNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttendanceNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttendanceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
