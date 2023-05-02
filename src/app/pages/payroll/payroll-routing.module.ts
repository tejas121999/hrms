import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PayrollConfigurationComponent } from "./configuration/payroll-configuration/payroll-configuration.component";
import { ManageEmployeeProvidentFundComponent } from "./employee-provident-fund/manage-employee-provident-fund/manage-employee-provident-fund.component";
import { ManageEmployeeStateInsuranceComponent } from "./employee-state-insurance/manage-employee-state-insurance/manage-employee-state-insurance.component";
import { ManageEmployeePayrollComponent } from "./employees/manage-employee-payroll/manage-employee-payroll.component";
import { ViewEmployeePayrollComponent } from "./employees/view-employee-payroll/view-employee-payroll.component";
import { ManageIncomeTaxSlabComponent } from "./income-tax-slab/manage-income-tax-slab/manage-income-tax-slab.component";
import { LoanComponent } from "./loan/loan/loan.component";
import { ManageLwfSlabComponent } from "./LWF-slab/manage-lwf-slab/manage-lwf-slab.component";
import { PayRunComponent } from "./pay-run/pay-run/pay-run.component";
import { ViewPayRunComponent } from "./pay-run/view-pay-run/view-pay-run.component";
import { PayrollComponent } from "./payroll.component";
import { ProcessPayrollComponent } from "./process-payroll/process-payroll/process-payroll.component";
import { ViewProcessPayrollComponent } from "./process-payroll/view-process-payroll/view-process-payroll.component";
import { ManageStateTaxSlabComponent } from "./state-tax-slab/manage-state-tax-slab/manage-state-tax-slab.component";
import { ManageTaxDeductionGroupComponent } from "./tax-deduction-group/manage-tax-deduction-group/manage-tax-deduction-group.component";
import { ManageTaxDeductionItemComponent } from "./tax-deduction-item/manage-tax-deduction-item/manage-tax-deduction-item.component";

const routes: Routes = [
    {
        path: 'payroll', 
        component: PayrollComponent
    },
    {
        path:"loan",
        component:LoanComponent
    },
    {
        path:"manage-employee-payroll",
        component:ManageEmployeePayrollComponent
    },
    {
        path:"view-employee-payroll",
        component:ViewEmployeePayrollComponent
    },
    {
        path:"pay-run",
        component:PayRunComponent
    },
    {
        path:"view-pay-run",
        component:ViewPayRunComponent
    },
    {
        path:"process-payroll",
        component:ProcessPayrollComponent
    },
    {
        path:"view-process-payroll",
        component:ViewProcessPayrollComponent
    },
    {
        path:"manage-tax-deduction-group",
        component:ManageTaxDeductionGroupComponent
    },
    {
        path:"manage-tax-deduction-item",
        component:ManageTaxDeductionItemComponent
    },
    {
        path:"manage-income-tax-slab",
        component:ManageIncomeTaxSlabComponent
    },
    {
        path:"manage-state-tax-slab",
        component:ManageStateTaxSlabComponent
    },
    {
        path:"manage-lwf-slab",
        component:ManageLwfSlabComponent
    },
    {
        path:"payroll-configuration",
        component:PayrollConfigurationComponent
    },
    {
        path:"manage-employee-provident-fund",
        component:ManageEmployeeProvidentFundComponent
    },
    {
        path:"manage-employee-state-insurance",
        component:ManageEmployeeStateInsuranceComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PayrollRoutingModule { }