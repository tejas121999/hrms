import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailsInfoComponent } from './bank-details-info.component';

describe('BankDetailsInfoComponent', () => {
  let component: BankDetailsInfoComponent;
  let fixture: ComponentFixture<BankDetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDetailsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
