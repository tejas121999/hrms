import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeePayrollComponent } from './view-employee-payroll.component';

describe('ViewEmployeePayrollComponent', () => {
  let component: ViewEmployeePayrollComponent;
  let fixture: ComponentFixture<ViewEmployeePayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeePayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmployeePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
