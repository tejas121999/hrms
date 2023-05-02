import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompensatoryLeaveRequestComponent } from './add-compensatory-leave-request.component';

describe('AddCompensatoryLeaveRequestComponent', () => {
  let component: AddCompensatoryLeaveRequestComponent;
  let fixture: ComponentFixture<AddCompensatoryLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompensatoryLeaveRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompensatoryLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
