import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeSkillMapComponent } from './manage-employee-skill-map.component';

describe('ManageEmployeeSkillMapComponent', () => {
  let component: ManageEmployeeSkillMapComponent;
  let fixture: ComponentFixture<ManageEmployeeSkillMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeSkillMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeSkillMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
