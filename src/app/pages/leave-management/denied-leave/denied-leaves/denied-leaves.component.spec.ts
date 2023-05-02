import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedLeavesComponent } from './denied-leaves.component';

describe('DeniedLeavesComponent', () => {
  let component: DeniedLeavesComponent;
  let fixture: ComponentFixture<DeniedLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeniedLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeniedLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
