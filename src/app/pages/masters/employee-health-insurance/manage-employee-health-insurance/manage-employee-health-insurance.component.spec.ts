import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeHealthInsuranceComponent } from './manage-employee-health-insurance.component';

describe('ManageEmployeeHealthInsuranceComponent', () => {
  let component: ManageEmployeeHealthInsuranceComponent;
  let fixture: ComponentFixture<ManageEmployeeHealthInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeHealthInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeHealthInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
