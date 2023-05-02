import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeavePeriodComponent } from './manage-leave-period.component';

describe('ManageLeavePeriodComponent', () => {
  let component: ManageLeavePeriodComponent;
  let fixture: ComponentFixture<ManageLeavePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeavePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeavePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
