import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTaxDeductionItemComponent } from './manage-tax-deduction-item.component';

describe('ManageTaxDeductionItemComponent', () => {
  let component: ManageTaxDeductionItemComponent;
  let fixture: ComponentFixture<ManageTaxDeductionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTaxDeductionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTaxDeductionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
