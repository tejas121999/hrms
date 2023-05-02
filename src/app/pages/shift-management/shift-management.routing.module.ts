import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddShiftAssignmentComponent } from "./shift-assignment/add-shift-assignment/add-shift-assignment.component";
import { ManageShiftAssignmentComponent } from "./shift-assignment/manage-shift-assignment/manage-shift-assignment.component";
import { AddShiftRequestComponent } from "./shift-request/add-shift-request/add-shift-request.component";
import { ManageShiftRequestComponent } from "./shift-request/manage-shift-request/manage-shift-request.component";
import { AddShiftTypeComponent } from "./shift-type/add-shift-type/add-shift-type.component";
import { ManageShiftTypeComponent } from "./shift-type/manage-shift-type/manage-shift-type.component";

const routes: Routes = [
  {
    component:ManageShiftTypeComponent,
    path:"manage-shift-type"
  },
  {
    component:AddShiftTypeComponent,
    path:"add-shift-type"
  },
  {
    component:ManageShiftRequestComponent,
    path:"manage-shift-request"
  },
  {
    component:AddShiftRequestComponent,
    path:"add-shift-request"
  },
  {
    component:ManageShiftAssignmentComponent,
    path:"manage-shift-assignment"
  },
  {
    component:AddShiftAssignmentComponent,
    path:"add-shift-assignment"
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ShiftManagementRoutingModule { }