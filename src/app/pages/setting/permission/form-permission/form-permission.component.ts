import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-form-permission',
  templateUrl: './form-permission.component.html',
  styleUrls: ['./form-permission.component.scss']
})
export class FormPermissionComponent implements OnInit {
  limit: number = 10
  offset: number = 0
  getRoleData: any[] = []
  preferenceKeys = PreferenceKeys;
  userData: any;
  permissionData: any[] = []
  currentModule: any = "Organization"
  roleId: any
  loader: boolean = false;
  buttonLoader: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private masterServices: MasterServices,
    private appPreference: AppPreference,
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

  setttingForm = new FormGroup({
    role: new FormControl(false)
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

  generalForm = new FormGroup({
    // company
    company: new FormControl(false),
    addCompany: new FormControl(false),
    updateCompany: new FormControl(false),
    deleteCompanny: new FormControl(false),
    exportCompany: new FormControl(false),
    importCompany: new FormControl(false),

    // letter head
    letter_head: new FormControl(false),
    add_letter_head: new FormControl(false),

    // template
    template: new FormControl(false),
    getTemplate: new FormControl(false),
  })

  ngOnInit(): void {
    this.getProfile()
  }

  onPageChange(event: any) {
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
    this.getRole()
    this.getRollByID()
  }

  moduleName = [
    { module: "Organization", name: "Organization" },
    { module: "Leave", name: "Leave" },
    { module: "Payroll", name: "Payroll" },
    { module: "Manifest", name: "Manifest" },
    { module: "Attendence", name: "Attendance" },
    // { module: "general", name: "general" },
    { module: "Attendance_Setup", name: "Attendance Setup" },
    { module: "Leave_Setup", name: "Leave Setup" },
    { module: "Payroll_Setup", name: "Payroll Setup" },
    { module: "user_access_control", name: "User Access Control" },
    { module: "general", name: "GeneralForm" },
  ]

  getCurrentModule(event: any) {
    this.currentModule = event.module
  }

  getRole() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "role_owner_id": this.userData?.data?.owner_id
    }
    this.masterServices.getRole(temp).subscribe({
      next: (res: any) => {
        this.getRoleData = res.role.rows
        this.loader = false
      }, error: (err: any) => {
        this.loader = false
        this.handleError(err)
      }
    })
  }

  // payload: any[] = []
  updateRequest() {
    this.loader = true
    var payload: any = {
      "role_id": this.roleId,
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
    console.log(payload)
    this.masterServices.editAccess(payload).subscribe({
      next: (res: any) => {
        this.handleSuccess('Form permissions are updated successfully')
        this.loader = false
      }, error: (e: any) => {
        this.handleError('Server Error')
        this.loader = false
      }
    })
  }
  role_name: any
  getRollByID() {
    this.loader = true
    this.route.queryParams.subscribe((data: any) => {
      this.roleId = data.value
      var temp = {
        "role_id": data.value
      }
      this.masterServices.getAccessByroleId(temp).subscribe({
        next: (res: any) => {
          this.role_name = res.data.role_data.roll_name
          this.loader = false
          console.log(res.data)
          this.orginizationForm.patchValue(res.data)
          this.leaveForm.patchValue(res.data)
          this.payrollForm.patchValue(res.data)
          this.manifestForm.patchValue(res.data)
          this.attendenceForm.patchValue(res.data)
          this.leaveRequestForm.patchValue(res.data)
          this.AttendenceSetupForm.patchValue(res.data)
          this.LeaveSetupForm.patchValue(res.data)
          this.payroleSetupForm.patchValue(res.data)
        }, error: (err: any) => {
          this.handleError(err)
          this.loader = false
        }
      })
    })
  }
}
