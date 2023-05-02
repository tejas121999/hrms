import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEncashApprovalComponent } from './add-encash-approval.component';

describe('AddEncashApprovalComponent', () => {
  let component: AddEncashApprovalComponent;
  let fixture: ComponentFixture<AddEncashApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEncashApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEncashApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
