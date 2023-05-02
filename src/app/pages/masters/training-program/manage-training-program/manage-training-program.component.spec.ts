import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainingProgramComponent } from './manage-training-program.component';

describe('ManageTrainingProgramComponent', () => {
  let component: ManageTrainingProgramComponent;
  let fixture: ComponentFixture<ManageTrainingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTrainingProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrainingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
