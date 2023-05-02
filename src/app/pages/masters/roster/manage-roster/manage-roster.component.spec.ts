import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRosterComponent } from './manage-roster.component';

describe('ManageRosterComponent', () => {
  let component: ManageRosterComponent;
  let fixture: ComponentFixture<ManageRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
