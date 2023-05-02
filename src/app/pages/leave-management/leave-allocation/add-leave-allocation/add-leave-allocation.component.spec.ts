import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveAllocationComponent } from './add-leave-allocation.component';

describe('AddLeaveAllocationComponent', () => {
  let component: AddLeaveAllocationComponent;
  let fixture: ComponentFixture<AddLeaveAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
