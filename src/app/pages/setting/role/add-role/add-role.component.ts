import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageRoleComponent } from '../manage-role/manage-role.component';
import { FormPermissionComponent } from '../../permission/form-permission/form-permission.component';

declare var UIkit: any;

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  limit: number = 5
  offset: number = 0
  getRoleData: any[] = []
  preferenceKeys = PreferenceKeys;
  @Input('isEdit') isEdit: boolean = false;
  _id: any
  userData: any;
  loader: boolean = false;
  buttonLoader: boolean = false;
  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageRole: ManageRoleComponent,
    // private formPermission: FormPermissionComponent
  ) { }

  roleMasterForm = new FormGroup({
    formName: new FormControl("roleMasterForm"),
    roll_name: new FormControl('', [Validators.required]),
    colne_roll: new FormControl(''),
    type_roll: new FormControl(''),
    defaultAccess: new FormControl('')
  })


  ngOnInit(): void {
    this.getProfile()
    this.getRole()
    this.setupEdit()
  }


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
  }

  getRole() {
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "role_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getRole(temp).subscribe({
      next: (res: any) => {
        this.getRoleData = res.role.rows
      }, error: (err: any) => {
        this.handleError(err)
      }
    })
  }
  access: any = {}

  getClone() {
    console.log(this.access.length)
    var temp = {
      "role_id": this.roleMasterForm.get('colne_roll')?.value
    }
    this.masterService.clone(temp).subscribe({
      next: (res: any) => {
        this.access = res.clone
        console.log("this.access", this.access)
      }, error: (err: any) => {
        this.handleError(err)
      }
    })
  }
  default_Access = new Subject<any>()
  default_access: any
  defaultAccess() {
    var orginizationForm: any = {
      employee: true,
      add_employee: false,
      edit_employee: false,
      delete_employee: false,
      export_employee: false,
      import_employee: false,
      // designation
      designation: true,
      add_designation: false,
      edit_designation: false,
      delete_designation: false,
      export_designation: false,
      import_designation: false,
      // department
      department: true,
      add_department: false,
      edit_department: false,
      delete_department: false,
      import_department: false,
      export_department: false,
      formName: null
    }
    var leaveForm: any = {
      leave_type: true,
      add_leave_type: false,
      edit_leave_type: false,
      delete_leave_type: false,
      export_leave_type: false,
      import_leave_type: false,
      // shift
      shift_type: true,
      add_shift_type: false,
      edit_shift_type: false,
      delete_shift_type: false,
      export_shift_type: false,
      import_shift_type: false,

      // holiday
      holiday: true,
      add_holiday: false,
      edit_holiday: false,
      delete_holiday: false,
      export_holiday: false,
      import_holiday: false,
      formName: null
    }
    var payrollForm: any = {
      salary_component: true,
      add_salary_component: false,
      edit_salary_component: false,
      delete_salary_component: false,
      export_salary_component: false,
      import_salary_component: false,

      // salary structure
      salary_structure: true,
      add_salary_structure: false,
      edit_salary_structure: false,
      delete_salary_structure: false,
      export_salary_structure: false,
      import_salary_structure: false,

      // loan
      loan: true,
      add_loan: false,
      edit_loan: false,
      delete_loan: false,
      export_loan: false,
      import_loan: false,
      formName: null
    }

    var manifestForm: any = {
      rig: true,
      add_rig: false,
      edit_rig: false,
      delete_rig: false,
      export_rig: false,
      import_rig: false,

      // passenger
      passenger: true,
      add_passenger: false,
      edit_passenger: false,
      delete_passenger: false,
      export_passenger: false,
      import_passenger: false,


      // booking
      booking: true,
      add_booking: false,
      edit_booking: false,
      delete_booking: false,
      export_booking: false,
      import_booking: false,

      // roster
      roster: true,
      add_roster: false,
      edit_roster: false,
      delete_roster: false,
      export_roster: false,
      import_roster: false,
      formName: null
    }

    var attendenceForm: any = {
      attendence: true,
      add_attendence: false,
      edit_attendence: false,
      delete_attendence: false,
      export_attendence: false,
      import_attendence: false,

      // uploade attendence
      uploade_attendence: true,
      add_uploade_attendence: false,
      edit_uploade_attendence: false,
      delete_uploade_attendence: false,
      export_uploade_attendence: false,
      import_uploade_attendence: false,

      // attendance_notification
      attendance_notification: true,
      add_attendance_notification: false,
      edit_attendance_notification: false,
      delete_attendance_notification: false,
      import_attendance_notification: false,
      export_attendance_notification: false,

      // attendance_setting
      attendance_setting: true,

      // always_present_employee
      always_present_employee: true,
      add_always_present_employee: false,
      edit_always_present_employee: false,
      delete_always_present_employee: false,
      import_always_present_employee: false,
      export_always_present_employee: false,

      // late_coming_early_going
      late_coming_early_going: true,

      // overtime_notification
      overtime_notification: true,
      add_overtime_notification: false,
      edit_overtime_notification: false,
      delete_overtime_notification: false,

      // overtime_configuration
      overtime_configuration: false,

      // attendance_configuration
      attendance_configuration: false,

      formName: null
    }

    var leaveRequestForm: any = {
      // leave_track
      leave_track: true,
      add_leave_track: false,
      edit_leave_track: false,
      delete_leave_track: false,

      // leaveRequestForm
      leave_request: true,
      add_leave_request: false,
      edit_leave_request: false,
      delete_leave_request: false,
      export_leave_request: false,
      import_leave_request: false,

      // approve_request
      approve_request: true,
      add_approve_request: false,
      edit_approve_request: false,
      delete_approve_request: false,
      export_approve_request: false,
      import_approve_request: false,

      // denied request
      denied_request: true,
      add_denied_request: false,
      edit_denied_request: false,
      delete_denied_request: false,
      export_denied_request: false,
      import_denied_request: false,

      // leave_type_configuration
      leave_type_configuration: true,

      //  Leave Type Configuration Approval
      view_approval_in_leave_configuration: true,
      add_approval_in_leave_configuration: false,
      edit_approval_in_leave_configuration: false,
      delete_approval_in_leave_configuration: false,

      // Leave Type Configuration Notification
      view_notification_in_leave_configuration: true,
      add_notification_in_leave_configuration: false,
      edit_notification_in_leave_configuration: false,
      delete_notification_in_leave_configuration: false,

      // leave_configuration
      leave_configuration: true,
      formName: null
    }
    // UIkit.modal("#view-default-role").show();

    this.access = { ...orginizationForm, ...leaveForm, ...payrollForm, ...manifestForm, ...attendenceForm, ...leaveRequestForm }
    console.log("this.default_access", this.access)
  }


  addRole() {
    this.buttonLoader = true
    if (this.roleMasterForm.invalid) {
      this.roleMasterForm.markAllAsTouched()
    } else {
      var temp = {
        "roll_name": this.roleMasterForm.get('roll_name')?.value,
        "colne_roll": this.roleMasterForm.get('colne_roll')?.value,
        "type_roll": this.roleMasterForm.get('type_roll')?.value,
        "defaultAccess": this.roleMasterForm.get('defaultAccess')?.value,
        "role_owner_id": this.userData?.data?.owner_id,
        "access": this.access
      }
      console.log(temp)
      this.masterService.addRole(temp).subscribe({
        next: (res: any) => {
          this.handleSuccess("Role Added Successfully")
          this.buttonLoader = false
          this.reset()
        }, error: (err: any) => {
          this.handleError("Error")
          this.buttonLoader = false
        }
      })
    }
  }
  id: any
  setupEdit() {
    this.manageRole.editData.subscribe({
      next: (data: any) => {
        console.log("data===", data.colne_roll)
        this._id = data.id,
          this.id = parseInt(data.colne_roll),
          this.isEdit = true,
          this.roleMasterForm.get('roll_name')?.patchValue(data?.roll_name),
          this.roleMasterForm.get('colne_roll')?.patchValue(this.id),
          this.roleMasterForm.get('type_roll')?.patchValue(data?.type_roll),
          this.roleMasterForm.get("defaultAccess")?.patchValue(data?.defaultAccess)
        // this.roleMasterForm.get('role_owner_id')?.patchValue(data.role_owner_id)
      }, error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }
  editRole() {
    this.buttonLoader = true
    if (this.roleMasterForm.invalid) {
      this.roleMasterForm.markAllAsTouched();
      this.buttonLoader = false;
    } else {
      var temp = {
        "role_id": this._id,
        "addRole": {
          "roll_name": this.roleMasterForm.get('roll_name')?.value,
          "colne_roll": this.roleMasterForm.get('colne_roll')?.value,
          "type_roll": this.roleMasterForm.get('type_roll')?.value,
          "defaultAccess": this.roleMasterForm.get('defaultAccess')?.value,
        }
      }
      this.masterService.editRole(temp).subscribe({
        next: (res: any) => {
          this.manageRole.getRole()
          this.handleSuccess("Role Updated Successfully");
          this.reset();
          this.buttonLoader = false
          console.log(temp)
        },
        error: (e) => {
          this.handleError(e)
        }
      })
    }
  }

  reset() {
    this.isEdit = false
    UIkit.modal("#add-role").hide();
    this.manageRole.getRole()
    this.roleMasterForm.reset()
    this.roleMasterForm.patchValue({
      "formName": "roleMasterForm"
    })
  }

}
