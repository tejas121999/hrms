import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIncomeTaxDeductionComponent } from './manage-income-tax-deduction.component';

describe('ManageIncomeTaxDeductionComponent', () => {
  let component: ManageIncomeTaxDeductionComponent;
  let fixture: ComponentFixture<ManageIncomeTaxDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIncomeTaxDeductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIncomeTaxDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
