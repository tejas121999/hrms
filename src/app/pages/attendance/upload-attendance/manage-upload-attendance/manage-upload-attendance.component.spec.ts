import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUploadAttendanceComponent } from './manage-upload-attendance.component';

describe('ManageUploadAttendanceComponent', () => {
  let component: ManageUploadAttendanceComponent;
  let fixture: ComponentFixture<ManageUploadAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUploadAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUploadAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
