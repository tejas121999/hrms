import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavePeriodComponent } from './add-leave-period.component';

describe('AddLeavePeriodComponent', () => {
  let component: AddLeavePeriodComponent;
  let fixture: ComponentFixture<AddLeavePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeavePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeavePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
