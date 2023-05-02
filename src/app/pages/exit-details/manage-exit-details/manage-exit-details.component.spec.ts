import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExitDetailsComponent } from './manage-exit-details.component';

describe('ManageExitDetailsComponent', () => {
  let component: ManageExitDetailsComponent;
  let fixture: ComponentFixture<ManageExitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExitDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
