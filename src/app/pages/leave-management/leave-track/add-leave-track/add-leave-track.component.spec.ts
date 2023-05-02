import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveTrackComponent } from './add-leave-track.component';

describe('AddLeaveTrackComponent', () => {
  let component: AddLeaveTrackComponent;
  let fixture: ComponentFixture<AddLeaveTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
