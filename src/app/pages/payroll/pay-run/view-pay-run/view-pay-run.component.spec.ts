import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayRunComponent } from './view-pay-run.component';

describe('ViewPayRunComponent', () => {
  let component: ViewPayRunComponent;
  let fixture: ComponentFixture<ViewPayRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPayRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPayRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
