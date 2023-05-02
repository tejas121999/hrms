import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeGradeComponent } from './manage-employee-grade.component';

describe('ManageEmployeeGradeComponent', () => {
  let component: ManageEmployeeGradeComponent;
  let fixture: ComponentFixture<ManageEmployeeGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
