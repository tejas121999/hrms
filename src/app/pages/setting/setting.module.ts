import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/components/components.module";
import { SettingRoutingModule } from "./setting-routing.module";
import { SettingComponent } from "./setting.component";
import { SetupComponent } from './setup/setup.component';
import { FirstSetupComponent } from './first-setup/first-setup.component';
import { LetterheadComponent } from './letterhead/letterhead/letterhead.component';
import { ManageRoleComponent } from './role/manage-role/manage-role.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { FormPermissionComponent } from './permission/form-permission/form-permission.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ViewDefaultRoleComponent } from './role/view-default-role/view-default-role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from "ng2-charts";
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        SettingComponent, SetupComponent, FirstSetupComponent, LetterheadComponent, ManageRoleComponent, AddRoleComponent, FormPermissionComponent, ViewDefaultRoleComponent, DashboardComponent, ProfileComponent
    ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        NgSelectModule,
        NgxPaginationModule,
        NgChartsModule,
        FullCalendarModule
    ]
})
export class SettingModule { }