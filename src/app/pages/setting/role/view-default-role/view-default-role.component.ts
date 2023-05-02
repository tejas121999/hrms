import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddRoleComponent } from '../add-role/add-role.component';
declare var UIkit: any;
@Component({
  selector: 'app-view-default-role',
  templateUrl: './view-default-role.component.html',
  styleUrls: ['./view-default-role.component.scss']
})
export class ViewDefaultRoleComponent implements OnInit {

  @Input('role') roleData: any;

  constructor(
    private manageRole: AddRoleComponent
  ) { }
  currentModule = "Orginization"
  orginizationForm = new FormGroup({
    formName: new FormControl("orginizationForm"),
    // employee
    employee: new FormControl(''),
    add_employee: new FormControl(''),
    edit_employee: new FormControl(''),
    delete_employee: new FormControl(''),
    export_employee: new FormControl(''),
    import_employee: new FormControl(''),
    // designation 
    designation: new FormControl(''),
    add_designation: new FormControl(''),
    edit_designation: new FormControl(''),
    delete_designation: new FormControl(''),
    export_designation: new FormControl(''),
    import_designation: new FormControl(''),
    // department
    department: new FormControl(''),
    add_department: new FormControl(''),
    edit_department: new FormControl(''),
    delete_department: new FormControl(''),
    import_department: new FormControl(''),
    export_department: new FormControl(''),
  })

  leaveForm = new FormGroup({
    formName: new FormControl("leaveForm"),
    // leave
    leave_type: new FormControl(""),
    add_leave_type: new FormControl(""),
    edit_leave_typ: new FormControl(""),
    delete_leave_type: new FormControl(""),
    export_leave_type: new FormControl(""),
    import_leave_type: new FormControl(""),
    // shift
    shift_type: new FormControl(""),
    add_shift_type: new FormControl(""),
    edit_shift_type: new FormControl(""),
    delete_shift_type: new FormControl(""),
    export_shift_type: new FormControl(""),
    import_shift_type: new FormControl(""),

    // holiday
    holiday: new FormControl(""),
    add_holiday: new FormControl(""),
    edit_holiday: new FormControl(""),
    delete_holiday: new FormControl(""),
    export_holiday: new FormControl(""),
    import_holiday: new FormControl(""),
  })

  payrollForm = new FormGroup({
    formName: new FormControl("payrollForm"),
    // payroll
    salary_component: new FormControl(""),
    add_salary_component: new FormControl(""),
    edit_salary_component: new FormControl(""),
    delete_salary_component: new FormControl(""),
    export_salary_component: new FormControl(""),
    import_salary_component: new FormControl(""),

    // salary structure
    salary_structure: new FormControl(""),
    add_salary_structure: new FormControl(""),
    edit_salary_structure: new FormControl(""),
    delete_salary_structure: new FormControl(""),
    export_salary_structure: new FormControl(""),
    import_salary_structure: new FormControl(""),

    // loan
    loan: new FormControl(""),
    add_loan: new FormControl(""),
    edit_loan: new FormControl(""),
    delete_loan: new FormControl(""),
    export_loan: new FormControl(""),
    import_loan: new FormControl(""),
  })

  manifestForm = new FormGroup({
    formName: new FormControl("manifestForm"),
    // rig
    rig: new FormControl(""),
    add_rig: new FormControl(""),
    edit_rig: new FormControl(""),
    delete_rig: new FormControl(""),
    export_rig: new FormControl(""),
    import_rig: new FormControl(""),

    // passenger
    passenger: new FormControl(""),
    add_passenger: new FormControl(""),
    edit_passenger: new FormControl(""),
    delete_passenger: new FormControl(""),
    export_passenger: new FormControl(""),
    import_passenger: new FormControl(""),


    // booking
    booking: new FormControl(""),
    add_booking: new FormControl(""),
    edit_booking: new FormControl(""),
    delete_booking: new FormControl(""),
    export_booking: new FormControl(""),
    import_booking: new FormControl(""),

    // roster
    roster: new FormControl(""),
    add_roster: new FormControl(""),
    edit_roster: new FormControl(""),
    delete_roster: new FormControl(""),
    export_roster: new FormControl(""),
    import_roster: new FormControl(""),
  })

  attendenceForm = new FormGroup({
    formName: new FormControl("attendenceForm"),
    // attendence
    attendence: new FormControl(""),
    add_attendence: new FormControl(""),
    edit_attendence: new FormControl(""),
    delete_attendence: new FormControl(""),
    export_attendence: new FormControl(""),
    import_attendence: new FormControl(""),

    // uploade attendence
    uploade_attendence: new FormControl(""),
    add_uploade_attendence: new FormControl(""),
    edit_uploade_attendence: new FormControl(""),
    delete_uploade_attendence: new FormControl(""),
    export_uploade_attendence: new FormControl(""),
    import_uploade_attendence: new FormControl(""),
  })

  leaveRequestForm = new FormGroup({
    formName: new FormControl("leaveRequestForm"),

    // leaveRequestForm
    leave_request: new FormControl(""),
    add_leave_request: new FormControl(""),
    edit_leave_request: new FormControl(""),
    delete_leave_request: new FormControl(""),
    export_leave_request: new FormControl(""),
    import_leave_request: new FormControl(""),

    // approve_request
    approve_request: new FormControl(""),
    add_approve_request: new FormControl(""),
    edit_approve_request: new FormControl(""),
    delete_approve_request: new FormControl(""),
    export_approve_request: new FormControl(""),
    import_approve_request: new FormControl(""),

    // denied request
    denied_request: new FormControl(""),
    add_denied_request: new FormControl(""),
    edit_denied_request: new FormControl(""),
    delete_denied_request: new FormControl(""),
    export_denied_request: new FormControl(""),
    import_denied_request: new FormControl(""),
  })


  ngOnInit(): void {
  }


  moduleName = [
    { module: "Organization" },
    { module: "Leave" },
    { module: "Payroll" },
    { module: "Manifest" },
    { module: "Attendence" }
  ]

  getCurrentModule(event: any) {
    this.currentModule = event.module
  }

  openRole() { 
    UIkit.modal("#add-role").show();
  }

  viewDefaultAccess() {
    this.manageRole.default_Access.subscribe({

    })
  }
}
