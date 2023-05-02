import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  // @Output() ddata = new EventEmitter<string>();
  // childData(e) {
  //   this.generalForm = e.value;
  //   this.data.emit(this.generalForm);
  // }

  // generalForm = new FormGroup({
  //   formName: new FormControl("generalForm"),
  //   title: new FormControl(''),
  //   first_name: new FormControl(''),
  //   middle_name: new FormControl(''),
  //   last_name: new FormControl(''),
  //   emp_id: new FormControl(''),
  //   emp_type: new FormControl(''),
  //   company_id: new FormControl(''),
  //   working_location: new FormControl(''),
  //   work_emailId: new FormControl(''),
  //   date_of_joining: new FormControl(''),
  //   department_id: new FormControl(''),
  //   designation_id: new FormControl(''),
  //   branch_id: new FormControl('')
  // })

  constructor() { }

  ngOnInit(): void {
  }

}
