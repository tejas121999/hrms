import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  // personalForm = new FormGroup({
  //   formName: new FormControl("personalForm"),
  //   languages: new FormControl(''),
  //   date_of_birth: new FormControl(''),
  //   nationality: new FormControl(''),
  //   marital_status: new FormControl(''),
  //   gender: new FormGroup(''),
  //   work_email: new FormGroup(''),
  //   blood_group: new FormGroup(''),
  //   mobile_no: new FormGroup(''),
  //   highest_qualification: new FormGroup(''),
  //   work_experience: new FormGroup(''),
  //   country: new FormGroup(''),
  //   state: new FormGroup(''),
  //   district: new FormGroup(''),
  //   city: new FormGroup(''),
  //   zipcode: new FormGroup(''),
  //   temp_country: new FormGroup(''),
  //   temp_city: new FormGroup(''),
  //   temp_destrict: new FormGroup(''),
  //   temp_zip: new FormGroup(''),
  //   temp_state: new FormGroup(''),
  //   permanent_address: new FormGroup(''),
  //   temporary_address: new FormGroup(''),
  // })

  constructor() { }

  ngOnInit(): void {
  }


}
