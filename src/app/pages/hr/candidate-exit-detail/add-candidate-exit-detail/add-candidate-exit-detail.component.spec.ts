import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidateExitDetailComponent } from './add-candidate-exit-detail.component';

describe('AddCandidateExitDetailComponent', () => {
  let component: AddCandidateExitDetailComponent;
  let fixture: ComponentFixture<AddCandidateExitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCandidateExitDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCandidateExitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
