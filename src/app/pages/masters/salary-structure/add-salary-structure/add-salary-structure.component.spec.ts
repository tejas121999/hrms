import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryStructureComponent } from './add-salary-structure.component';

describe('AddSalaryStructureComponent', () => {
  let component: AddSalaryStructureComponent;
  let fixture: ComponentFixture<AddSalaryStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalaryStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalaryStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
