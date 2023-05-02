import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIncomeTaxSlabComponent } from './manage-income-tax-slab.component';

describe('ManageIncomeTaxSlabComponent', () => {
  let component: ManageIncomeTaxSlabComponent;
  let fixture: ComponentFixture<ManageIncomeTaxSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageIncomeTaxSlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageIncomeTaxSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
