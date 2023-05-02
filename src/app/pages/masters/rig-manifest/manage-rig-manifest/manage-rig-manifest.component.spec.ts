import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRigManifestComponent } from './manage-rig-manifest.component';

describe('ManageRigManifestComponent', () => {
  let component: ManageRigManifestComponent;
  let fixture: ComponentFixture<ManageRigManifestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRigManifestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRigManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
