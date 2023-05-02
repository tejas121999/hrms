import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProcessPayrollComponent } from './view-process-payroll.component';

describe('ViewProcessPayrollComponent', () => {
  let component: ViewProcessPayrollComponent;
  let fixture: ComponentFixture<ViewProcessPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProcessPayrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProcessPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
