import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddAlertComponent } from "./alerts/add-alert/add-alert.component";
import { ManageAlertComponent } from "./alerts/manage-alert/manage-alert.component";
import { AddAttendanceComponent } from "./attendance/add-attendance/add-attendance.component";
import { ManageAttendanceComponent } from "./attendance/manage-attendance/manage-attendance.component";
import { AddBankComponent } from "./bank/add-bank/add-bank.component";
import { ManageBankComponent } from "./bank/manage-bank/manage-bank.component";
import { AddBookingComponent } from "./bookings/add-booking/add-booking.component";
import { ManageBookingComponent } from "./bookings/manage-booking/manage-booking.component";
import { AddBranchComponent } from "./branch/add-branch/add-branch.component";
import { ManageBranchComponent } from "./branch/manage-branch/manage-branch.component";
import { AddCompanyComponent } from "./company/add-company/add-company.component";
import { ManageCompanyComponent } from "./company/manage-company/manage-company.component";
import { CrewPassengerDataComponent } from "./crew-passenger-data/crew-passenger-data/crew-passenger-data.component";
import { AddDepartmentComponent } from "./department/add-department/add-department.component";
import { ManageDepartmentComponent } from "./department/manage-department/manage-department.component";
import { AddDesignationComponent } from "./designation/add-designation/add-designation.component";
import { ManageDesignationComponent } from "./designation/manage-designation/manage-designation.component";
import { ManageDomainComponent } from "./domain/manage-domain/manage-domain.component";
import { AddEmployeeGradeComponent } from "./employee-grade/add-employee-grade/add-employee-grade.component";
import { ManageEmployeeGradeComponent } from "./employee-grade/manage-employee-grade/manage-employee-grade.component";
import { ManageEmployeeGroupComponent } from "./employee-group/manage-employee-group/manage-employee-group.component";
import { ManageEmployeeHealthInsuranceComponent } from "./employee-health-insurance/manage-employee-health-insurance/manage-employee-health-insurance.component";
import { ManageEmployeeSalaryComponent } from "./employee-salary/manage-employee-salary/manage-employee-salary.component";
import { ManageEmployeeSkillMapComponent } from "./employee-skill-map/manage-employee-skill-map/manage-employee-skill-map.component";
import { AddEmployeeComponent } from "./employee/add-employee/add-employee.component";
import { AssignPackageComponent } from "./employee/assign-package/assign-package.component";
import { ManageEmployeeComponent } from "./employee/manage-employee/manage-employee.component";
import { AddEmploymentTypeComponent } from "./employment-type/add-employment-type/add-employment-type.component";
import { ManageEmploymentTypeComponent } from "./employment-type/manage-employment-type/manage-employment-type.component";
import { AddGratuityRuleComponent } from "./gratuity-rule/add-gratuity-rule/add-gratuity-rule.component";
import { ManageGratuityRuleComponent } from "./gratuity-rule/manage-gratuity-rule/manage-gratuity-rule.component";
import { AddHolidayListComponent } from "./holiday-list/add-holiday-list/add-holiday-list.component";
import { ManageHolidayListComponent } from "./holiday-list/manage-holiday-list/manage-holiday-list.component";
import { ManageIncomeTaxDeductionComponent } from "./income-tax-deduction/manage-income-tax-deduction/manage-income-tax-deduction.component";
import { ManageJobApplicantComponent } from "./job-applicant/manage-job-applicant/manage-job-applicant.component";
import { AddLeaveTypeComponent } from "./leave-type/add-leave-type/add-leave-type.component";
import { ManageLeaveTypeComponent } from "./leave-type/manage-leave-type/manage-leave-type.component";
import { AddLoanTypeComponent } from "./loan-type/add-loan-type/add-loan-type.component";
import { ManageLoanTypeComponent } from "./loan-type/manage-loan-type/manage-loan-type.component";
import { AddManifestPassengerComponent } from "./manifest-passenger/add-manifest-passenger/add-manifest-passenger.component";
import { ManageManifestPassengerComponent } from "./manifest-passenger/manage-manifest-passenger/manage-manifest-passenger.component";
import { AddPackageComponent } from "./package/add-package/add-package.component";
import { ManagePackageComponent } from "./package/manage-package/manage-package.component";
import { AddReportsComponent } from "./reports/add-reports/add-reports.component";
import { ManageReportsComponent } from "./reports/manage-reports/manage-reports.component";
import { AddRigManifestComponent } from "./rig-manifest/add-rig-manifest/add-rig-manifest.component";
import { ManageRigManifestComponent } from "./rig-manifest/manage-rig-manifest/manage-rig-manifest.component";
import { AddRosterComponent } from "./roster/add-roster/add-roster.component";
import { ManageRosterComponent } from "./roster/manage-roster/manage-roster.component";
import { ViewRosterComponent } from "./roster/view-roster/view-roster.component";
import { AddSalaryCompComponent } from "./salary-comp/add-salary-comp/add-salary-comp.component";
import { ManageSalaryCompComponent } from "./salary-comp/manage-salary-comp/manage-salary-comp.component";
import { AddSalaryGradeComponent } from "./salary-grade/add-salary-grade/add-salary-grade.component";
import { ManageSalaryGradeComponent } from "./salary-grade/manage-salary-grade/manage-salary-grade.component";
import { AddSalaryStructureComponent } from "./salary-structure/add-salary-structure/add-salary-structure.component";
import { ManageSalaryStructureComponent } from "./salary-structure/manage-salary-structure/manage-salary-structure.component";
import { AddSalaryComponent } from "./salary/add-salary/add-salary.component";
import { ManageSalaryComponent } from "./salary/manage-salary/manage-salary.component";
import { AddShiftTypeComponent } from "./shift-type/add-shift-type/add-shift-type.component";
import { ManageShiftTypeComponent } from "./shift-type/manage-shift-type/manage-shift-type.component";
import { AddTaxExemptionComponent } from "./tax-exemption/add-tax-exemption/add-tax-exemption.component";
import { ManageTaxExemptionComponent } from "./tax-exemption/manage-tax-exemption/manage-tax-exemption.component";
import { AddTemplateComponent } from "./templates/add-template/add-template.component";
import { ManageTemplateComponent } from "./templates/manage-template/manage-template.component";
import { AddTrainingProgramComponent } from "./training-program/add-training-program/add-training-program.component";
import { ManageTrainingProgramComponent } from "./training-program/manage-training-program/manage-training-program.component";
import { AddUserRoleComponent } from "./user-role/add-user-role/add-user-role.component";
import { ManageUserRoleComponent } from "./user-role/manage-user-role/manage-user-role.component";
import { AddVehicleComponent } from "./vehicle/add-vehicle/add-vehicle.component";
import { ManageVehicleComponent } from "./vehicle/manage-vehicle/manage-vehicle.component";
import { ManageYearlyRosterComponent } from "./yearly-roster/manage-yearly-roster/manage-yearly-roster.component";
import { ViewYearlyRosterComponent } from "./yearly-roster/view-yearly-roster/view-yearly-roster.component";
import { ManageCrewComponent } from "./crew/manage-crew/manage-crew.component";
import { AddCrewComponent } from "./crew/add-crew/add-crew.component";


const routes: Routes = [
  {
    component: ManageEmployeeComponent,
    path: "manage-employee"
  },
  {
    component: AddEmployeeComponent,
    path: "add-employee"
  },
  {
    component: ManageEmploymentTypeComponent,
    path: "manage-employment-type"
  },
  {
    component: AddEmploymentTypeComponent,
    path: "add-employment-type"
  },
  {
    component: ManageBranchComponent,
    path: "manage-branch"
  },
  {
    component: AddBranchComponent,
    path: "add-branch"
  },
  {
    component: ManageDepartmentComponent,
    path: "manage-department"
  },
  {
    component: AddDepartmentComponent,
    path: "add-department"
  },
  {
    component: ManageDesignationComponent,
    path: "manage-designation"
  },
  {
    component: AddDesignationComponent,
    path: "add-designation"
  },
  {
    component: ManageEmployeeGradeComponent,
    path: "manage-employee-grade"
  },
  {
    component: AddEmployeeGradeComponent,
    path: "add-employee-grade"
  },
  {
    component: ManageEmployeeGroupComponent,
    path: "manage-employee-group"
  },
  {
    component: ManageEmployeeHealthInsuranceComponent,
    path: "manage-employee-health-insurance"
  },
  {
    component: ManageShiftTypeComponent,
    path: "manage-shift-type"
  },
  {
    component: AddShiftTypeComponent,
    path: "add-shift-type"
  },
  {
    component: ManageHolidayListComponent,
    path: "manage-holiday-list"
  },
  {
    component: AddHolidayListComponent,
    path: "add-holiday-list"
  },
  {
    component: ManageJobApplicantComponent,
    path: "manage-job-applicant"
  },
  {
    component: ManageTrainingProgramComponent,
    path: "manage-training-program"
  },
  {
    component: AddTrainingProgramComponent,
    path: "add-training-program"
  },
  {
    component: ManageLoanTypeComponent,
    path: "manage-loan-type"
  },
  {
    component: AddLoanTypeComponent,
    path: "add-loan-type"
  },
  {
    component: ManageTemplateComponent,
    path: "manage-template"
  },
  {
    component: AddTemplateComponent,
    path: "add-template"
  },
  {
    component: ManageAlertComponent,
    path: "manage-alert"
  },
  {
    component: AddAlertComponent,
    path: "add-alert"
  },
  {
    component: ManageRosterComponent,
    path: "manage-roster"
  },
  {
    component: AddRosterComponent,
    path: "add-roster"
  },
  {
    component: ManageIncomeTaxDeductionComponent,
    path: "manage-income-tax-deduction"
  },
  {
    component: ManageSalaryGradeComponent,
    path: "manage-salary-grade"
  },
  {
    component: AddSalaryGradeComponent,
    path: "add-salary-grade"
  },
  {
    component: ManageLeaveTypeComponent,
    path: "manage-leave-type"
  },
  {
    component: AddLeaveTypeComponent,
    path: "add-leave-type"
  },
  {
    component: ManageEmployeeSkillMapComponent,
    path: "manage-employee-skill-map"
  },
  {
    component: ManagePackageComponent,
    path: "manage-package"
  },
  {
    component: AddPackageComponent,
    path: "add-package"
  },
  {
    component: ManageManifestPassengerComponent,
    path: "manage-manifest-passenger"
  },
  {
    component: AddManifestPassengerComponent,
    path: "add-manifest-passenger"
  },
  {
    component: ManageRigManifestComponent,
    path: "manage-rig-manifest"
  },
  {
    component: AddRigManifestComponent,
    path: "add-rig-manifest"
  },
  {
    component: ManageEmployeeSalaryComponent,
    path: "manage-employee-salary"
  },
  {
    component: ManageBookingComponent,
    path: "manage-booking"
  },
  {
    component: AddBookingComponent,
    path: "add-booking"
  },
  {
    component: ManageSalaryComponent,
    path: "manage-salary"
  },
  {
    component: AddSalaryComponent,
    path: "add-salary"
  },
  {
    component: ManageSalaryCompComponent,
    path: "manage-salary-comp"
  },
  {
    component: AddSalaryCompComponent,
    path: "add-salary-comp"
  },
  {
    component: ManageReportsComponent,
    path: "manage-reports"
  },
  {
    component: AddReportsComponent,
    path: "add-reports"
  },
  {
    component: ManageAttendanceComponent,
    path: "manage-attendance"
  },
  {
    component: AddAttendanceComponent,
    path: "add-attendance"
  },
  {
    component: ManageCompanyComponent,
    path: "manage-company"
  },
  {
    component: AddCompanyComponent,
    path: "add-company"
  },
  {
    component: ManageDomainComponent,
    path: "manage-domain"
  },
  {
    component: ManageSalaryStructureComponent,
    path: "manage-salary-structure"
  },
  {
    component: AddSalaryStructureComponent,
    path: "add-salary-structure"
  },
  {
    component: ManageTaxExemptionComponent,
    path: "manage-tax-exemption"
  },
  {
    component: AddTaxExemptionComponent,
    path: "add-tax-exemption"
  },
  {
    component: ManageVehicleComponent,
    path: "manage-vehicle"
  },
  {
    component: AddVehicleComponent,
    path: "add-vehicle"
  },
  {
    component: ManageUserRoleComponent,
    path: "manage-user-role"
  },
  {
    component: AddUserRoleComponent,
    path: "add-user-role"
  },
  {
    component: ManageBankComponent,
    path: "manage-bank"
  },
  {
    component: AddBankComponent,
    path: "add-bank"
  },
  {
    component: ManageGratuityRuleComponent,
    path: "manage-gratuity-rule"
  },
  {
    component: AddGratuityRuleComponent,
    path: "add-gratuity-rule"
  },
  {
    component: ManageYearlyRosterComponent,
    path: "manage-yearly-roster"
  },
  {
    component: ViewYearlyRosterComponent,
    path: "view-yearly-roster"

  }, {
    component: ViewRosterComponent,
    path: "view-roster"
  },
  {
    component: CrewPassengerDataComponent,
    path:"crew-passenger-data"
  },
  {
    component: ManageCrewComponent,
    path: "manage-crew"
  },
  {
    component: AddCrewComponent,
    path: "add-crew"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }