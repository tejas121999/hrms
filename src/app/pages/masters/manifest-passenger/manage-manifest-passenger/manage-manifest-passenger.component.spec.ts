import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManifestPassengerComponent } from './manage-manifest-passenger.component';

describe('ManageManifestPassengerComponent', () => {
  let component: ManageManifestPassengerComponent;
  let fixture: ComponentFixture<ManageManifestPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageManifestPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageManifestPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
