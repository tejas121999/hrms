import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCrewComponent } from './manage-crew.component';

describe('ManageCrewComponent', () => {
  let component: ManageCrewComponent;
  let fixture: ComponentFixture<ManageCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
