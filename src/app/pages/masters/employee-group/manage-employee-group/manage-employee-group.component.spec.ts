import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeGroupComponent } from './manage-employee-group.component';

describe('ManageEmployeeGroupComponent', () => {
  let component: ManageEmployeeGroupComponent;
  let fixture: ComponentFixture<ManageEmployeeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmployeeGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
