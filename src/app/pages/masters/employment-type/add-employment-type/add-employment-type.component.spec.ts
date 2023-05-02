import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmploymentTypeComponent } from './add-employment-type.component';

describe('AddEmploymentTypeComponent', () => {
  let component: AddEmploymentTypeComponent;
  let fixture: ComponentFixture<AddEmploymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmploymentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmploymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
