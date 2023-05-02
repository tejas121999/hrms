import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nominee-info',
  templateUrl: './nominee-info.component.html',
  styleUrls: ['./nominee-info.component.scss']
})
export class NomineeInfoComponent implements OnInit {

  // nomineeForm = new FormGroup({
  //   formName: new FormControl("nomineeForm"),
  //   nominee_address: new FormControl(''),
  //   nominee_mobile_no: new FormControl(''),
  //   nominee_email: new FormControl(''),
  //   relation_with_employee: new FormControl(''),
  //   nominee_name: new FormControl(''),
  // })

  constructor() { }

  ngOnInit(): void {
  }

}
