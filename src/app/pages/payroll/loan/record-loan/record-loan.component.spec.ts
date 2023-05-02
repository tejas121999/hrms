import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLoanComponent } from './record-loan.component';

describe('RecordLoanComponent', () => {
  let component: RecordLoanComponent;
  let fixture: ComponentFixture<RecordLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
