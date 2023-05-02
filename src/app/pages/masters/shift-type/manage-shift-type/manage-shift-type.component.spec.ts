import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShiftTypeComponent } from './manage-shift-type.component';

describe('ManageShiftTypeComponent', () => {
  let component: ManageShiftTypeComponent;
  let fixture: ComponentFixture<ManageShiftTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShiftTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShiftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
