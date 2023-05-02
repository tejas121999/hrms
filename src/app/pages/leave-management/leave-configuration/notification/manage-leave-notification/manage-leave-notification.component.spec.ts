import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveNotificationComponent } from './manage-leave-notification.component';

describe('ManageLeaveNotificationComponent', () => {
  let component: ManageLeaveNotificationComponent;
  let fixture: ComponentFixture<ManageLeaveNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeaveNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaveNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
