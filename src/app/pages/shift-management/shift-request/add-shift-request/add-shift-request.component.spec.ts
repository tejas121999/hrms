import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftRequestComponent } from './add-shift-request.component';

describe('AddShiftRequestComponent', () => {
  let component: AddShiftRequestComponent;
  let fixture: ComponentFixture<AddShiftRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShiftRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShiftRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
