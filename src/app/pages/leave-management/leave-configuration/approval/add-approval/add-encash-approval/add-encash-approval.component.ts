import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageApprovalComponent } from '../../manage-approval/manage-approval.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-encash-approval',
  templateUrl: './add-encash-approval.component.html',
  styleUrls: ['./add-encash-approval.component.scss']
})
export class AddEncashApprovalComponent implements OnInit {

  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentData: any[] = []
  managerName: any = []
  payloade: any[] = []
  department: any[] = []
  @Input('isEditEncashApproval') isEditEncashApproval: boolean = false;
  _id: any

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageEncashApprove: ManageApprovalComponent
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  encashApprovalForm = new FormGroup({
    formName: new FormControl("encashApprovalForm"),
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
      id: this.encashApprovalForm.get("department")?.value
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
        this.encashApprovalForm.get("require_approval")?.setValue(this.managerName)
      }, error: (e: any) => {
        console.log(e)
      }
    })
  }

  addEncashApproval() {
    var data1: any = []
    var data2: any
    data1 = this.encashApprovalForm.get("department")?.value
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

    this.masterService.addEncashApproval(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Encash Approval Added Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  setupEdit() {
    this.manageEncashApprove.editEncashApproval.subscribe({
      next: (data: any) => {
        this._id = data.id
        var dept: any = []
        dept.push(data.department_id)
        var manager: any = []
        manager.push(data.require_approval_of)
        this.encashApprovalForm.get('department')?.patchValue(dept)
        this.encashApprovalForm.get('require_approval')?.patchValue(manager)
      }
    })
  }

  updateEncashApproval() {
    var data1: any = []
    var data2: any
    data1 = this.encashApprovalForm.get("department")?.value
    data2 = this.encashApprovalForm.get("require_approval")?.value
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
    this.masterService.updateEncashApproval(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Encash Approval Updated Successfully")
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
    this.manageEncashApprove.getEncashApproval()
    this.encashApprovalForm.reset()
    UIkit.modal("#add-encash-approval").hide();
    window.location.reload()
  }

}
