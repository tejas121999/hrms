import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-add-tax-deduction-item',
  templateUrl: './add-tax-deduction-item.component.html',
  styleUrls: ['./add-tax-deduction-item.component.scss']
})
export class AddTaxDeductionItemComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
  ) { }

  ngOnInit(): void {
  }

  taxDeductionItemForm  = new FormGroup({
    formName: new FormControl("taxDeductionItemForm"),
    perticular : new FormControl(''),
    Group_By: new FormControl(''),
    section : new FormControl(''),
    max_limit: new FormControl(''),
    view_name: new FormControl(''),
    include_grp: new FormControl(''),
    default_amount: new FormControl(''),
    additional_info: new FormControl(''),
    is_editable: new FormControl(''),
  })

  group: any = [
    { group: "80C,80CCC,80CCD,80CCD (2)" },
    { group: "80CCG" },
    { group: "80CCD(1)" },
    { group: "80CCD(1B)" },
    { group: "80CCD(2)" },
    { group: "80D" },
    { group: "80DD" },
    { group: "80DDB" },
    { group: "80E" },
    { group: "80TTA" },
    { group: "80U" },
    { group: "80EE" },
    { group: "Section 10" },
    { group: "Section 16" },
    { group: "Section 17" },
    { group: "Section 17 (2)" },
    { group: "Section 24" },
    { group: "Section 24 (B)" },
    { group: "Section 89" },
    { group: "Reimbursement" },
    { group: "80TTB" },
    { group: "80EEA" },
    { group: "80EEB" },
    { group: "80GGC" },
  ];

  name: any = [
    { name: "LTA" },
    { name: "HRA" },
    { name: "Medical Allowence" },
  ];

  additional_info: any = [
    { name: "Lender Details" },
  ];

  section: any = [
    { name: "80C" },
  ];

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  reset(){}

}
