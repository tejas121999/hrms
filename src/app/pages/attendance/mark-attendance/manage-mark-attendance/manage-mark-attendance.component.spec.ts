import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMarkAttendanceComponent } from './manage-mark-attendance.component';

describe('ManageMarkAttendanceComponent', () => {
  let component: ManageMarkAttendanceComponent;
  let fixture: ComponentFixture<ManageMarkAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMarkAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMarkAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
