import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEveryDayAttendenceComponent } from './get-every-day-attendence.component';

describe('GetEveryDayAttendenceComponent', () => {
  let component: GetEveryDayAttendenceComponent;
  let fixture: ComponentFixture<GetEveryDayAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEveryDayAttendenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetEveryDayAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
