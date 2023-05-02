import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUploadAttendanceComponent } from './add-upload-attendance.component';

describe('AddUploadAttendanceComponent', () => {
  let component: AddUploadAttendanceComponent;
  let fixture: ComponentFixture<AddUploadAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUploadAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUploadAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
