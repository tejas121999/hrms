import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobApplicantComponent } from './manage-job-applicant.component';

describe('ManageJobApplicantComponent', () => {
  let component: ManageJobApplicantComponent;
  let fixture: ComponentFixture<ManageJobApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJobApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
