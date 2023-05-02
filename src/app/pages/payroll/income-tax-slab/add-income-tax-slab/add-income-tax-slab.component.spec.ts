import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomeTaxSlabComponent } from './add-income-tax-slab.component';

describe('AddIncomeTaxSlabComponent', () => {
  let component: AddIncomeTaxSlabComponent;
  let fixture: ComponentFixture<AddIncomeTaxSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIncomeTaxSlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIncomeTaxSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
