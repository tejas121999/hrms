import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageCandidateComponent } from "./candidate/manage-candidate/manage-candidate.component";
import { HrComponent } from "./hr.component";
import { ManageExitDetailComponent } from "./exit-detail/manage-exit-detail/manage-exit-detail.component";
import { ManageCandidateExitDetailComponent } from "./candidate-exit-detail/manage-candidate-exit-detail/manage-candidate-exit-detail.component";

const routes: Routes = [
    {
        path: 'manage-candidate', 
        component: ManageCandidateComponent
    },
    {
        path: 'manage-exit-detail', 
        component: ManageExitDetailComponent
    },
    {
        path:"manage-candidate-exit",
        component:ManageCandidateExitDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HrRoutingModule { }