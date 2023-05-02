import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHolidayListComponent } from './manage-holiday-list.component';

describe('ManageHolidayListComponent', () => {
  let component: ManageHolidayListComponent;
  let fixture: ComponentFixture<ManageHolidayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageHolidayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
