import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeProvidentFundComponent } from './manage-employee-provident-fund.component';

describe('ManageEmployeeProvidentFundComponent', () => {
  let component: ManageEmployeeProvidentFundComponent;
  let fixture: ComponentFixture<ManageEmployeeProvidentFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeProvidentFundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeProvidentFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
