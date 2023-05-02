import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStateTaxSlabComponent } from './manage-state-tax-slab.component';

describe('ManageStateTaxSlabComponent', () => {
  let component: ManageStateTaxSlabComponent;
  let fixture: ComponentFixture<ManageStateTaxSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStateTaxSlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageStateTaxSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
