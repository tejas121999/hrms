import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoanTypeComponent } from './manage-loan-type.component';

describe('ManageLoanTypeComponent', () => {
  let component: ManageLoanTypeComponent;
  let fixture: ComponentFixture<ManageLoanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLoanTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
