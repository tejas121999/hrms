import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendanceRequestComponent } from './manage-attendance-request.component';

describe('ManageAttendanceRequestComponent', () => {
  let component: ManageAttendanceRequestComponent;
  let fixture: ComponentFixture<ManageAttendanceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAttendanceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAttendanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
