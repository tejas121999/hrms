import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageYearlyRosterComponent } from './manage-yearly-roster.component';

describe('ManageYearlyRosterComponent', () => {
  let component: ManageYearlyRosterComponent;
  let fixture: ComponentFixture<ManageYearlyRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageYearlyRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageYearlyRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
