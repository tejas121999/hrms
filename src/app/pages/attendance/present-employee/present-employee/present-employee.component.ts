import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import * as moment from "moment";
import { ManagePresentEmployeeComponent } from '../manage-present-employee/manage-present-employee.component';
import { FormValidator } from 'src/app/shared/managers/form-validators';
declare var UIkit: any;
@Component({
  selector: 'app-present-employee',
  templateUrl: './present-employee.component.html',
  styleUrls: ['./present-employee.component.scss']
})
export class PresentEmployeeComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  user_data: any[] = []
  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private managePresent: ManagePresentEmployeeComponent
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  alwaysPresentEmpForm = new FormGroup({
    formName: new FormControl("alwaysPresentEmpForm"),
    employee_id: new FormControl("", [Validators.required]),
    minimum_start_time: new FormControl("", [Validators.required]),
    maximum_start_time: new FormControl("", [Validators.required]),
    minimum_end_time: new FormControl("", [Validators.required]),
    maximum_end_time: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  })


  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getEmployee()
  }


  getEmployee() {
    var temp = {
      "isDeleted": false,
      "limit": 10000,
      "offset": 0,
      "user_owner_id": this.userData?.data?.owner_id,
      "isExitDetail": false
    }
    this.masterService.getEmployee(temp).subscribe({
      next: (res: any) => {
        this.user_data = res.employee.rows
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }
      }
    })
  }

  addAlwaysPresentEmp() {
    if (this.alwaysPresentEmpForm.invalid) {
      console.log("invalid", this.alwaysPresentEmpForm.invalid)
      this.alwaysPresentEmpForm.markAllAsTouched()
    } else {
      var minimum_start_time: any = moment(this.alwaysPresentEmpForm.get('minimum_start_time')?.value)
      var maximum_start_time: any = moment(this.alwaysPresentEmpForm.get('maximum_start_time')?.value)
      var minimum_end_time: any = moment(this.alwaysPresentEmpForm.get('minimum_end_time')?.value)
      var maximum_end_time: any = moment(this.alwaysPresentEmpForm.get('maximum_end_time')?.value)
      var temp = {
        "data": {
          owner_id: this.userData?.data?.owner_id,
          employee_id: this.alwaysPresentEmpForm.get('employee_id')?.value,
          minimum_start_time: minimum_start_time,
          maximum_start_time: maximum_start_time,
          minimum_end_time: minimum_end_time,
          maximum_end_time: maximum_end_time,
          description: this.alwaysPresentEmpForm.get('description')?.value,
        }
      }
      this.masterService.addAlwaysPresentEmp(temp).subscribe({
        next: (res: any) => {
          this.handleSuccess("Add always Present employee added successfully")
          // this.getAlwayspresent()
          this.reset()
        },
        error: (err: any) => {
          if (err.message) {
            this.handleError('Server Error')
          }
        }
      })
    }

  }
  _id: any
  presentEmpData: any
  // getAlwayspresent() {
  //   var temp = {
  //     "owner_id": this.userData?.data?.owner_id
  //   }

  //   this.masterService.getAlwaysPresent(temp).subscribe({
  //     next: (res: any) => {
  //       this.presentEmpData = res.data.rows[0]
  //       this._id = res.data.rows[0].id
  //       this.alwaysPresentEmpForm.patchValue(res.data.rows[0])
  //     },
  //     error: (err: any) => {
  //       if (err.message) {
  //         this.handleError('Server Error')
  //       }
  //     }
  //   })
  // }

  setupEdit() {
    this.managePresent.editData.subscribe({
      next: (res: any) => {
        this._id = res.id
        this.isEdit = true
        this.alwaysPresentEmpForm.patchValue({
          employee_id: res.employee_id,
          minimum_start_time: res.minimum_start_time,
          maximum_start_time: res.maximum_start_time,
          minimum_end_time: res.minimum_end_time,
          maximum_end_time: res.maximum_end_time,
          description: res.description,
        })
      }
    })
  }

  editAlwaysPresentEmp() {
    var minimum_start_time: any = moment(this.alwaysPresentEmpForm.get('minimum_start_time')?.value)
    var maximum_start_time: any = moment(this.alwaysPresentEmpForm.get('maximum_start_time')?.value)
    var minimum_end_time: any = moment(this.alwaysPresentEmpForm.get('minimum_end_time')?.value)
    var maximum_end_time: any = moment(this.alwaysPresentEmpForm.get('maximum_end_time')?.value)
    var temp = {
      "_id": this._id,
      "data": {
        employee_id: this.alwaysPresentEmpForm.get('employee_id')?.value,
        minimum_start_time: minimum_start_time,
        maximum_start_time: maximum_start_time,
        minimum_end_time: minimum_end_time,
        maximum_end_time: maximum_end_time,
        description: this.alwaysPresentEmpForm.get('description')?.value,
      }
    }
    this.masterService.editAlwaysPresentEmp(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Record Updated Successfully")
        this.reset()
        // this.getAlwayspresent()
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }
      }
    })
  }

  reset() {
    window.location.reload()
    this.isEdit = false;
    this.alwaysPresentEmpForm.reset()
    this.managePresent.getAlwaysPresentEmp()
    UIkit.modal("#add-present-emp").hide();
  }

}
