import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentNotificationComponent } from './absent-notification.component';

describe('AbsentNotificationComponent', () => {
  let component: AbsentNotificationComponent;
  let fixture: ComponentFixture<AbsentNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsentNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsentNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
