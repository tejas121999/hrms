import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLwfSlabComponent } from './manage-lwf-slab.component';

describe('ManageLwfSlabComponent', () => {
  let component: ManageLwfSlabComponent;
  let fixture: ComponentFixture<ManageLwfSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLwfSlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLwfSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
