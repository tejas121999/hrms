import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePresentEmployeeComponent } from './manage-present-employee.component';

describe('ManagePresentEmployeeComponent', () => {
  let component: ManagePresentEmployeeComponent;
  let fixture: ComponentFixture<ManagePresentEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePresentEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePresentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
