import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';
declare var UIkit: any;

@Component({
  selector: 'app-add-tax-deduction-group',
  templateUrl: './add-tax-deduction-group.component.html',
  styleUrls: ['./add-tax-deduction-group.component.scss']
})
export class AddTaxDeductionGroupComponent implements OnInit {

  @Input('isEdit') isEdit: boolean = false;

  constructor(
    private formValidator: FormValidator,
  ) { }

  ngOnInit(): void {
  }

  taxDeductionForm  = new FormGroup({
    formName: new FormControl("taxDeductionForm"),
    Select_tax: new FormControl(''),
    section: new FormControl(''),
    Group_max_limit: new FormControl(''),
    default_amount: new FormControl(''),
    is_editable: new FormControl('')
  })
  
  group: any = [
    { group: "Deduction Under Chapter Vi A" },
    { group: "Other Deduction Under Chapter Vi A" },
    { group: "Deduction Under Section 10" },
    { group: "Deduction Unser Section 16" },
    { group: "Deduction Under Section 17 (2)" },
    { group: "Deduction Under Section 24" },
    { group: "Deduction Under Section 24 (B)" },
    { group: "Deduction Under Section 89" },
    { group: "Reimbursement Exemption" },
  ];

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  reset() {
    
  }
}
