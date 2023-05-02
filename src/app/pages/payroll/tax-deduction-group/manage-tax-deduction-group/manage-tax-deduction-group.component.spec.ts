import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTaxDeductionGroupComponent } from './manage-tax-deduction-group.component';

describe('ManageTaxDeductionGroupComponent', () => {
  let component: ManageTaxDeductionGroupComponent;
  let fixture: ComponentFixture<ManageTaxDeductionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTaxDeductionGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTaxDeductionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
