import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ComponentsModule } from "src/app/components/components.module";
import { ShiftManagementComponent } from "./shift-management.component";
import { ShiftManagementRoutingModule } from "./shift-management.routing.module";
import { ManageShiftTypeComponent } from './shift-type/manage-shift-type/manage-shift-type.component';
import { AddShiftTypeComponent } from './shift-type/add-shift-type/add-shift-type.component';
import { AddShiftRequestComponent } from './shift-request/add-shift-request/add-shift-request.component';
import { ManageShiftRequestComponent } from './shift-request/manage-shift-request/manage-shift-request.component';
import { ManageShiftAssignmentComponent } from './shift-assignment/manage-shift-assignment/manage-shift-assignment.component';
import { AddShiftAssignmentComponent } from './shift-assignment/add-shift-assignment/add-shift-assignment.component';

@NgModule({
    declarations: [
        ShiftManagementComponent,
        ManageShiftTypeComponent,
        AddShiftTypeComponent,
        AddShiftRequestComponent,
        ManageShiftRequestComponent,
        ManageShiftAssignmentComponent,
        AddShiftAssignmentComponent
    ],
    imports: [
        ShiftManagementRoutingModule,
        CommonModule,
        ComponentsModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        NgSelectModule
    ],
    providers: []
})

export class ShiftManagementModule { }