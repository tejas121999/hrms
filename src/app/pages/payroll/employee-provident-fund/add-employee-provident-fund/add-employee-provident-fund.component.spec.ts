import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeProvidentFundComponent } from './add-employee-provident-fund.component';

describe('AddEmployeeProvidentFundComponent', () => {
  let component: AddEmployeeProvidentFundComponent;
  let fixture: ComponentFixture<AddEmployeeProvidentFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeProvidentFundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeProvidentFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
