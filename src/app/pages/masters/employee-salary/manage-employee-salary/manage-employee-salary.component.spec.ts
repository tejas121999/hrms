import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeSalaryComponent } from './manage-employee-salary.component';

describe('ManageEmployeeSalaryComponent', () => {
  let component: ManageEmployeeSalaryComponent;
  let fixture: ComponentFixture<ManageEmployeeSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
