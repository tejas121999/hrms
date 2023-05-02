import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEncashNotificationComponent } from './add-encash-notification.component';

describe('AddEncashNotificationComponent', () => {
  let component: AddEncashNotificationComponent;
  let fixture: ComponentFixture<AddEncashNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEncashNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEncashNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
