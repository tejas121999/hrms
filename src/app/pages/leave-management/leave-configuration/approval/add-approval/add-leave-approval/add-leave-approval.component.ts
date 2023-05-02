import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageApprovalComponent } from '../../manage-approval/manage-approval.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-leave-approval',
  templateUrl: './add-leave-approval.component.html',
  styleUrls: ['./add-leave-approval.component.scss']
})
export class AddLeaveApprovalComponent implements OnInit {

  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentData: any[] = []
  managerName: any = []
  payloade: any[] = []
  department: any[] = []
  @Input('isEditLeaveApproval') isEditLeaveApproval: boolean = false;
  _id: any

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageLeaveApprove: ManageApprovalComponent
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  leaveApprovalForm = new FormGroup({
    formName: new FormControl("leaveApprovalForm"),
    department: new FormControl(''),
    require_approval: new FormControl('')
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
      id: this.leaveApprovalForm.get("department")?.value
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
        this.leaveApprovalForm.get("require_approval")?.setValue(this.managerName)
      }, error: (e: any) => {
        console.log(e)
      }
    })
  }

  // removeManager(event: any){
  //   console.log("event",event)
  //   let exestingManager = this.leaveApprovalForm.get('require_approval')?.value
  //   let newManager : any= ""
  //   // newManager= exestingManager?.replace()
  // }

  addLeaveApproval() {
    var data1: any = []
    var data2: any
    data1 = this.leaveApprovalForm.get("department")?.value
    data2 = this.managerName
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data,
        "require_approval_of": data?.require_approval_of
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "owner_id": this.userData?.data?.owner_id, "department_id": data.department_id, "require_approval_of": element.manager_name })
      })
    })
    var temp = {
      "data": this.payloade
    }

    this.masterService.addLeaveApproval(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Approval Added Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  setupEdit() {
    this.manageLeaveApprove.editLeaveApprovel.subscribe({
      next: (data: any) => {
        this._id = data.id
        var dept: any = []
        dept.push(data.department_id)
        var manager: any = []
        manager.push(data.require_approval_of)
        this.leaveApprovalForm.get('department')?.patchValue(dept)
        this.leaveApprovalForm.get('require_approval')?.patchValue(manager)
      }
    })
  }

  updateLeaveApproval() {
    var data1: any = []
    var data2: any
    data1 = this.leaveApprovalForm.get("department")?.value
    data2 = this.leaveApprovalForm.get("require_approval")?.value
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
        this.payloade.push({ "department_id": data.department_id, "require_approval_of": element.manager_name })
      })
    })
    var temp = {
      "id": this._id,
      "data": this.payloade[0]
    }
    console.log("temp==", temp)
    this.masterService.updateLeaveApproval(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Approval Updated Successfully")
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
    this.manageLeaveApprove.getLeaveApproval()
    this.leaveApprovalForm.reset()
    UIkit.modal("#add-leave-approval").hide();
    window.location.reload()
  }

}
