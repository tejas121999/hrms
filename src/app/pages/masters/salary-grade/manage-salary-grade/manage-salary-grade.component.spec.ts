import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalaryGradeComponent } from './manage-salary-grade.component';

describe('ManageSalaryGradeComponent', () => {
  let component: ManageSalaryGradeComponent;
  let fixture: ComponentFixture<ManageSalaryGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalaryGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSalaryGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
