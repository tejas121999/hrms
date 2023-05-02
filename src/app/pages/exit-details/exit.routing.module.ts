import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageExitDetailsComponent } from "./manage-exit-details/manage-exit-details.component";

const routes: Routes = [
    {
        component:ManageExitDetailsComponent,
        path:"manage-exit-details"
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AttendanceRoutingModule { }