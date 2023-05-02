import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayListComponent } from './add-holiday-list.component';

describe('AddHolidayListComponent', () => {
  let component: AddHolidayListComponent;
  let fixture: ComponentFixture<AddHolidayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHolidayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
