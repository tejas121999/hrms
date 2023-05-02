import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingNotificationComponent } from './missing-notification.component';

describe('MissingNotificationComponent', () => {
  let component: MissingNotificationComponent;
  let fixture: ComponentFixture<MissingNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
