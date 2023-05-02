import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApprovedRequestComponent } from "./approved-request/approved-request/approved-request.component";
import { AddCompensatoryLeaveRequestComponent } from "./compensatory-leave-request/add-compensatory-leave-request/add-compensatory-leave-request.component";
import { ManageCompensatoryLeaveRequestComponent } from "./compensatory-leave-request/manage-compensatory-leave-request/manage-compensatory-leave-request.component";
import { ConfigurationComponent } from "./configuration/configuration/configuration.component";
import { DeniedLeavesComponent } from "./denied-leave/denied-leaves/denied-leaves.component";
import { AddLeaveAllocationComponent } from "./leave-allocation/add-leave-allocation/add-leave-allocation.component";
import { ManageLeaveAllocationComponent } from "./leave-allocation/manage-leave-allocation/manage-leave-allocation.component";
import { AddLeaveApplicationComponent } from "./leave-application/add-leave-application/add-leave-application.component";
import { ManageLeaveApplicationComponent } from "./leave-application/manage-leave-application/manage-leave-application.component";
import { ManageApprovalComponent } from "./leave-configuration/approval/manage-approval/manage-approval.component";
import { LeaveConfigurationComponent } from "./leave-configuration/leave-configuration/leave-configuration.component";
import { ManageLeaveNotificationComponent } from "./leave-configuration/notification/manage-leave-notification/manage-leave-notification.component";
import { AddLeaveEncashmentComponent } from "./leave-encashment/add-leave-encashment/add-leave-encashment.component";
import { ManageLeaveEncashmentComponent } from "./leave-encashment/manage-leave-encashment/manage-leave-encashment.component";
import { AddLeavePeriodComponent } from "./leave-period/add-leave-period/add-leave-period.component";
import { ManageLeavePeriodComponent } from "./leave-period/manage-leave-period/manage-leave-period.component";
import { AddLeavePolicyAssignmentComponent } from "./leave-policy-management/add-leave-policy-assignment/add-leave-policy-assignment.component";
import { ManageLeavePolicyAssignmentComponent } from "./leave-policy-management/manage-leave-policy-assignment/manage-leave-policy-assignment.component";
import { ManageLeaveRequestComponent } from "./leave-request/manage-leave-request/manage-leave-request.component";
import { ManageLeaveTrackComponent } from "./leave-track/manage-leave-track/manage-leave-track.component";
import { LeaveTypeComponent } from "./leave-type/leave-type/leave-type.component";
import { ManageLeaveTypeComponent } from "./leave-type/manage-leave-type/manage-leave-type.component";
const routes: Routes = [
    {
        component:ManageLeavePeriodComponent,
        path:"manage-leave-period"
    },
    {
        component:AddLeavePeriodComponent,
        path:"add-leave-period"
    },
    {
        component:ManageLeavePolicyAssignmentComponent,
        path:"manage-leave-policy-assignment"
    },
    {
        component:AddLeavePolicyAssignmentComponent,
        path:"add-leave-policy-assignment"
    },
    {
        component:ManageLeaveAllocationComponent,
        path:"manage-leave-allocation"
    },
    {
        component:AddLeaveAllocationComponent,
        path:"add-leave-allocation"
    },
    {
        component:ManageLeaveApplicationComponent,
        path:"manage-leave-application"
    },
    {
        component:AddLeaveApplicationComponent,
        path:"add-leave-application"
    },
    {
        component:ManageCompensatoryLeaveRequestComponent,
        path:"manage-compensatory-leave-request"
    },
    {
        component:AddCompensatoryLeaveRequestComponent,
        path:"add-compensatory-leave-request"
    },
    {
        component:ManageLeaveEncashmentComponent,
        path:"manage-leave-encashment"
    },
    {
        component:AddLeaveEncashmentComponent,
        path:"add-leave-encashment"
    },
    {
        component:ManageLeaveRequestComponent,
        path:"manage-leave-request"
    },
    {
        component:ManageLeaveTrackComponent,
        path:"manage-leave-track"
    },
    {
        component:LeaveTypeComponent,
        path:"leave-type"
    },
    {
        component:ManageLeaveTypeComponent,
        path:"manage-leave-type"
    },
    {
        component:LeaveConfigurationComponent,
        path:"leave-configuration"
    },
    {
        component:ConfigurationComponent,
        path:"configuration"
    },
    {
        component:ManageLeaveTrackComponent,
        path:"manage-leave-track"
    },
    {
        component:ManageApprovalComponent,
        path:"manage-approval"
    },
    {
        component:ManageLeaveNotificationComponent,
        path:"manage-leave-notification"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LeaveManagementRoutingModule { }