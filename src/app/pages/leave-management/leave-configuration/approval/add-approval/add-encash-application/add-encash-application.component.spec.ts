import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEncashApplicationComponent } from './add-encash-application.component';

describe('AddEncashApplicationComponent', () => {
  let component: AddEncashApplicationComponent;
  let fixture: ComponentFixture<AddEncashApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEncashApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEncashApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
