import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveTrackComponent } from './manage-leave-track.component';

describe('ManageLeaveTrackComponent', () => {
  let component: ManageLeaveTrackComponent;
  let fixture: ComponentFixture<ManageLeaveTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeaveTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaveTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
