import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExitDetailComponent } from './manage-exit-detail.component';

describe('ManageExitDetailComponent', () => {
  let component: ManageExitDetailComponent;
  let fixture: ComponentFixture<ManageExitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExitDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
