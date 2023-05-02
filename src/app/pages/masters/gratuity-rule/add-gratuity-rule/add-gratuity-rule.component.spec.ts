import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGratuityRuleComponent } from './add-gratuity-rule.component';

describe('AddGratuityRuleComponent', () => {
  let component: AddGratuityRuleComponent;
  let fixture: ComponentFixture<AddGratuityRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGratuityRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGratuityRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
