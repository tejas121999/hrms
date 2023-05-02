import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRigManifestComponent } from './add-rig-manifest.component';

describe('AddRigManifestComponent', () => {
  let component: AddRigManifestComponent;
  let fixture: ComponentFixture<AddRigManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRigManifestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRigManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
