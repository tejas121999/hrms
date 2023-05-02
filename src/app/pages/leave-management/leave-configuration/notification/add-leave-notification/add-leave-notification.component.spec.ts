import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveNotificationComponent } from './add-leave-notification.component';

describe('AddLeaveNotificationComponent', () => {
  let component: AddLeaveNotificationComponent;
  let fixture: ComponentFixture<AddLeaveNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
