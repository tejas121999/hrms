import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalaryCompComponent } from './manage-salary-comp.component';

describe('ManageSalaryCompComponent', () => {
  let component: ManageSalaryCompComponent;
  let fixture: ComponentFixture<ManageSalaryCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalaryCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalaryCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
