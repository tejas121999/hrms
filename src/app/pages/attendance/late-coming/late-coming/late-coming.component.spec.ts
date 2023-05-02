import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateComingComponent } from './late-coming.component';

describe('LateComingComponent', () => {
  let component: LateComingComponent;
  let fixture: ComponentFixture<LateComingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateComingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateComingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
