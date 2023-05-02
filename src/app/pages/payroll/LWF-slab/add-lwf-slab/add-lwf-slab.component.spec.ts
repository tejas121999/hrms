import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLwfSlabComponent } from './add-lwf-slab.component';

describe('AddLwfSlabComponent', () => {
  let component: AddLwfSlabComponent;
  let fixture: ComponentFixture<AddLwfSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLwfSlabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLwfSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
