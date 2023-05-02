import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShiftRequestComponent } from './manage-shift-request.component';

describe('ManageShiftRequestComponent', () => {
  let component: ManageShiftRequestComponent;
  let fixture: ComponentFixture<ManageShiftRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageShiftRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageShiftRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
