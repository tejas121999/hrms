import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAlertComponent } from './manage-alert.component';

describe('ManageAlertComponent', () => {
  let component: ManageAlertComponent;
  let fixture: ComponentFixture<ManageAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
