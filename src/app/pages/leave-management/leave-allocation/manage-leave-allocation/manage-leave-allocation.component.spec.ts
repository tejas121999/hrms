import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveAllocationComponent } from './manage-leave-allocation.component';

describe('ManageLeaveAllocationComponent', () => {
  let component: ManageLeaveAllocationComponent;
  let fixture: ComponentFixture<ManageLeaveAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeaveAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaveAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
