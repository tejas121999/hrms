import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManifestPassengerComponent } from './add-manifest-passenger.component';

describe('AddManifestPassengerComponent', () => {
  let component: AddManifestPassengerComponent;
  let fixture: ComponentFixture<AddManifestPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManifestPassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManifestPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
