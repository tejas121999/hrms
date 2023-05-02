import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeGradeComponent } from './add-employee-grade.component';

describe('AddEmployeeGradeComponent', () => {
  let component: AddEmployeeGradeComponent;
  let fixture: ComponentFixture<AddEmployeeGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
