import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryCompComponent } from './add-salary-comp.component';

describe('AddSalaryCompComponent', () => {
  let component: AddSalaryCompComponent;
  let fixture: ComponentFixture<AddSalaryCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalaryCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaryCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
