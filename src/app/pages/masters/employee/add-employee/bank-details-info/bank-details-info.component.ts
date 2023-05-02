import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-bank-details-info',
  templateUrl: './bank-details-info.component.html',
  styleUrls: ['./bank-details-info.component.scss']
})
export class BankDetailsInfoComponent implements OnInit {
  @Input() bankData: string | undefined
  constructor(
    private formValidator: FormValidator,
  ) { }

  // bankDetailsInfoForm = new FormGroup({
  //   formName: new FormControl('bankDetailsInfoForm'),
  //   bank_name: new FormControl(''),
  //   IFSC_code: new FormControl(''),
  //   account_no: new FormControl(''),
  //   branch: new FormControl('')
  // })

  ngOnInit(): void {
  }

}
