import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageDesignationComponent } from '../manage-designation/manage-designation.component';
import { Router } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss'],
})
export class AddDesignationComponent implements OnInit {
  departmentId = [];
  limit = 10;
  loader: boolean = false;
  buttonLoader: boolean = false;
  buttondisable = false;
  @Input('isEdit') isEdit: boolean = false;
  id: any;
  files: File[] = [];
  preferenceKeys = PreferenceKeys;
  userData: any;
  offset: number = 0;
  isDesignation: boolean = false;
  designationForm!: FormGroup;

  constructor(
    private formValidator: FormValidator,
    private fb: FormBuilder,
    private masterService: MasterServices,
    private managedesignation: ManageDesignationComponent,
    private appPreference: AppPreference,
    public router: Router
  ) {
    this.initializeForm();
  }
  initializeForm() {
this.isEdit=false
    this.designationForm = new FormGroup({
      formName: new FormControl('designationForm'),
      job_title: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.maxLength(150),
      ]),
      // required_skill: new FormControl('', [Validators.required]),
      // department: new FormControl('', [Validators.required]),
      // job_category: new FormControl('', [Validators.required]),
      // reports_to: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }

  ngOnInit(): void {
    this.getProfile();
    this.setupEdit();
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      designation: this.appPreference.getObject(PreferenceKeys.DESIGNATION),
    };
  }

  ngOnChanges(): void {
    // console.log("this.isEdit", this.isEdit)
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
    this.managedesignation.getDesignation();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }

  job_category = [
    { name: 'Professional' },
    { name: 'Technician' },
    { name: 'Laborers' },
    { name: 'Managers' },
    { name: 'Operatives' },
  ];

  addDesignation() {
    this.buttonLoader = true;
    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      this.buttonLoader = false;
    } else {
      this.buttondisable = true;
      this.buttonLoader = true;
      var temp = {
        // "designation_department_id": this.designationForm.get('department')?.value,
        job_title: this.designationForm.get('job_title')?.value,
        // "reports_to": this.designationForm.get('reports_to')?.value,
        // "job_category": this.designationForm.get('job_category')?.value,
        description: this.designationForm.get('description')?.value,
        // "required_skill": this.designationForm.get('required_skill')?.value,
        designation_owner_id: this.userData?.data?.owner_id,
      };
      this.masterService.addDesignation(temp).subscribe({
        next: (res) => {
          this.managedesignation.getDesignation();
          this.handleSuccess('Designation Added Successfully!');
          this.reset();
          this.buttonLoader = false;
          this.isDesignation = false;
          this.buttondisable = false;
          console.log('user is not first');
          if (this.userData?.designation) {
            console.log('user is first');
            var setup = {
              id: this.userData.data.id,
              isDesignation: false,
              isFirst: false,
            };
            this.masterService.updateFirstSetup(setup).subscribe({
              next: (res: any) => {
                this.reset();
                this.appPreference.setObject(
                  this.preferenceKeys.DESIGNATION,
                  false
                );
                this.router.navigate(['/setting/first-setup']);
              },
            });
          }
        },
        error: (e: any) => {
          this.handleError(e);
          this.buttonLoader = false;
          this.buttondisable = false;
        },
      });
    }
  }

  setData(res: any) {
    this.departmentId = res.rows;
  }

  reset() {
    this.buttondisable = false;
    this.isEdit = false;
    // this.designationForm.reset();
    this.initializeForm();
    this.designationForm.patchValue({
      formName: 'designationForm',
    });
    // this.managedesignation.getDesignation()
    UIkit.modal('#add-designation').hide();
    // window.location.reload()
  }

  setupEdit() {
    this.managedesignation.editData.subscribe({
      next: (data: any) => {
        (this.id = data.id),
          (this.isEdit = true),
          // this.designationForm.get('department')?.patchValue(data.designation_department_id),
          this.designationForm.get('job_title')?.patchValue(data.job_title),
          // this.designationForm.get('reports_to')?.patchValue(data.reports_to),
          // this.designationForm.get('job_category')?.patchValue(data.job_category),
          this.designationForm.get('description')?.patchValue(data.description);
        // this.designationForm.get('required_skill')?.patchValue(data.job_title),
        //
      },
      error: (e) => {
        this.handleError(e);
        this.reset();
      },
    });
  }

  editDesignation() {
    this.buttonLoader = true;
    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      this.buttonLoader = false;
    } else {
      var temp = {
        id: this.id,
        // "designation_department_id": this.designationForm.get('department')?.value,
        job_title: this.designationForm.get('job_title')?.value,
        // "reports_to": this.designationForm.get('reports_to')?.value,
        // "job_category": this.designationForm.get('job_category')?.value,
        description: this.designationForm.get('description')?.value,
        // "required_skill": this.designationForm.get('required_skill')?.value
      };
      this.masterService.editDesignation(temp).subscribe({
        next: (res: any) => {
          this.managedesignation.getDesignation();
          this.handleSuccess('Designation Updated Successfully');
          this.reset();
          this.buttonLoader = false;
        },
        error: (e) => {
          this.handleError(e);
        },
      });
    }
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  onSelect(event: { addedFiles: any }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
