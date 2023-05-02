import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStateTaxSlabComponent } from './add-state-tax-slab.component';

describe('AddStateTaxSlabComponent', () => {
  let component: AddStateTaxSlabComponent;
  let fixture: ComponentFixture<AddStateTaxSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStateTaxSlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStateTaxSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
