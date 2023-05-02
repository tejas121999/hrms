import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeCheckInComponent } from './add-employee-check-in.component';

describe('AddEmployeeCheckInComponent', () => {
  let component: AddEmployeeCheckInComponent;
  let fixture: ComponentFixture<AddEmployeeCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeCheckInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
