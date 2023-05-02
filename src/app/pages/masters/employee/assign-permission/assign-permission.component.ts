import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
declare var UIkit: any;

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.scss']
})
export class AssignPermissionComponent implements OnInit {
  limit: number = 5
  offset: number = 0
  getRoleData: any[] = []
  preferenceKeys = PreferenceKeys;
  userData: any;
  permissionData: any[] = []
  roleId: any
  loader: boolean = false;
  buttonLoader: boolean = false;
  role_name: any
  emp_id: any
  first_name: any
  last_name: any

  constructor(
    private route: ActivatedRoute,
    private masterServices: MasterServices,
    private appPreference: AppPreference,
    private ManageEmployee: ManageEmployeeComponent
  ) { }

  orginizationForm = new FormGroup({
    formName: new FormControl("orginizationForm"),
    // employee
    employee: new FormControl(false),
    add_employee: new FormControl(false),
    edit_employee: new FormControl(false),
    delete_employee: new FormControl(false),
    export_employee: new FormControl(false),
    import_employee: new FormControl(false),
    // designation 
    designation: new FormControl(false),
    add_designation: new FormControl(false),
    edit_designation: new FormControl(false),
    delete_designation: new FormControl(false),
    export_designation: new FormControl(false),
    import_designation: new FormControl(false),
    // department
    department: new FormControl(false),
    add_department: new FormControl(false),
    edit_department: new FormControl(false),
    delete_department: new FormControl(false),
    import_department: new FormControl(false),
    export_department: new FormControl(false),

    // branch
    branch: new FormControl(false),
    add_branch: new FormControl(false),
    edit_branch: new FormControl(false),
    delete_branch: new FormControl(false)
  })

  leaveForm = new FormGroup({
    formName: new FormControl("leaveForm"),
    // i move this controler to leave setup 
    // // leave
    // leave_type: new FormControl(false),
    // add_leave_type: new FormControl(false),
    // edit_leave_type: new FormControl(false),
    // delete_leave_type: new FormControl(false),
    // export_leave_type: new FormControl(false),
    // import_leave_type: new FormControl(false),

    // i move this shift form control to attendence
    // // shift
    // shift_type: new FormControl(false),
    // add_shift_type: new FormControl(false),
    // edit_shift_type: new FormControl(false),
    // delete_shift_type: new FormControl(false),
    // export_shift_type: new FormControl(false),
    // import_shift_type: new FormControl(false),

    // holiday
    holiday: new FormControl(false),
    add_holiday: new FormControl(false),
    edit_holiday: new FormControl(false),
    delete_holiday: new FormControl(false),
    export_holiday: new FormControl(false),
    import_holiday: new FormControl(false),
  })

  payrollForm = new FormGroup({
    formName: new FormControl("payrollForm"),
    // shift this form control to the payrole setup
    // payroll
    salary_component: new FormControl(false),
    add_salary_component: new FormControl(false),
    edit_salary_component: new FormControl(false),
    delete_salary_component: new FormControl(false),
    export_salary_component: new FormControl(false),
    import_salary_component: new FormControl(false),

    // salary structure
    salary_structure: new FormControl(false),
    add_salary_structure: new FormControl(false),
    edit_salary_structure: new FormControl(false),
    delete_salary_structure: new FormControl(false),
    export_salary_structure: new FormControl(false),
    import_salary_structure: new FormControl(false),

    // loan
    loan: new FormControl(false),
    add_loan: new FormControl(false),
    edit_loan: new FormControl(false),
    delete_loan: new FormControl(false),
    export_loan: new FormControl(false),
    import_loan: new FormControl(false),
  })

  manifestForm = new FormGroup({
    formName: new FormControl("manifestForm"),
    // rig
    rig: new FormControl(false),
    add_rig: new FormControl(false),
    edit_rig: new FormControl(false),
    delete_rig: new FormControl(false),
    export_rig: new FormControl(false),
    import_rig: new FormControl(false),

    // passenger
    passenger: new FormControl(false),
    add_passenger: new FormControl(false),
    edit_passenger: new FormControl(false),
    delete_passenger: new FormControl(false),
    export_passenger: new FormControl(false),
    import_passenger: new FormControl(false),


    // booking
    booking: new FormControl(false),
    add_booking: new FormControl(false),
    edit_booking: new FormControl(false),
    delete_booking: new FormControl(false),
    export_booking: new FormControl(false),
    import_booking: new FormControl(false),

    // roster
    roster: new FormControl(false),
    add_roster: new FormControl(false),
    edit_roster: new FormControl(false),
    delete_roster: new FormControl(false),
    export_roster: new FormControl(false),
    import_roster: new FormControl(false),
  })

  attendenceForm = new FormGroup({
    formName: new FormControl("attendenceForm"),
    // attendence
    attendence: new FormControl(false),
    add_attendence: new FormControl(false),
    edit_attendence: new FormControl(false),
    delete_attendence: new FormControl(false),
    export_attendence: new FormControl(false),
    import_attendence: new FormControl(false),

    // uploade attendence
    uploade_attendence: new FormControl(false),
    add_uploade_attendence: new FormControl(false),
    edit_uploade_attendence: new FormControl(false),
    delete_uploade_attendence: new FormControl(false),
    export_uploade_attendence: new FormControl(false),
    import_uploade_attendence: new FormControl(false),


  })

  AttendenceSetupForm = new FormGroup({
    // attendance_notification
    attendance_notification: new FormControl(false),
    add_attendance_notification: new FormControl(false),
    edit_attendance_notification: new FormControl(false),
    delete_attendance_notification: new FormControl(false),
    import_attendance_notification: new FormControl(false),
    export_attendance_notification: new FormControl(false),

    // attendance_setting
    attendance_setting: new FormControl(false),

    // always_present_employee
    always_present_employee: new FormControl(false),
    add_always_present_employee: new FormControl(false),
    edit_always_present_employee: new FormControl(false),
    delete_always_present_employee: new FormControl(false),
    import_always_present_employee: new FormControl(false),
    export_always_present_employee: new FormControl(false),

    // late_coming_early_going
    late_coming_early_going: new FormControl(false),

    // overtime_notification
    overtime_notification: new FormControl(false),
    add_overtime_notification: new FormControl(false),
    edit_overtime_notification: new FormControl(false),
    delete_overtime_notification: new FormControl(false),

    // overtime_configuration
    overtime_configuration: new FormControl(false),

    // attendance_configuration
    attendance_configuration: new FormControl(false),

    // shift
    shift_type: new FormControl(false),
    add_shift_type: new FormControl(false),
    edit_shift_type: new FormControl(false),
    delete_shift_type: new FormControl(false),
    export_shift_type: new FormControl(false),
    import_shift_type: new FormControl(false),
  })

  LeaveSetupForm = new FormGroup({
    // leave
    leave_type: new FormControl(false),
    add_leave_type: new FormControl(false),
    edit_leave_type: new FormControl(false),
    delete_leave_type: new FormControl(false),
    export_leave_type: new FormControl(false),
    import_leave_type: new FormControl(false),

    // leave_type_configuration
    leave_type_configuration: new FormControl(false),

    //  Leave Type Configuration Approval
    view_approval_in_leave_configuration: new FormControl(false),
    add_approval_in_leave_configuration: new FormControl(false),
    edit_approval_in_leave_configuration: new FormControl(false),
    delete_approval_in_leave_configuration: new FormControl(false),

    // Leave Type Configuration Notification
    view_notification_in_leave_configuration: new FormControl(false),
    add_notification_in_leave_configuration: new FormControl(false),
    edit_notification_in_leave_configuration: new FormControl(false),
    delete_notification_in_leave_configuration: new FormControl(false),

    // leave_configuration
    leave_configuration: new FormControl(false),
  })

  leaveRequestForm = new FormGroup({
    formName: new FormControl("leaveRequestForm"),

    // leave_track
    leave_track: new FormControl(false),
    add_leave_track: new FormControl(false),
    edit_leave_track: new FormControl(false),
    delete_leave_track: new FormControl(false),

    // leaveRequestForm
    leave_request: new FormControl(false),
    add_leave_request: new FormControl(false),
    edit_leave_request: new FormControl(false),
    delete_leave_request: new FormControl(false),
    export_leave_request: new FormControl(false),
    import_leave_request: new FormControl(false),

    // approve_request
    approve_request: new FormControl(false),
    add_approve_request: new FormControl(false),
    edit_approve_request: new FormControl(false),
    delete_approve_request: new FormControl(false),
    export_approve_request: new FormControl(false),
    import_approve_request: new FormControl(false),

    // denied request
    denied_request: new FormControl(false),
    add_denied_request: new FormControl(false),
    edit_denied_request: new FormControl(false),
    delete_denied_request: new FormControl(false),
    export_denied_request: new FormControl(false),
    import_denied_request: new FormControl(false),

    // this form control shoft to leave setup form 
    // // leave_type_configuration
    // leave_type_configuration: new FormControl(false),

    // //  Leave Type Configuration Approval
    // view_approval_in_leave_configuration: new FormControl(false),
    // add_approval_in_leave_configuration: new FormControl(false),
    // edit_approval_in_leave_configuration: new FormControl(false),
    // delete_approval_in_leave_configuration: new FormControl(false),

    // // Leave Type Configuration Notification
    // view_notification_in_leave_configuration: new FormControl(false),
    // add_notification_in_leave_configuration: new FormControl(false),
    // edit_notification_in_leave_configuration: new FormControl(false),
    // delete_notification_in_leave_configuration: new FormControl(false),

    // // leave_configuration
    // leave_configuration: new FormControl(false),
  })

  payroleSetupForm = new FormGroup({
    // salary structure
    salary_component: new FormControl(false),
    add_salary_component: new FormControl(false),
    edit_salary_component: new FormControl(false),
    delete_salary_component: new FormControl(false),
    export_salary_component: new FormControl(false),
    import_salary_component: new FormControl(false),

  })

  ngOnInit(): void {
    this.getRollByID()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  updateRequest() {
    this.loader = true
    var payload: any = {
      "access": {
        ...this.orginizationForm.value,
        ...this.leaveForm.value,
        ...this.payrollForm.value,
        ...this.manifestForm.value,
        ...this.attendenceForm.value,
        ...this.leaveRequestForm.value,
        ...this.AttendenceSetupForm.value,
        ...this.LeaveSetupForm.value,
        ...this.payroleSetupForm.value
      }
    }
    payload.access.emp_id = this.emp_id
    console.log("======", payload.access)
    this.masterServices.updateAccess(payload).subscribe({
      next: (res: any) => {
        this.handleSuccess('Form Permission Update Successfully')
        this.loader = false
        UIkit.modal("#assign-permission").hide();
      }, error: (e: any) => {
        this.handleError('Server Error')
        this.loader = false
      }
    })
  }


  getRollByID() {
    this.loader = true
    this.ManageEmployee.permissionData.subscribe((data: any) => {
      console.log("============================", data.first_name)
      this.emp_id = data.id
      this.first_name = data.first_name
      this.last_name = data.last_name
      console.log("----", this.last_name)
      // this.last_name =  data.last_name
      var temp = {
        emp_id: data.id
      }
      console.log(temp)
      this.masterServices.getUserAccessById(temp).subscribe({
        next: (res: any) => {

          // this.orginizationForm.patchValue({
          //   // employee
          //   employee: res.getEmpAccess.employee,
          //   add_employee: res.getEmpAccess.add_employee,
          //   edit_employee: res.getEmpAccess.edit_employee,
          //   delete_employee: res.getEmpAccess.delete_employee,
          //   export_employee: res.getEmpAccess.export_employee,
          //   import_employee: res.getEmpAccess.import_employee,
          //   // designation 
          //   designation: res.getEmpAccess.designation,
          //   add_designation: res.getEmpAccess.add_designation,
          //   edit_designation: res.getEmpAccess.edit_designation,
          //   delete_designation: res.getEmpAccess.delete_designation,
          //   export_designation: res.getEmpAccess.export_designation,
          //   import_designation: res.getEmpAccess.import_designation,
          //   // department
          //   department: res.getEmpAccess.department,
          //   add_department: res.getEmpAccess.add_department,
          //   edit_department: res.getEmpAccess.edit_department,
          //   delete_department: res.getEmpAccess.delete_department,
          //   import_department: res.getEmpAccess.import_department,
          //   export_department: res.getEmpAccess.export_department,
          // })

          // this.leaveForm.patchValue({
          //   // shift
          //   shift_type: res.getEmpAccess.shift_type,
          //   add_shift_type: res.getEmpAccess.add_shift_type,
          //   edit_shift_type: res.getEmpAccess.edit_shift_type,
          //   delete_shift_type: res.getEmpAccess.delete_shift_type,
          //   export_shift_type: res.getEmpAccess.export_shift_type,
          //   import_shift_type: res.getEmpAccess.import_shift_type,

          //   // holiday
          //   holiday: res.getEmpAccess.holiday,
          //   add_holiday: res.getEmpAccess.add_holiday,
          //   edit_holiday: res.getEmpAccess.edit_holiday,
          //   delete_holiday: res.getEmpAccess.delete_holiday,
          //   export_holiday: res.getEmpAccess.export_holiday,
          //   import_holiday: res.getEmpAccess.import_holiday,
          // })

          // this.payrollForm.patchValue({
          //   salary_component: res.getEmpAccess.salary_component,
          //   add_salary_component: res.getEmpAccess.add_salary_component,
          //   edit_salary_component: res.getEmpAccess.edit_salary_component,
          //   delete_salary_component: res.getEmpAccess.delete_salary_component,
          //   export_salary_component: res.getEmpAccess.export_salary_component,
          //   import_salary_component: res.getEmpAccess.import_salary_component,

          //   // salary structure
          //   salary_structure: res.getEmpAccess.salary_structure,
          //   add_salary_structure: res.getEmpAccess.add_salary_structure,
          //   edit_salary_structure: res.getEmpAccess.edit_salary_structure,
          //   delete_salary_structure: res.getEmpAccess.delete_salary_structure,
          //   export_salary_structure: res.getEmpAccess.export_salary_structure,
          //   import_salary_structure: res.getEmpAccess.import_salary_structure,

          //   // loan
          //   loan: res.getEmpAccess.loan,
          //   add_loan: res.getEmpAccess.add_loan,
          //   edit_loan: res.getEmpAccess.edit_loan,
          //   delete_loan: res.getEmpAccess.delete_loan,
          //   export_loan: res.getEmpAccess.export_loan,
          //   import_loan: res.getEmpAccess.import_loan,
          // })

          // this.manifestForm.patchValue({
          //   rig: res.getEmpAccess.rig,
          //   add_rig: res.getEmpAccess.add_rig,
          //   edit_rig: res.getEmpAccess.edit_rig,
          //   delete_rig: res.getEmpAccess.delete_rig,
          //   export_rig: res.getEmpAccess.export_rig,
          //   import_rig: res.getEmpAccess.import_rig,

          //   // passenger
          //   passenger: res.getEmpAccess.passenger,
          //   add_passenger: res.getEmpAccess.add_passenger,
          //   edit_passenger: res.getEmpAccess.edit_passenger,
          //   delete_passenger: res.getEmpAccess.delete_passenger,
          //   export_passenger: res.getEmpAccess.export_passenger,
          //   import_passenger: res.getEmpAccess.import_passenger,


          //   // booking
          //   booking: res.getEmpAccess.booking,
          //   add_booking: res.getEmpAccess.add_booking,
          //   edit_booking: res.getEmpAccess.edit_booking,
          //   delete_booking: res.getEmpAccess.delete_booking,
          //   export_booking: res.getEmpAccess.export_booking,
          //   import_booking: res.getEmpAccess.import_booking,

          //   // roster
          //   roster: res.getEmpAccess.roster,
          //   add_roster: res.getEmpAccess.add_roster,
          //   edit_roster: res.getEmpAccess.edit_roster,
          //   delete_roster: res.getEmpAccess.delete_roster,
          //   export_roster: res.getEmpAccess.export_roster,
          //   import_roster: res.getEmpAccess.import_roster,
          // })

          // this.attendenceForm.patchValue({
          //   // attendence
          //   attendence: res.getEmpAccess.attendence,
          //   add_attendence: res.getEmpAccess.add_attendence,
          //   edit_attendence: res.getEmpAccess.edit_attendence,
          //   delete_attendence: res.getEmpAccess.delete_attendence,
          //   export_attendence: res.getEmpAccess.export_attendence,
          //   import_attendence: res.getEmpAccess.import_attendence,

          //   // uploade attendence
          //   uploade_attendence: res.getEmpAccess.uploade_attendence,
          //   add_uploade_attendence: res.getEmpAccess.add_uploade_attendence,
          //   edit_uploade_attendence: res.getEmpAccess.edit_uploade_attendence,
          //   delete_uploade_attendence: res.getEmpAccess.delete_uploade_attendence,
          //   export_uploade_attendence: res.getEmpAccess.export_uploade_attendence,
          //   import_uploade_attendence: res.getEmpAccess.import_uploade_attendence,

          //   // attendance_notification
          //   attendance_notification: res.getEmpAccess.attendance_notification,
          //   add_attendance_notification: res.getEmpAccess.add_attendance_notification,
          //   edit_attendance_notification: res.getEmpAccess.edit_attendance_notification,
          //   delete_attendance_notification: res.getEmpAccess.delete_attendance_notification,
          //   import_attendance_notification: res.getEmpAccess.import_attendance_notification,
          //   export_attendance_notification: res.getEmpAccess.export_attendance_notification,

          //   // attendance_setting
          //   attendance_setting: res.getEmpAccess.attendance_setting,

          //   // always_present_employee
          //   always_present_employee: res.getEmpAccess.always_present_employee,
          //   add_always_present_employee: res.getEmpAccess.add_always_present_employee,
          //   edit_always_present_employee: res.getEmpAccess.edit_always_present_employee,
          //   delete_always_present_employee: res.getEmpAccess.delete_always_present_employee,
          //   import_always_present_employee: res.getEmpAccess.import_always_present_employee,
          //   export_always_present_employee: res.getEmpAccess.export_always_present_employee,

          //   // late_coming_early_going
          //   late_coming_early_going: res.getEmpAccess.late_coming_early_going,

          //   // overtime_notification
          //   overtime_notification: res.getEmpAccess.overtime_notification,
          //   add_overtime_notification: res.getEmpAccess.add_overtime_notification,
          //   edit_overtime_notification: res.getEmpAccess.edit_overtime_notification,
          //   delete_overtime_notification: res.getEmpAccess.delete_overtime_notification,

          //   // overtime_configuration
          //   overtime_configuration: res.getEmpAccess.overtime_configuration,

          //   // attendance_configuration
          //   attendance_configuration: res.getEmpAccess.attendance_configuration,
          // })

          // this.leaveRequestForm.patchValue({
          //   // leave type
          //   leave_type: res.getEmpAccess.leave_type,
          //   add_leave_type: res.getEmpAccess.add_leave_type,
          //   edit_leave_type: res.getEmpAccess.edit_leave_type,
          //   delete_leave_type: res.getEmpAccess.delete_leave_type,
          //   export_leave_type: res.getEmpAccess.export_leave_type,
          //   import_leave_type: res.getEmpAccess.import_leave_type,

          //   // leave_track
          //   leave_track: res?.getEmpAccess?.leave_track,
          //   add_leave_track: res?.getEmpAccess?.add_leave_track,
          //   edit_leave_track: res?.getEmpAccess?.edit_leave_track,
          //   delete_leave_track: res?.getEmpAccess?.delete_leave_track,

          //   // leaveRequestForm
          //   leave_request: res.getEmpAccess.leave_request,
          //   add_leave_request: res.getEmpAccess.add_leave_request,
          //   edit_leave_request: res.getEmpAccess.edit_leave_request,
          //   delete_leave_request: res.getEmpAccess.delete_leave_request,
          //   export_leave_request: res.getEmpAccess.export_leave_request,
          //   import_leave_request: res.getEmpAccess.import_leave_request,

          //   // approve_request
          //   approve_request: res.getEmpAccess.approve_request,
          //   add_approve_request: res.getEmpAccess.add_approve_request,
          //   edit_approve_request: res.getEmpAccess.edit_approve_request,
          //   delete_approve_request: res.getEmpAccess.delete_approve_request,
          //   export_approve_request: res.getEmpAccess.export_approve_request,
          //   import_approve_request: res.getEmpAccess.import_approve_request,

          //   // denied request
          //   denied_request: res.getEmpAccess.denied_request,
          //   add_denied_request: res.getEmpAccess.add_denied_request,
          //   edit_denied_request: res.getEmpAccess.edit_denied_request,
          //   delete_denied_request: res.getEmpAccess.delete_denied_request,
          //   export_denied_request: res.getEmpAccess.export_denied_request,
          //   import_denied_request: res.getEmpAccess.import_denied_request,

          //   // leave_type_configuration
          //   leave_type_configuration: res.getEmpAccess.leave_type_configuration,

          //   //  Leave Type Configuration Approval
          //   view_approval_in_leave_configuration: res.getEmpAccess.view_approval_in_leave_configuration,
          //   add_approval_in_leave_configuration: res.getEmpAccess.add_approval_in_leave_configuration,
          //   edit_approval_in_leave_configuration: res.getEmpAccess.edit_approval_in_leave_configuration,
          //   delete_approval_in_leave_configuration: res.getEmpAccess.delete_approval_in_leave_configuration,

          //   // Leave Type Configuration Notification
          //   view_notification_in_leave_configuration: res.getEmpAccess.view_notification_in_leave_configuration,
          //   add_notification_in_leave_configuration: res.getEmpAccess.add_notification_in_leave_configuration,
          //   edit_notification_in_leave_configuration: res.getEmpAccess.edit_notification_in_leave_configuration,
          //   delete_notification_in_leave_configuration: res.getEmpAccess.delete_notification_in_leave_configuration,

          //   // leave_configuration
          //   leave_configuration: res.getEmpAccess.leave_configuration,
          // })

          this.orginizationForm.patchValue(res.getEmpAccess)
          this.leaveForm.patchValue(res.getEmpAccess)
          this.payrollForm.patchValue(res.getEmpAccess)
          this.manifestForm.patchValue(res.getEmpAccess)
          this.attendenceForm.patchValue(res.getEmpAccess)
          this.leaveRequestForm.patchValue(res.getEmpAccess)
          this.AttendenceSetupForm.patchValue(res.getEmpAccess)
          this.LeaveSetupForm.patchValue(res.getEmpAccess)
          this.payroleSetupForm.patchValue(res.getEmpAccess)

        }, error: (e: any) => {
          this.handleError('Server Error')
          this.loader = false
        }
      })
    })

  }
  unChecked: boolean = true
  checkedEvent(checked: any) {
    console.log("checked", checked.target.checked)
    if (!checked.target.checked) {
      this.orginizationForm.get('add_department')?.patchValue(false)
      this.orginizationForm.get('edit_department')?.patchValue(false)
      this.orginizationForm.get('delete_department')?.patchValue(false)
    }
  }
}
