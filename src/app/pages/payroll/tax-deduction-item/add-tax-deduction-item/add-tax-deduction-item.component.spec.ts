import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxDeductionItemComponent } from './add-tax-deduction-item.component';

describe('AddTaxDeductionItemComponent', () => {
  let component: AddTaxDeductionItemComponent;
  let fixture: ComponentFixture<AddTaxDeductionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxDeductionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxDeductionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
