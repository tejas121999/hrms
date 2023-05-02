import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';

@Component({
  selector: 'app-add-regularization',
  templateUrl: './add-regularization.component.html',
  styleUrls: ['./add-regularization.component.scss']
})
export class AddRegularizationComponent implements OnInit {
  userData:any;
  empData:any
  managename:any
  shiftname:any
  managenameid:any;
  departmentdata:any=[]
  constructor(
    private masterService: MasterServices,
    private formValidator: FormValidator,
    private appPreference: AppPreference,
  ) { }
  
  ngOnInit(): void {
    this.getProfile()
    this.getDepartmentid();
    this.shiftname = this.empData.data?.shift_data?.shift_name
    console.log( this.shiftname);
  }

  regularizeForm = new FormGroup({
    formName: new FormControl("regularizeForm"),
    date: new FormControl(''),
    shift_type: new FormControl(''),
    checkin_time: new FormControl(''),
    checkout_time: new FormControl(''),
    reason: new FormControl(''),
    manager_id: new FormControl('')
  })

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.empData = {
      data: this.appPreference.getObject(PreferenceKeys.EMPLOYEE_DATA)
    }
  }

  getDepartmentid() {
    let temp = {
      id: this.userData.data.department_id,
    };
    this.masterService.getDepartmentid(temp).subscribe({
      next: (res) => {
        this.departmentdata = res;
        this.departmentdata.department.forEach((element: any) => {
          this.managename = element.manager_data.first_name +' '+  element.manager_data.last_name;
          this.managenameid = element.manager_id;

          // console.log(res);
        });
        // this.leaveTrackForm.get('manage_name')?.setValue(this.managename)
      },
      error: (e: any) => {
        this.handleError(e);
      },
    });
  }

  addRegularization(){
    var temp = {
      
    }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  reset(){}

}
