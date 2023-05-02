import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearlyRosterComponent } from './add-yearly-roster.component';

describe('AddYearlyRosterComponent', () => {
  let component: AddYearlyRosterComponent;
  let fixture: ComponentFixture<AddYearlyRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYearlyRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddYearlyRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
