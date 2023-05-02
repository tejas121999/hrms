import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeePayrollComponent } from './manage-employee-payroll.component';

describe('ManageEmployeePayrollComponent', () => {
  let component: ManageEmployeePayrollComponent;
  let fixture: ComponentFixture<ManageEmployeePayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeePayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
