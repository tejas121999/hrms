import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewYearlyRosterComponent } from './view-yearly-roster.component';

describe('ViewYearlyRosterComponent', () => {
  let component: ViewYearlyRosterComponent;
  let fixture: ComponentFixture<ViewYearlyRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewYearlyRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewYearlyRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
