import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeSkillMapComponent } from './add-employee-skill-map.component';

describe('AddEmployeeSkillMapComponent', () => {
  let component: AddEmployeeSkillMapComponent;
  let fixture: ComponentFixture<AddEmployeeSkillMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeSkillMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeSkillMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
