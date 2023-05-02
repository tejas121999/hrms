import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTaxExemptionComponent } from './manage-tax-exemption.component';

describe('ManageTaxExemptionComponent', () => {
  let component: ManageTaxExemptionComponent;
  let fixture: ComponentFixture<ManageTaxExemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTaxExemptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTaxExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
