import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LeaveManagementComponent } from './pages/leave-management/leave-management.component';
import { MastersComponent } from './pages/masters/masters.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ShiftManagementComponent } from './pages/shift-management/shift-management.component';
import { AuthGuard } from './guard/auth.guard';
import { HrComponent } from './pages/hr/hr.component';
import { PayrollComponent } from './pages/payroll/payroll.component';



const routes: Routes = [
  {
    path: "masters",
    component: MastersComponent,
    loadChildren: () => import("./pages/masters/masters.module").then(x => x.MastersModule),
    canActivate: [AuthGuard]
  },
  {
    path: "attendance",
    component: AttendanceComponent,
    loadChildren: () => import("./pages/attendance/attendance.module").then(x => x.AttendanceModule),
    canActivate: [AuthGuard]
  },
  {
    path: "shift-management",
    component: ShiftManagementComponent,
    loadChildren: () => import("./pages/shift-management/shift-management.module").then(x => x.ShiftManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: "leave-management",
    component: LeaveManagementComponent,
    loadChildren: () => import("./pages/leave-management/leave-management.module").then(x => x.LeaveManagementModule),
    canActivate:[AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    loadChildren: () => import('./pages/auth/auth.module').then(x => x.AuthModule)
  },
  {
    path: "setting",
    component: SettingComponent,
    loadChildren: () => import('./pages/setting/setting.module').then(x => x.SettingModule),
  },
  {
    path: "hr",
    component: HrComponent,
    loadChildren: () => import('./pages/hr/hr.module').then(x => x.HrModule),
  },
  {
    path: "payroll",
    component: PayrollComponent,
    loadChildren: () => import('./pages/payroll/payroll.module').then(x => x.PayrollModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
