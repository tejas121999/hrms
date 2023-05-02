import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxExemptionComponent } from './add-tax-exemption.component';

describe('AddTaxExemptionComponent', () => {
  let component: AddTaxExemptionComponent;
  let fixture: ComponentFixture<AddTaxExemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxExemptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
