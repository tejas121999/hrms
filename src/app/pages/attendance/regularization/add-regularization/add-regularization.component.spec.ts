import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegularizationComponent } from './add-regularization.component';

describe('AddRegularizationComponent', () => {
  let component: AddRegularizationComponent;
  let fixture: ComponentFixture<AddRegularizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegularizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegularizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
