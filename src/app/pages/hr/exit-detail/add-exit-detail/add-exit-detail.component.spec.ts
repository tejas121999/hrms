import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExitDetailComponent } from './add-exit-detail.component';

describe('AddExitDetailComponent', () => {
  let component: AddExitDetailComponent;
  let fixture: ComponentFixture<AddExitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExitDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
