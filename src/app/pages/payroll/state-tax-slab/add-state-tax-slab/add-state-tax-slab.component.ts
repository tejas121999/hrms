import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-add-state-tax-slab',
  templateUrl: './add-state-tax-slab.component.html',
  styleUrls: ['./add-state-tax-slab.component.scss']
})
export class AddStateTaxSlabComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
  ) { }

  ngOnInit(): void {
  }

  stateTaxForm = new FormGroup({
    formName : new FormControl("stateTaxForm"),
    slab_from : new FormControl(''),
    slab_to : new FormControl(''),
    amount : new FormControl(''),
    Applicable_date: new FormControl(''),
    gender : new FormControl(''),
    month : new FormControl(''),
    special_amount: new FormControl(''),
    remark: new FormControl(''),
  })

  gender : any = [
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Both" },
  ];

  month : any = [
    { month: "JAN" },
    { month: "FEB" },
    { month: "MAR" },
    { month: "APR" },
    { month: "MAY" },
    { month: "JUN" },
    { month: "JULY" },
    { month: "AUG" },
    { month: "SEP" },
    { month: "OCT" },
    { month: "NOV" },
    { month: "DEC" },
  ];

  reset(){}

}
