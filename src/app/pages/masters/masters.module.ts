import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentsModule } from "src/app/components/components.module";
import { ManageEmployeeComponent } from "./employee/manage-employee/manage-employee.component";
import { MastersComponent } from "./masters.component";
import { MastersRoutingModule } from "./masters.routing.module";
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from "@ng-select/ng-select";
import { ManageEmploymentTypeComponent } from './employment-type/manage-employment-type/manage-employment-type.component';
import { AddEmploymentTypeComponent } from './employment-type/add-employment-type/add-employment-type.component';
import { ManageBranchComponent } from './branch/manage-branch/manage-branch.component';
import { AddBranchComponent } from './branch/add-branch/add-branch.component';
import { ManageDepartmentComponent } from './department/manage-department/manage-department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { ManageDesignationComponent } from './designation/manage-designation/manage-designation.component';
import { AddDesignationComponent } from './designation/add-designation/add-designation.component';
import { ManageEmployeeGradeComponent } from './employee-grade/manage-employee-grade/manage-employee-grade.component';
import { AddEmployeeGradeComponent } from './employee-grade/add-employee-grade/add-employee-grade.component';
import { AddEmployeeGroupComponent } from './employee-group/add-employee-group/add-employee-group.component';
import { ManageEmployeeGroupComponent } from './employee-group/manage-employee-group/manage-employee-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageEmployeeHealthInsuranceComponent } from './employee-health-insurance/manage-employee-health-insurance/manage-employee-health-insurance.component';
import { AddEmployeeHealthInsuranceComponent } from './employee-health-insurance/add-employee-health-insurance/add-employee-health-insurance.component';
import { AddShiftTypeComponent } from './shift-type/add-shift-type/add-shift-type.component';
import { ManageShiftTypeComponent } from './shift-type/manage-shift-type/manage-shift-type.component';
import { ManageHolidayListComponent } from './holiday-list/manage-holiday-list/manage-holiday-list.component';
import { AddHolidayListComponent } from './holiday-list/add-holiday-list/add-holiday-list.component';
import { AddJobApplicantComponent } from './job-applicant/add-job-applicant/add-job-applicant.component';
import { ManageJobApplicantComponent } from './job-applicant/manage-job-applicant/manage-job-applicant.component';
import { ManageTrainingProgramComponent } from './training-program/manage-training-program/manage-training-program.component';
import { AddTrainingProgramComponent } from './training-program/add-training-program/add-training-program.component';
import { AddLoanTypeComponent } from './loan-type/add-loan-type/add-loan-type.component';
import { ManageLoanTypeComponent } from './loan-type/manage-loan-type/manage-loan-type.component';
import { AddTemplateComponent } from './templates/add-template/add-template.component';
import { ManageTemplateComponent } from './templates/manage-template/manage-template.component';
import { ManageAlertComponent } from './alerts/manage-alert/manage-alert.component';
import { AddAlertComponent } from './alerts/add-alert/add-alert.component';
import { AddRosterComponent } from './roster/add-roster/add-roster.component';
import { ManageRosterComponent } from './roster/manage-roster/manage-roster.component';
import { ManageIncomeTaxDeductionComponent } from './income-tax-deduction/manage-income-tax-deduction/manage-income-tax-deduction.component';
import { AddIncomeTaxDeductionComponent } from './income-tax-deduction/add-income-tax-deduction/add-income-tax-deduction.component';
import { AddSalaryGradeComponent } from './salary-grade/add-salary-grade/add-salary-grade.component';
import { ManageSalaryGradeComponent } from './salary-grade/manage-salary-grade/manage-salary-grade.component';
import { ManageLeaveTypeComponent } from './leave-type/manage-leave-type/manage-leave-type.component';
import { AddLeaveTypeComponent } from './leave-type/add-leave-type/add-leave-type.component';
import { AddEmployeeSkillMapComponent } from './employee-skill-map/add-employee-skill-map/add-employee-skill-map.component';
import { ManageEmployeeSkillMapComponent } from './employee-skill-map/manage-employee-skill-map/manage-employee-skill-map.component';
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormValidator } from "src/app/shared/managers/form-validators";
import { ManagePackageComponent } from './package/manage-package/manage-package.component';
import { AddPackageComponent } from './package/add-package/add-package.component';
import { AddManifestPassengerComponent } from './manifest-passenger/add-manifest-passenger/add-manifest-passenger.component';
import { ManageManifestPassengerComponent } from './manifest-passenger/manage-manifest-passenger/manage-manifest-passenger.component';
import { ManageRigManifestComponent } from './rig-manifest/manage-rig-manifest/manage-rig-manifest.component';
import { AddRigManifestComponent } from './rig-manifest/add-rig-manifest/add-rig-manifest.component';
import { AddBookingComponent } from './bookings/add-booking/add-booking.component';
import { ManageBookingComponent } from './bookings/manage-booking/manage-booking.component';
import { ManageSalaryComponent } from './salary/manage-salary/manage-salary.component';
import { AddSalaryComponent } from './salary/add-salary/add-salary.component';
import { AddSalaryCompComponent } from './salary-comp/add-salary-comp/add-salary-comp.component';
import { ManageSalaryCompComponent } from './salary-comp/manage-salary-comp/manage-salary-comp.component';
import { ManageReportsComponent } from './reports/manage-reports/manage-reports.component';
import { AddReportsComponent } from './reports/add-reports/add-reports.component';
import { AddAttendanceComponent } from './attendance/add-attendance/add-attendance.component';
import { ManageAttendanceComponent } from './attendance/manage-attendance/manage-attendance.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { ManageCompanyComponent } from './company/manage-company/manage-company.component';
import { ManageDomainComponent } from './domain/manage-domain/manage-domain.component';
import { AddDomainComponent } from './domain/add-domain/add-domain.component';
import { NgxEditorModule } from "ngx-editor";
import { PersonalInfoComponent } from './employee/add-employee/personal-info/personal-info.component';
import { NomineeInfoComponent } from './employee/add-employee/nominee-info/nominee-info.component';
import { BankDetailsInfoComponent } from './employee/add-employee/bank-details-info/bank-details-info.component';
import { InsuranceInfoComponent } from './employee/add-employee/insurance-info/insurance-info.component';
import { OtherInfoComponent } from './employee/add-employee/other-info/other-info.component';
import { ManageSalaryStructureComponent } from './salary-structure/manage-salary-structure/manage-salary-structure.component';
import { AddSalaryStructureComponent } from './salary-structure/add-salary-structure/add-salary-structure.component';
import { GeneralInfoComponent } from './employee/add-employee/general-info/general-info.component';
import { LoginInfoComponent } from './employee/add-employee/login-info/login-info.component';
import { EmergencyInfoComponent } from './employee/add-employee/emergency-info/emergency-info.component';
import { AddressInfoComponent } from './employee/add-employee/address-info/address-info.component';
import { ManageTaxExemptionComponent } from "./tax-exemption/manage-tax-exemption/manage-tax-exemption.component";
import { AddTaxExemptionComponent } from "./tax-exemption/add-tax-exemption/add-tax-exemption.component";
import { ManageVehicleComponent } from "./vehicle/manage-vehicle/manage-vehicle.component";
import { AddVehicleComponent } from "./vehicle/add-vehicle/add-vehicle.component";
import { ManageUserRoleComponent } from './user-role/manage-user-role/manage-user-role.component';
import { AddUserRoleComponent } from './user-role/add-user-role/add-user-role.component';
import { AddBankComponent } from './bank/add-bank/add-bank.component';
import { ManageBankComponent } from './bank/manage-bank/manage-bank.component';
import { ManageGratuityRuleComponent } from './gratuity-rule/manage-gratuity-rule/manage-gratuity-rule.component';
import { AddGratuityRuleComponent } from './gratuity-rule/add-gratuity-rule/add-gratuity-rule.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrModule } from "ngx-toastr";
import { AssignPackageComponent } from './employee/assign-package/assign-package.component';
import { AssignLeaveComponent } from './employee/assign-leave/assign-leave.component';
import { AssignShiftComponent } from './employee/assign-shift/assign-shift.component';
import { ManageEmployeeSalaryComponent } from "./employee-salary/manage-employee-salary/manage-employee-salary.component";
import { AddEmployeeSalaryComponent } from "./employee-salary/add-employee-salary/add-employee-salary.component";
import { ManageYearlyRosterComponent } from './yearly-roster/manage-yearly-roster/manage-yearly-roster.component';
import { AddYearlyRosterComponent } from './yearly-roster/add-yearly-roster/add-yearly-roster.component';
import { ViewYearlyRosterComponent } from './yearly-roster/view-yearly-roster/view-yearly-roster.component';
import { ViewRosterComponent } from './roster/view-roster/view-roster.component';
import { ExportService } from "src/app/services/export.service";
import { AssignPermissionComponent } from './employee/assign-permission/assign-permission.component';
import { CrewPassengerDataComponent } from './crew-passenger-data/crew-passenger-data/crew-passenger-data.component';
import { ViewDocumentsComponent } from './employee/view-documents/view-documents.component';
import { AddCrewComponent } from './crew/add-crew/add-crew.component';
import { ManageCrewComponent } from './crew/manage-crew/manage-crew.component';
@NgModule({
    declarations: [
      MastersComponent,
      ManageEmployeeComponent,
      AddEmployeeComponent,
      ManageEmploymentTypeComponent,
      AddEmploymentTypeComponent,
      ManageBranchComponent,
      AddBranchComponent,
      ManageDepartmentComponent,
      AddDepartmentComponent,
      ManageDesignationComponent,
      AddDesignationComponent,
      ManageEmployeeGradeComponent,
      AddEmployeeGradeComponent,
      AddEmployeeGroupComponent,
      ManageEmployeeGroupComponent,
      ManageEmployeeHealthInsuranceComponent,
      AddEmployeeHealthInsuranceComponent,
      AddShiftTypeComponent,
      ManageShiftTypeComponent,
      ManageHolidayListComponent,
      AddHolidayListComponent,
      AddJobApplicantComponent,
      ManageJobApplicantComponent,
      ManageTrainingProgramComponent,
      AddTrainingProgramComponent,
      AddLoanTypeComponent,
      ManageLoanTypeComponent,
      AddTemplateComponent,
      ManageTemplateComponent,
      ManageAlertComponent,
      AddAlertComponent,
      AddRosterComponent,
      ManageRosterComponent,
      ManageIncomeTaxDeductionComponent,
      AddIncomeTaxDeductionComponent,
      AddSalaryGradeComponent,
      ManageSalaryGradeComponent,
      ManageLeaveTypeComponent,
      AddLeaveTypeComponent,
      AddEmployeeSkillMapComponent,
      AddEmployeeSalaryComponent,
      ManageEmployeeSkillMapComponent,
      ManageEmployeeComponent,
      ManagePackageComponent,
      AddPackageComponent,
      AddManifestPassengerComponent,
      ManageManifestPassengerComponent,
      ManageRigManifestComponent,
      AddRigManifestComponent,
      AddBookingComponent,
      ManageBookingComponent,
      ManageSalaryComponent,
      AddSalaryComponent,
      AddSalaryCompComponent,
      ManageSalaryCompComponent,
      ManageReportsComponent,
      AddReportsComponent,
      AddAttendanceComponent,
      ManageAttendanceComponent,
      AddCompanyComponent,
      ManageCompanyComponent,
      ManageDomainComponent,
      AddDomainComponent,
      PersonalInfoComponent,
      NomineeInfoComponent,
      BankDetailsInfoComponent,
      InsuranceInfoComponent,
      OtherInfoComponent,
      ManageSalaryStructureComponent,
      AddSalaryStructureComponent,
      ManageEmployeeSalaryComponent,
      GeneralInfoComponent,
      LoginInfoComponent,
      EmergencyInfoComponent,
      AddressInfoComponent,
      ManageTaxExemptionComponent,
      AddTaxExemptionComponent,
      ManageVehicleComponent,
      AddVehicleComponent,
      ManageUserRoleComponent,
      AddUserRoleComponent,
      AddBankComponent,
      ManageBankComponent,
      ManageGratuityRuleComponent,
      AddGratuityRuleComponent,
      AssignPackageComponent,
      AssignLeaveComponent,
      AssignShiftComponent,
      ManageYearlyRosterComponent,
      AddYearlyRosterComponent,
      ViewYearlyRosterComponent,
      ViewRosterComponent,
      AssignPermissionComponent,
      CrewPassengerDataComponent,
      ViewDocumentsComponent,
      AddCrewComponent,
      ManageCrewComponent,
      
    ],
    imports: [
        MastersRoutingModule,
        CommonModule,
        ComponentsModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        NgSelectModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
        NgxDropzoneModule,
        ToastrModule.forRoot({
          timeOut: 6000,
        })
    ],
    providers: [FormValidator, ManageCompanyComponent, AddCompanyComponent,ExportService],
    exports: [ AddCompanyComponent ]
})

export class MastersModule { }