import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ComponentsModule } from "src/app/components/components.module";
import { AttendanceComponent } from "./attendance.component";
import { AttendanceRoutingModule } from "./attendance.routing.module";
import { ManageAttendanceComponent } from './employee-attendance-tools/manage-attendance/manage-attendance.component';
import { AddAttendanceComponent } from './employee-attendance-tools/add-attendance/add-attendance.component';
import { AddAttendanceRequestComponent } from './attendance-request/add-attendance-request/add-attendance-request.component';
import { ManageAttendanceRequestComponent } from './attendance-request/manage-attendance-request/manage-attendance-request.component';
import { ManageUploadAttendanceComponent } from './upload-attendance/manage-upload-attendance/manage-upload-attendance.component';
import { AddUploadAttendanceComponent } from './upload-attendance/add-upload-attendance/add-upload-attendance.component';
import { AddEmployeeCheckInComponent } from './employee-check-in/add-employee-check-in/add-employee-check-in.component';
import { ManageEmployeeCheckInComponent } from './employee-check-in/manage-employee-check-in/manage-employee-check-in.component';
import { ManageMarkAttendanceComponent } from './mark-attendance/manage-mark-attendance/manage-mark-attendance.component';
import { AddMarkAttendanceComponent } from './mark-attendance/add-mark-attendance/add-mark-attendance.component';
import { NgxDropzoneModule } from "ngx-dropzone";
// import { ManagePackageComponent } from './package/manage-package/manage-package.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { ManageHolidayListComponent } from "./holidaylist/manage-holiday-list/manage-holiday-list.component";
import { WeeklyOffComponent } from './weekly-off/weekly-off/weekly-off.component';
import { AddHolidayListComponent } from './holidaylist/add-holiday-list/add-holiday-list.component';
import { AddShiftComponent } from './shift/add-shift/add-shift.component';
import { ManageShiftComponent } from './shift/manage-shift/manage-shift.component';
import { AttendanceNotificationComponent } from './attendance-notification/attendance-notification/attendance-notification.component';
import { PresentEmployeeComponent } from './present-employee/present-employee/present-employee.component';
import { LateComingComponent } from './late-coming/late-coming/late-coming.component';
import { EarlyGoingComponent } from './early-going/early-going/early-going.component';
import { OvertimeNotificationComponent } from './overtime-notification/overtime-notification/overtime-notification.component';
import { OvertimeConfigurationComponent } from './overtime-configuration/overtime-configuration/overtime-configuration.component';
import { AttendanceSettingComponent } from './attendance-setting/attendance-setting/attendance-setting.component';
import { AttendanceConfigurationComponent } from './configuration/attendance-configuration/attendance-configuration.component';
import { ManageAttendanceNotificationComponent } from './attendance-notification/manage-attendance-notification/manage-attendance-notification.component';
import { AddAttendanceNotificationComponent } from './attendance-notification/add-attendance-notification/add-attendance-notification.component';
import { ApprovalNotificationComponent } from './attendance-notification/add-attendance-notification/approval-notification/approval-notification.component';
import { AbsentNotificationComponent } from './attendance-notification/add-attendance-notification/absent-notification/absent-notification.component';
import { MissingNotificationComponent } from './attendance-notification/add-attendance-notification/missing-notification/missing-notification.component';
import { ManagePresentEmployeeComponent } from './present-employee/manage-present-employee/manage-present-employee.component';
import { ViewAttendanceComponent } from './mark-attendance/view-attendance/view-attendance.component';
import { GetEveryDayAttendenceComponent } from './get-every-day-attendence/get-every-day-attendence.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance/employee-attendance.component';
import { AddRegularizationComponent } from './regularization/add-regularization/add-regularization.component';
import { ManageRegularizationComponent } from './regularization/manage-regularization/manage-regularization.component';
import { RegularizationRequestComponent } from "./regularization/regularization-request/regularization-request.component";

@NgModule({
    declarations: [
        AttendanceComponent,
        ManageAttendanceComponent,
        AddAttendanceComponent,
        AddAttendanceRequestComponent,
        ManageAttendanceRequestComponent,
        ManageUploadAttendanceComponent,
        AddUploadAttendanceComponent,
        AddEmployeeCheckInComponent,
        ManageEmployeeCheckInComponent,
        ManageMarkAttendanceComponent,
        AddMarkAttendanceComponent,
        // ManagePackageComponent,
        ManageHolidayListComponent,
        WeeklyOffComponent,
        AddHolidayListComponent,
        AddShiftComponent,
        ManageShiftComponent,
        AttendanceNotificationComponent,
        PresentEmployeeComponent,
        LateComingComponent,
        EarlyGoingComponent,
        OvertimeNotificationComponent,
        OvertimeConfigurationComponent,
        AttendanceSettingComponent,
        AttendanceConfigurationComponent,
        ManageAttendanceNotificationComponent,
        AddAttendanceNotificationComponent,
        ApprovalNotificationComponent,
        AbsentNotificationComponent,
        MissingNotificationComponent,
        ManagePresentEmployeeComponent,
        ViewAttendanceComponent,
        GetEveryDayAttendenceComponent,
        EmployeeAttendanceComponent,
        AddRegularizationComponent,
        ManageRegularizationComponent,
        RegularizationRequestComponent
    ],
    imports: [
        AttendanceRoutingModule,
        CommonModule,
        ComponentsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgSelectModule,
        NgxDropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FullCalendarModule
    ],
    providers: []
})

export class AttendanceModule { }
function registerPlugins(arg0: import("@fullcalendar/core/internal-common").b[]): any {
  throw new Error("Function not implemented.");
}

