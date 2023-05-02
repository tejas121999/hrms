import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxDeductionGroupComponent } from './add-tax-deduction-group.component';

describe('AddTaxDeductionGroupComponent', () => {
  let component: AddTaxDeductionGroupComponent;
  let fixture: ComponentFixture<AddTaxDeductionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxDeductionGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxDeductionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
