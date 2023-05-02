import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveApplicationComponent } from './add-leave-application.component';

describe('AddLeaveApplicationComponent', () => {
  let component: AddLeaveApplicationComponent;
  let fixture: ComponentFixture<AddLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
