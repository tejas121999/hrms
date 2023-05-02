import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveEncashmentComponent } from './add-leave-encashment.component';

describe('AddLeaveEncashmentComponent', () => {
  let component: AddLeaveEncashmentComponent;
  let fixture: ComponentFixture<AddLeaveEncashmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaveEncashmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeaveEncashmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
