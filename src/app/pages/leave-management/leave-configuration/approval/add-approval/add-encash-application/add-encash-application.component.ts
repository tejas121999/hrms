import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageApprovalComponent } from '../../manage-approval/manage-approval.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-encash-application',
  templateUrl: './add-encash-application.component.html',
  styleUrls: ['./add-encash-application.component.scss']
})
export class AddEncashApplicationComponent implements OnInit {

  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentData: any[] = []
  managerName: any = []
  payloade: any[] = []
  department: any[] = []
  _id: any
  @Input('isEditEncashApp') isEditEncashApp: boolean = false;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageEncashApplication: ManageApprovalComponent
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  encashApplicationForm = new FormGroup({
    formName: new FormControl("encashApplicationForm"),
    department: new FormControl(''),
    require_application: new FormControl('')
  })

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getDepartment()
  }

  getDepartment() {
    var temp = {
      "where": false,
      "limit": 1000000,
      "offset": 0,
      "department_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getDepartment(temp).subscribe({
      next: (res: any) => {
        this.departmentData = res.department.rows
        // console.log("jjjjjjjj", res)
      },
      error: (err: any) => {
        this.handleError('Serve Error')
      }
    })
  }

  getManagerName() {
    var temp = {
      id: this.encashApplicationForm.get("department")?.value
    }
    this.masterService.getDepartmentById(temp).subscribe({
      next: (res: any) => {
        console.log(res.department)
        res?.department.forEach((element: any) => {
          var temp = {
            "manager_name": element?.first_name
          }
          this.managerName.push(temp)
        });
        console.log("this.managerName", this.managerName)
        this.encashApplicationForm.get("require_application")?.setValue(this.managerName)
      }, error: (e: any) => {
        console.log(e)
      }
    })
  }

  addEncashApplication(){
    var data1: any = []
    var data2: any
    data1 = this.encashApplicationForm.get("department")?.value
    data2 = this.managerName
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data,
        "require_application_of": data?.require_application_of
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "owner_id": this.userData?.data?.owner_id, "department_id": data.department_id, "require_application_of": element.manager_name })
      })
    })
    var temp = {
      "data": this.payloade
    }

    this.masterService.addEncashApplication(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Encash Application Added Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  setupEdit() {
    this.manageEncashApplication.editEncashApplication.subscribe({
      next: (data: any) => {
        this._id = data.id
        var dept: any = []
        dept.push(data.department_id)
        var manager: any = []
        manager.push(data.require_application_of)
        this.encashApplicationForm.get('department')?.patchValue(dept)
        this.encashApplicationForm.get('require_application')?.patchValue(manager)
      }
    })
  }

  updateEncashApplication() {
    var data1: any = []
    var data2: any
    data1 = this.encashApplicationForm.get("department")?.value
    data2 = this.encashApplicationForm.get("require_application")?.value
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data,
      }
      console.log("ID", temp)
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        console.log(element.manager_name)
        this.payloade.push({ "department_id": data.department_id, "require_application_of": element.manager_name })
      })
    })
    var temp = {
      "id": this._id,
      "data": this.payloade[0]
    }
    console.log("temp==", temp)
    this.masterService.updateEncashApplication(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Encash Application Updated Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  reset() {
    this.manageEncashApplication.getEncashApplication()
    this.encashApplicationForm.reset()
    UIkit.modal("#add-encash-application").hide();
    window.location.reload()
  }

}
