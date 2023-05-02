import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeConfigurationComponent } from './overtime-configuration.component';

describe('OvertimeConfigurationComponent', () => {
  let component: OvertimeConfigurationComponent;
  let fixture: ComponentFixture<OvertimeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
