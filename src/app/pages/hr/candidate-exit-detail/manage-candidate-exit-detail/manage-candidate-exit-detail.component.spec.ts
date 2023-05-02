import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCandidateExitDetailComponent } from './manage-candidate-exit-detail.component';

describe('ManageCandidateExitDetailComponent', () => {
  let component: ManageCandidateExitDetailComponent;
  let fixture: ComponentFixture<ManageCandidateExitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCandidateExitDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCandidateExitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
