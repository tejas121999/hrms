import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryGradeComponent } from './add-salary-grade.component';

describe('AddSalaryGradeComponent', () => {
  let component: AddSalaryGradeComponent;
  let fixture: ComponentFixture<AddSalaryGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalaryGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaryGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
