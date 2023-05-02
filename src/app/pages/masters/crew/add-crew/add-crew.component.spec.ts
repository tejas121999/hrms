import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrewComponent } from './add-crew.component';

describe('AddCrewComponent', () => {
  let component: AddCrewComponent;
  let fixture: ComponentFixture<AddCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
