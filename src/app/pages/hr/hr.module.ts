import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NgxDropzoneModule } from "ngx-dropzone";
import { NgxPaginationModule } from "ngx-pagination";
import { ComponentsModule } from "src/app/components/components.module";
import { HrRoutingModule } from "./hr-routing.module";
import { HrComponent } from "./hr.component";
import { ManageCandidateComponent } from './candidate/manage-candidate/manage-candidate.component';
import { AddCandidateComponent } from './candidate/add-candidate/add-candidate.component';
import { AddExitDetailComponent } from './exit-detail/add-exit-detail/add-exit-detail.component';
import { ManageExitDetailComponent } from './exit-detail/manage-exit-detail/manage-exit-detail.component';
import { ManageCandidateExitDetailComponent } from './candidate-exit-detail/manage-candidate-exit-detail/manage-candidate-exit-detail.component';
import { AddCandidateExitDetailComponent } from './candidate-exit-detail/add-candidate-exit-detail/add-candidate-exit-detail.component';

@NgModule({
    declarations: [
        HrComponent,
        ManageCandidateComponent,
        AddCandidateComponent,
        AddExitDetailComponent,
        ManageExitDetailComponent,
        ManageCandidateExitDetailComponent,
        AddCandidateExitDetailComponent
    ],
    imports: [
        HrRoutingModule,
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
    providers: []
})

export class HrModule { }