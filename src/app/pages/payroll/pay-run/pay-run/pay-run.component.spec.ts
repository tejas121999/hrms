import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRunComponent } from './pay-run.component';

describe('PayRunComponent', () => {
  let component: PayRunComponent;
  let fixture: ComponentFixture<PayRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
