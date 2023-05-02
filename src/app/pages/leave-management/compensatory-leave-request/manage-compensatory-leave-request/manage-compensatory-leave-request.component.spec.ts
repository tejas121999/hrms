import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompensatoryLeaveRequestComponent } from './manage-compensatory-leave-request.component';

describe('ManageCompensatoryLeaveRequestComponent', () => {
  let component: ManageCompensatoryLeaveRequestComponent;
  let fixture: ComponentFixture<ManageCompensatoryLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCompensatoryLeaveRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompensatoryLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
