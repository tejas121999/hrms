import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyGoingComponent } from './early-going.component';

describe('EarlyGoingComponent', () => {
  let component: EarlyGoingComponent;
  let fixture: ComponentFixture<EarlyGoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarlyGoingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarlyGoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
