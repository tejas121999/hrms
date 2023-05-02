import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceRequestComponent } from './add-attendance-request.component';

describe('AddAttendanceRequestComponent', () => {
  let component: AddAttendanceRequestComponent;
  let fixture: ComponentFixture<AddAttendanceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAttendanceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAttendanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
