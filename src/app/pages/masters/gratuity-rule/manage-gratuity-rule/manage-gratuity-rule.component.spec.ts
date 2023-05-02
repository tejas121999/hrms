import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGratuityRuleComponent } from './manage-gratuity-rule.component';

describe('ManageGratuityRuleComponent', () => {
  let component: ManageGratuityRuleComponent;
  let fixture: ComponentFixture<ManageGratuityRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGratuityRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGratuityRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
