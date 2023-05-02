import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPendingNotificationComponent } from './add-pending-notification.component';

describe('AddPendingNotificationComponent', () => {
  let component: AddPendingNotificationComponent;
  let fixture: ComponentFixture<AddPendingNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPendingNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPendingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
