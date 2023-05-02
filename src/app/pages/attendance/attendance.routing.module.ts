import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AttendanceNotificationComponent } from "./attendance-notification/attendance-notification/attendance-notification.component";
import { ManageAttendanceNotificationComponent } from "./attendance-notification/manage-attendance-notification/manage-attendance-notification.component";
import { AddAttendanceRequestComponent } from "./attendance-request/add-attendance-request/add-attendance-request.component";
import { ManageAttendanceRequestComponent } from "./attendance-request/manage-attendance-request/manage-attendance-request.component";
import { AttendanceSettingComponent } from "./attendance-setting/attendance-setting/attendance-setting.component";
import { AttendanceConfigurationComponent } from "./configuration/attendance-configuration/attendance-configuration.component";
import { EarlyGoingComponent } from "./early-going/early-going/early-going.component";
import { AddAttendanceComponent } from "./employee-attendance-tools/add-attendance/add-attendance.component";
import { ManageAttendanceComponent } from "./employee-attendance-tools/manage-attendance/manage-attendance.component";
import { EmployeeAttendanceComponent } from "./employee-attendance/employee-attendance/employee-attendance.component";
import { AddEmployeeCheckInComponent } from "./employee-check-in/add-employee-check-in/add-employee-check-in.component";
import { ManageEmployeeCheckInComponent } from "./employee-check-in/manage-employee-check-in/manage-employee-check-in.component";
import { ManageHolidayListComponent } from "./holidaylist/manage-holiday-list/manage-holiday-list.component";
import { LateComingComponent } from "./late-coming/late-coming/late-coming.component";
import { ManageMarkAttendanceComponent } from "./mark-attendance/manage-mark-attendance/manage-mark-attendance.component";
import { ViewAttendanceComponent } from "./mark-attendance/view-attendance/view-attendance.component";
import { OvertimeConfigurationComponent } from "./overtime-configuration/overtime-configuration/overtime-configuration.component";
import { OvertimeNotificationComponent } from "./overtime-notification/overtime-notification/overtime-notification.component";
import { ManagePresentEmployeeComponent } from "./present-employee/manage-present-employee/manage-present-employee.component";
import { PresentEmployeeComponent } from "./present-employee/present-employee/present-employee.component";
import { ManageRegularizationComponent } from "./regularization/manage-regularization/manage-regularization.component";
import { RegularizationRequestComponent } from "./regularization/regularization-request/regularization-request.component";
import { ManageShiftComponent } from "./shift/manage-shift/manage-shift.component";
import { AddUploadAttendanceComponent } from "./upload-attendance/add-upload-attendance/add-upload-attendance.component";
import { ManageUploadAttendanceComponent } from "./upload-attendance/manage-upload-attendance/manage-upload-attendance.component";
import { WeeklyOffComponent } from "./weekly-off/weekly-off/weekly-off.component";

const routes: Routes = [
    {
        component:ManageAttendanceComponent,
        path:"manage-attendance"
    },
    {
        component:AddAttendanceComponent,
        path:"add-attendance"
    },
    {
        component:ManageAttendanceRequestComponent,
        path:"manage-attendance-request"
    },
    {
        component:AddAttendanceRequestComponent,
        path:"add-attendance-request"
    },
    {
        component:ManageUploadAttendanceComponent,
        path:"manage-upload-attendance"
    },
    {
        component:AddUploadAttendanceComponent,
        path:"add-upload-attendance"
    },
    {
        component:ManageMarkAttendanceComponent,
        path:"manage-mark-attendance"
    },
    {
        component:ViewAttendanceComponent,
        path:"view-attendance"
    },
    {
        component:ManageEmployeeCheckInComponent,
        path:"manage-employee-check-in"
    },
    {
        component:AddEmployeeCheckInComponent,
        path:"add-employee-check-in"
    },
    {
        component:ManageHolidayListComponent,
        path:"manage-holiday-list"
    },
    {
        component:WeeklyOffComponent,
        path:"weekly-off"
    },
    {
        component:ManageShiftComponent,
        path:"manage-shift"
    },
    {
        component:ManageAttendanceNotificationComponent,
        path:"manage-attendance-notification"
    },
    {
        component:AttendanceNotificationComponent,
        path:"attendance-notification"
    },
    {
        component:ManagePresentEmployeeComponent,
        path:"manage-present-employee"
    },
    {
        component:PresentEmployeeComponent,
        path:"present-employee"
    },
    {
        component:LateComingComponent,
        path:"late-coming"
    },
    {
        component:EarlyGoingComponent,
        path:"early-going"
    },
    {
        component:OvertimeNotificationComponent,
        path:"overtime-notification"
    },
    {
        component:OvertimeConfigurationComponent,
        path:"overtime-configuration"
    },
    {
        component:AttendanceSettingComponent,
        path:"attendance-setting"
    },
    {
        component:AttendanceConfigurationComponent,
        path:"attendance-configuration"
    },
    {
        component:EmployeeAttendanceComponent,
        path:"attendance"
    },
    {
        component:ManageRegularizationComponent,
        path:"manage-regularization"
    },
    {
        component:RegularizationRequestComponent,
        path:"regularization-request"
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AttendanceRoutingModule { }