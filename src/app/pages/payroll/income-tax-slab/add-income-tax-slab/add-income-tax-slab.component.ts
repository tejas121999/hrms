import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-add-income-tax-slab',
  templateUrl: './add-income-tax-slab.component.html',
  styleUrls: ['./add-income-tax-slab.component.scss']
})
export class AddIncomeTaxSlabComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
  ) { }

  ngOnInit(): void {
  }

  gender : any = [
    { gender: "Male" },
    { gender: "Female" },
    { gender: "Other" },
  ];

  citizen : any = [
    {  citizen : "General" },
    {  citizen : "Sinior" },
  ];

  incomeTaxSlabForm = new FormGroup({
    formName : new FormControl("incomeTaxSlabForm"),
    gender : new FormControl(''),
    citizen : new FormControl(''),
    slab_from : new FormControl(''),
    slab_to : new FormControl(''),
    tax_rate : new FormControl(''),
    surcharge : new FormControl(''),
    education_class : new FormControl(''),
  })
  
  reset(){}

}
