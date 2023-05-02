import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewPassengerDataComponent } from './crew-passenger-data.component';

describe('CrewPassengerDataComponent', () => {
  let component: CrewPassengerDataComponent;
  let fixture: ComponentFixture<CrewPassengerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrewPassengerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewPassengerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
