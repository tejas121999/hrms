import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeStateInsuranceComponent } from './add-employee-state-insurance.component';

describe('AddEmployeeStateInsuranceComponent', () => {
  let component: AddEmployeeStateInsuranceComponent;
  let fixture: ComponentFixture<AddEmployeeStateInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeStateInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeStateInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
