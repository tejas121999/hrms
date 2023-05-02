import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegularizationComponent } from './manage-regularization.component';

describe('ManageRegularizationComponent', () => {
  let component: ManageRegularizationComponent;
  let fixture: ComponentFixture<ManageRegularizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRegularizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRegularizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
