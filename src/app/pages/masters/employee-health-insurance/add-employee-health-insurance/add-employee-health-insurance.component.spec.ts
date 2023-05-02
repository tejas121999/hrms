import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeHealthInsuranceComponent } from './add-employee-health-insurance.component';

describe('AddEmployeeHealthInsuranceComponent', () => {
  let component: AddEmployeeHealthInsuranceComponent;
  let fixture: ComponentFixture<AddEmployeeHealthInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeHealthInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeHealthInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
