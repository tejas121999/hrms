import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceNotificationComponent } from './attendance-notification.component';

describe('AttendanceNotificationComponent', () => {
  let component: AttendanceNotificationComponent;
  let fixture: ComponentFixture<AttendanceNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
