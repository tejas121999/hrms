import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyOffComponent } from './weekly-off.component';

describe('WeeklyOffComponent', () => {
  let component: WeeklyOffComponent;
  let fixture: ComponentFixture<WeeklyOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
