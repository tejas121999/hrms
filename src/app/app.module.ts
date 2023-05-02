import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { MastersModule } from './pages/masters/masters.module';
import { AttendanceModule } from './pages/attendance/attendance.module';
import { ShiftManagementModule } from './pages/shift-management/shift-management.module';
import { AuthModule } from './pages/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { SettingModule } from './pages/setting/setting.module';
import { HrModule } from './pages/hr/hr.module';
import { ExportService } from './services/export.service';
import { ExitDetailsComponent } from './pages/exit-details/exit-details.component';
import { ManageExitDetailsComponent } from './pages/exit-details/manage-exit-details/manage-exit-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ExitDetailsComponent,
    ManageExitDetailsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MastersModule,
    AttendanceModule,
    ShiftManagementModule,
    ComponentsModule,
    RouterModule,
    AuthModule,
    SettingModule,
    HrModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
