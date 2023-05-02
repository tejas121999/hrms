import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeGroupComponent } from './add-employee-group.component';

describe('AddEmployeeGroupComponent', () => {
  let component: AddEmployeeGroupComponent;
  let fixture: ComponentFixture<AddEmployeeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
