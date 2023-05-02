import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxPaginationModule } from "ngx-pagination";
import { ComponentsModule } from "src/app/components/components.module";
import { PayrollRoutingModule } from "./payroll-routing.module";
import { PayrollComponent } from "./payroll.component";
import { LoanComponent } from './loan/loan/loan.component';
import { RecordLoanComponent } from './loan/record-loan/record-loan.component';
import { FormValidator } from "src/app/shared/managers/form-validators";
import { ManageEmployeePayrollComponent } from './employees/manage-employee-payroll/manage-employee-payroll.component';
import { AddEmployeePayrollComponent } from './employees/add-employee-payroll/add-employee-payroll.component';
import { ViewEmployeePayrollComponent } from './employees/view-employee-payroll/view-employee-payroll.component';
import { PayRunComponent } from './pay-run/pay-run/pay-run.component';
import { ViewPayRunComponent } from './pay-run/view-pay-run/view-pay-run.component';
import { ProcessPayrollComponent } from './process-payroll/process-payroll/process-payroll.component';
import { ViewProcessPayrollComponent } from './process-payroll/view-process-payroll/view-process-payroll.component';
import { AddTaxDeductionGroupComponent } from './tax-deduction-group/add-tax-deduction-group/add-tax-deduction-group.component';
import { ManageTaxDeductionGroupComponent } from './tax-deduction-group/manage-tax-deduction-group/manage-tax-deduction-group.component';
import { ManageTaxDeductionItemComponent } from './tax-deduction-item/manage-tax-deduction-item/manage-tax-deduction-item.component';
import { AddTaxDeductionItemComponent } from './tax-deduction-item/add-tax-deduction-item/add-tax-deduction-item.component';
import { ManageIncomeTaxSlabComponent } from './income-tax-slab/manage-income-tax-slab/manage-income-tax-slab.component';
import { AddIncomeTaxSlabComponent } from './income-tax-slab/add-income-tax-slab/add-income-tax-slab.component';
import { ManageStateTaxSlabComponent } from './state-tax-slab/manage-state-tax-slab/manage-state-tax-slab.component';
import { AddStateTaxSlabComponent } from './state-tax-slab/add-state-tax-slab/add-state-tax-slab.component';
import { AddLwfSlabComponent } from './LWF-slab/add-lwf-slab/add-lwf-slab.component';
import { ManageLwfSlabComponent } from './LWF-slab/manage-lwf-slab/manage-lwf-slab.component';
import { PayrollConfigurationComponent } from './configuration/payroll-configuration/payroll-configuration.component';
import { ManageEmployeeProvidentFundComponent } from './employee-provident-fund/manage-employee-provident-fund/manage-employee-provident-fund.component';
import { AddEmployeeProvidentFundComponent } from './employee-provident-fund/add-employee-provident-fund/add-employee-provident-fund.component';
import { ManageEmployeeStateInsuranceComponent } from './employee-state-insurance/manage-employee-state-insurance/manage-employee-state-insurance.component';
import { AddEmployeeStateInsuranceComponent } from './employee-state-insurance/add-employee-state-insurance/add-employee-state-insurance.component';

@NgModule({
    declarations: [
        PayrollComponent,
        LoanComponent,
        RecordLoanComponent,
        ManageEmployeePayrollComponent,
        AddEmployeePayrollComponent,
        ViewEmployeePayrollComponent,
        PayRunComponent,
        ViewPayRunComponent,
        ProcessPayrollComponent,
        ViewProcessPayrollComponent,
        AddTaxDeductionGroupComponent,
        ManageTaxDeductionGroupComponent,
        ManageTaxDeductionItemComponent,
        AddTaxDeductionItemComponent,
        ManageIncomeTaxSlabComponent,
        AddIncomeTaxSlabComponent,
        ManageStateTaxSlabComponent,
        AddStateTaxSlabComponent,
        AddLwfSlabComponent,
        ManageLwfSlabComponent,
        PayrollConfigurationComponent,
        ManageEmployeeProvidentFundComponent,
        AddEmployeeProvidentFundComponent,
        ManageEmployeeStateInsuranceComponent,
        AddEmployeeStateInsuranceComponent,
    ],
    imports: [
        PayrollRoutingModule,
        CommonModule,
        ComponentsModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgSelectModule,
        NgxDropzoneModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
    providers: [FormValidator]
})

export class PayrollModule { }