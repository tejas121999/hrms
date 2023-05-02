import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmploymentTypeComponent } from './manage-employment-type.component';

describe('ManageEmploymentTypeComponent', () => {
  let component: ManageEmploymentTypeComponent;
  let fixture: ComponentFixture<ManageEmploymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEmploymentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmploymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
