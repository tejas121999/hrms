import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomeTaxDeductionComponent } from './add-income-tax-deduction.component';

describe('AddIncomeTaxDeductionComponent', () => {
  let component: AddIncomeTaxDeductionComponent;
  let fixture: ComponentFixture<AddIncomeTaxDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIncomeTaxDeductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncomeTaxDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
