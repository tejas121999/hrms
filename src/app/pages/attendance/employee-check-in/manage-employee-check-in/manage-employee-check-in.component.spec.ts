import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeCheckInComponent } from './manage-employee-check-in.component';

describe('ManageEmployeeCheckInComponent', () => {
  let component: ManageEmployeeCheckInComponent;
  let fixture: ComponentFixture<ManageEmployeeCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeCheckInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
