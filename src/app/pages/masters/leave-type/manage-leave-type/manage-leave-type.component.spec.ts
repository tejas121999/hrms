import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveTypeComponent } from './manage-leave-type.component';

describe('ManageLeaveTypeComponent', () => {
  let component: ManageLeaveTypeComponent;
  let fixture: ComponentFixture<ManageLeaveTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeaveTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
