import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationNotificationComponent } from './add-application-notification.component';

describe('AddApplicationNotificationComponent', () => {
  let component: AddApplicationNotificationComponent;
  let fixture: ComponentFixture<AddApplicationNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicationNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApplicationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
