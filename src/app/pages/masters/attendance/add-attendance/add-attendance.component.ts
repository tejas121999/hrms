import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {

  constructor(private formValidator: FormValidator) { }

  attendanceForm = new FormGroup({
    formName: new FormControl("attendanceForm"),
    employee_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    attendance_date: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    shift: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  addAttendance(){
    console.log(this.attendanceForm)
  }

  reset(){
    
  }

  getError(formGroup: FormGroup, controlName: any) {
    console.log(formGroup, controlName)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
