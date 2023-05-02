import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ComponentsModule } from "src/app/components/components.module";
import { LeaveManagementComponent } from "./leave-management.component";
import { LeaveManagementRoutingModule } from "./leave-management.routing.module";
import { AddLeavePeriodComponent } from './leave-period/add-leave-period/add-leave-period.component';
import { ManageLeavePeriodComponent } from './leave-period/manage-leave-period/manage-leave-period.component';
import { ManageLeavePolicyAssignmentComponent } from './leave-policy-management/manage-leave-policy-assignment/manage-leave-policy-assignment.component';
import { AddLeavePolicyAssignmentComponent } from './leave-policy-management/add-leave-policy-assignment/add-leave-policy-assignment.component';
import { AddLeaveAllocationComponent } from './leave-allocation/add-leave-allocation/add-leave-allocation.component';
import { ManageLeaveAllocationComponent } from './leave-allocation/manage-leave-allocation/manage-leave-allocation.component';
import { ManageLeaveApplicationComponent } from './leave-application/manage-leave-application/manage-leave-application.component';
import { AddLeaveApplicationComponent } from './leave-application/add-leave-application/add-leave-application.component';
import { AddCompensatoryLeaveRequestComponent } from './compensatory-leave-request/add-compensatory-leave-request/add-compensatory-leave-request.component';
import { ManageCompensatoryLeaveRequestComponent } from './compensatory-leave-request/manage-compensatory-leave-request/manage-compensatory-leave-request.component';
import { ManageLeaveEncashmentComponent } from './leave-encashment/manage-leave-encashment/manage-leave-encashment.component';
import { AddLeaveEncashmentComponent } from './leave-encashment/add-leave-encashment/add-leave-encashment.component';
import { ManageLeaveRequestComponent } from './leave-request/manage-leave-request/manage-leave-request.component';
import { ManageLeaveTrackComponent } from "./leave-track/manage-leave-track/manage-leave-track.component";
import { AddLeaveTrackComponent } from "./leave-track/add-leave-track/add-leave-track.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from '@angular/forms';
import { LeaveTypeComponent } from './leave-type/leave-type/leave-type.component';
import { LeaveConfigurationComponent } from './leave-configuration/leave-configuration/leave-configuration.component';
import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { ManageLeaveTypeComponent } from './leave-type/manage-leave-type/manage-leave-type.component';
import { ManageApprovalComponent } from './leave-configuration/approval/manage-approval/manage-approval.component';
import { AddApprovalComponent } from './leave-configuration/approval/add-approval/add-approval.component';
import { AddLeaveApprovalComponent } from './leave-configuration/approval/add-approval/add-leave-approval/add-leave-approval.component';
import { AddEncashApprovalComponent } from './leave-configuration/approval/add-approval/add-encash-approval/add-encash-approval.component';
import { AddEncashApplicationComponent } from './leave-configuration/approval/add-approval/add-encash-application/add-encash-application.component';
import { ManageLeaveNotificationComponent } from './leave-configuration/notification/manage-leave-notification/manage-leave-notification.component';
import { AddLeaveNotificationComponent } from './leave-configuration/notification/add-leave-notification/add-leave-notification.component';
import { AddApplicationNotificationComponent } from './leave-configuration/notification/add-leave-notification/add-application-notification/add-application-notification.component';
import { AddApprovalNotificationComponent } from './leave-configuration/notification/add-leave-notification/add-approval-notification/add-approval-notification.component';
import { AddPendingNotificationComponent } from './leave-configuration/notification/add-leave-notification/add-pending-notification/add-pending-notification.component';
import { AddEncashNotificationComponent } from './leave-configuration/notification/add-leave-notification/add-encash-notification/add-encash-notification.component';
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
    declarations: [
        LeaveManagementComponent,
        AddLeavePeriodComponent,
        ManageLeavePeriodComponent,
        ManageLeavePolicyAssignmentComponent,
        AddLeavePolicyAssignmentComponent,
        AddLeaveAllocationComponent,
        ManageLeaveAllocationComponent,
        ManageLeaveApplicationComponent,
        AddLeaveApplicationComponent,
        AddCompensatoryLeaveRequestComponent,
        ManageCompensatoryLeaveRequestComponent,
        ManageLeaveEncashmentComponent,
        AddLeaveEncashmentComponent,
        ManageLeaveRequestComponent,
        ManageLeaveTrackComponent,
        AddLeaveTrackComponent,
        LeaveTypeComponent,
        LeaveConfigurationComponent,
        ConfigurationComponent,
        ManageLeaveTypeComponent,
        ManageApprovalComponent,
        AddApprovalComponent,
        AddLeaveApprovalComponent,
        AddEncashApprovalComponent,
        AddEncashApplicationComponent,
        ManageLeaveNotificationComponent,
        AddLeaveNotificationComponent,
        AddApplicationNotificationComponent,
        AddApprovalNotificationComponent,
        AddPendingNotificationComponent,
        AddEncashNotificationComponent,
        

    ],
    providers: [],
    imports: [
        LeaveManagementRoutingModule,
        CommonModule,
        ComponentsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        FullCalendarModule
    ]
})

export class LeaveManagementModule { }