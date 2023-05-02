import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
declare var UIkit: any;
@Component({
  selector: 'app-assign-leave',
  templateUrl: './assign-leave.component.html',
  styleUrls: ['./assign-leave.component.scss']
})
export class AssignLeaveComponent implements OnInit {

  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
    private ManageEmployee: ManageEmployeeComponent
  ) { }

  currentPage: any
  limit: number = 10
  offset: number = 0
  empId: any
  loader: boolean = false;
  leaveData: any[] = []
  leave_Data: any[] = []
  leaveEmpData: any[] = []
  count: any
  preferenceKeys = PreferenceKeys;
  userData: any;
  leave_id: boolean = false
  selected_leave: any[] = []
  leaveId: any[] = []
  deleteLeave: any[] = []


  ngOnInit(): void {
    this.getProfile()
    this.getEmpID()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  getLeave() {
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "company_id": this.userData?.data?.company_id,
      "limit": 100,
      "offset": 0
    }

    this.masterServices.getLeaves(temp).subscribe({
      next: (res: any) => {
        console.log("response", res.leaveType)
        this.count = res?.leave?.count
        this.leaveData = res?.leaveType.rows
        console.log("this.leaveData", this.leaveData)
        this.getLeaveOfEmployee()
      }, error: (e: any) => {
        this.handleError("Server error")
      }
    })
  }

  getLeaveOfEmployee() {
    var temp = {
      "leave_emp_id": this.empId,
      "isDeleted":false
    }
    console.log(temp)
    this.masterServices.getLeaveofEmployee(temp).subscribe({
      next: (res: any) => {
        this.leave_Data = res.leave
        this.leaveData.forEach((data: any, index: any) => {
          this.leave_Data.map((ele: any) => {
            if (data.id === ele.id) {
              var temp = {
                "id": data.id,
                "leave_desc": data.leave_desc,
                "leave_name": data.leave_name,
                "no_of_days": data.no_of_days,
                "checked": true,
                "leaveOfEmp_id": ele.leaveOfEmp_id,

              }
              this.leaveData[index] = temp
            }
          })
        })
      }, error: (e: any) => {
        this.handleError('Server Error')
      }
    })
  }

  getEmpID() {
    this.ManageEmployee.leaveData.subscribe({
      next: (data: any) => {
        this.empId = data
        this.getLeave()
      }
    })
  }

  payloade: any[] = []
  temp: any = {
    "leave_emp_id": "",
    "leave_id": ""
  }


  preparePayloade(data: any, event: any) {
    console.log(data?.leaveOfEmp_id)
    console.log('Data ', data.id)
    if (event.target.checked === false) {
      var deleteID: any = []
      deleteID.push(data?.leaveOfEmp_id)
      deleteID.forEach((data: any) => {
        var temp = {
          "id": data
        }
        this.deleteLeave.push(temp)
      })
    } else if (event.target.checked === true) {
      var addID: any = []
      addID.push(data)
      addID.forEach((data: any) => {
        this.temp = {
          "leave_emp_id": this.empId,
          "leave_id": data.id
        }
        this.payloade.push(this.temp)
      })

    }
  }

  assignLeave() {

    var temp = {
      "assignLeave": this.payloade,
      "deleteLeave": this.deleteLeave
    }



    this.masterServices.assignLeave(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Leave Assigned Successfully")
        this.getLeave()
        UIkit.modal("#assign-leave").hide();
        this.payloade = []
        this.deleteLeave = []
      }, error: (err: any) => {
        console.log(err.error.error)
        this.handleError("server error")
      }
    })
  }

  onPageChange(event: any) {
    this.currentPage = event > 0 ? event : 1
    this.offset = ((this.currentPage - 1) * this.limit);
    this.getLeave()
  }
}
