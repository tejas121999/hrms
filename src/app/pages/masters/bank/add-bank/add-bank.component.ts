import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {

  constructor(private formValidator: FormValidator) { }

  bankForm = new FormGroup({
    formName: new FormControl("bankForm"),
    bank_name: new FormControl('', [Validators.required]),
    account_no: new FormControl('', [Validators.required]),
    ifsc_code: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  addBank(){
    console.log(this.bankForm)
  }

  reset(){}

  getError(formGroup: FormGroup, controlName: any) {
    console.log(formGroup, controlName)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
