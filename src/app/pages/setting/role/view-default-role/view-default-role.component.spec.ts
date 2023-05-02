import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDefaultRoleComponent } from './view-default-role.component';

describe('ViewDefaultRoleComponent', () => {
  let component: ViewDefaultRoleComponent;
  let fixture: ComponentFixture<ViewDefaultRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDefaultRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDefaultRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
