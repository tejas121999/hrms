import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveEncashmentComponent } from './manage-leave-encashment.component';

describe('ManageLeaveEncashmentComponent', () => {
  let component: ManageLeaveEncashmentComponent;
  let fixture: ComponentFixture<ManageLeaveEncashmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLeaveEncashmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLeaveEncashmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
