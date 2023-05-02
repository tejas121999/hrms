import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeStateInsuranceComponent } from './manage-employee-state-insurance.component';

describe('ManageEmployeeStateInsuranceComponent', () => {
  let component: ManageEmployeeStateInsuranceComponent;
  let fixture: ComponentFixture<ManageEmployeeStateInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeStateInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeStateInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
