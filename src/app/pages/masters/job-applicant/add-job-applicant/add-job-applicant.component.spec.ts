import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobApplicantComponent } from './add-job-applicant.component';

describe('AddJobApplicantComponent', () => {
  let component: AddJobApplicantComponent;
  let fixture: ComponentFixture<AddJobApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
