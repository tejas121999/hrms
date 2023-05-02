import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FirstSetupComponent } from "./first-setup/first-setup.component";
import { LetterheadComponent } from "./letterhead/letterhead/letterhead.component";
import { FormPermissionComponent } from "./permission/form-permission/form-permission.component";
import { ManageRoleComponent } from "./role/manage-role/manage-role.component";
import { SetupComponent } from "./setup/setup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    {
        path:"setup",
        component:SetupComponent
    },
    {
      path:"first-setup",
      component:FirstSetupComponent
    },
    {
      path:"letterhead",
      component:LetterheadComponent
    },
    {
      path:"manage-role",
      component:ManageRoleComponent
    },
    {
      path:"form-permission",
      component:FormPermissionComponent
    },
    {
      path:"dashboard",
      component:DashboardComponent
    },
    {
      path:"profile",
      component:ProfileComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SettingRoutingModule { }