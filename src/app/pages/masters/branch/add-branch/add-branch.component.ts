import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageBranchComponent } from '../manage-branch/manage-branch.component';
import { Router } from '@angular/router';
declare var UIkit: any;
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
})
export class AddBranchComponent implements OnInit {
  // @Input('isEdit') isEdit: boolean = false;
  isEdit: any;
  buttonLoader: boolean = false;
  branchFormData: any = [];
  departmentId = [];
  limit = 5;
  loader: boolean = false;
  id: any;
  companyData: any[] = [];
  isBranchDone: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  active = false;
  index: number = 0;
  branchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private masterServices: MasterServices,
    private managebranch: ManageBranchComponent,
    private appPreference: AppPreference,
    public router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.isEdit = false;
    this.branchForm = this.fb.group({
      formName: new FormControl('branchForm'),
      branch_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      branch_code: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      branch_type: new FormControl(''),
      branch_address: new FormControl(''),
      weakly_off: new FormControl(''),
      company_name: new FormControl('', [Validators.required]),
      phone_no: new FormControl(''),
      contact_person: new FormControl(''),
      branch_email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      year_of_establish: new FormControl(''),
      fax: new FormControl(''),
      branch_mobile: new FormControl('',[Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
      pan_no: new FormControl('', [

        Validators.maxLength(10),
        Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
      ]),
      header: new FormControl(''),
      cst: new FormControl(''),
      excise_registration: new FormControl(''),
      footer: new FormControl(''),
      associate_user: new FormControl(''),
      associate_warehouse: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getProfile();
    this.getDepartment();
    this.setupEdit();
    this.getCompany();
  }

  currentTab: String = '';

  setCurrentTab(ind: any) {
    switch (ind) {
      case 0:
        this.currentTab = 'branch-info';
        this.index = 0;
        this.active = true;
        break;
      case 1:
        this.currentTab = 'tax-info';
        this.index = 1;
        this.active = true;
        break;
      case 2:
        this.currentTab = 'warehouse-info';
        this.index = 2;
        this.active = true;
        break;
      default:
        break;
    }
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      branch: this.appPreference.getObject(PreferenceKeys.BRANCH),
    };
  }

  type = [{ name: 'Dependent' }, { name: 'Independent' }];

  weak_of = [{ days: '1' }, { days: '2' }];

  contactPerson = [{ person: 'person_1' }, { person: 'person_2' }];

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
    this.managebranch.getBranch();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }

  getCompany() {
    var temp = {
      where: false,
      limit: this.limit,
      offset: 0,
      company_owner_id: this.userData?.data?.owner_id,
    };
    this.masterServices.getCompany(temp).subscribe({
      next: (res: any) => {
        this.companyData = res.company.rows;
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }

  addBranch() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      this.handleError('Please Fill All Mandatory Field');
    } else {
      this.buttonLoader = true;
      var temp = {
        branch_name: this.branchForm.get('branch_name')?.value,
        branch_code: this.branchForm.get('branch_code')?.value,
        branch_type: this.branchForm.get('branch_type')?.value,
        branch_address: this.branchForm.get('branch_address')?.value,
        weakly_off: this.branchForm.get('weakly_off')?.value,
        company_name: this.branchForm.get('company_name')?.value,
        phone_no: this.branchForm.get('phone_no')?.value,
        contact_person: this.branchForm.get('contact_person')?.value,
        branch_email: this.branchForm.get('branch_email')?.value,
        year_of_establish:
          this.branchForm.get('year_of_establish')?.value || null,
        fax: this.branchForm.get('fax')?.value,
        branch_mobile: this.branchForm.get('branch_mobile')?.value,
        pan_no: this.branchForm.get('pan_no')?.value,
        header: this.branchForm.get('header')?.value,
        cst: this.branchForm.get('cst')?.value,
        excise_registration: this.branchForm.get('excise_registration')?.value,
        footer: this.branchForm.get('footer')?.value,
        associate_user: this.branchForm.get('associate_user')?.value,
        associate_warehouse: this.branchForm.get('associate_warehouse')?.value,
        branch_owner_id: this.userData?.data?.owner_id,
      };
      this.masterServices.addBranch(temp).subscribe({
        next: (response: any) => {
          this.buttonLoader = false;
          this.isBranchDone = false;
          console.log('user is not first');
          if (this.userData.branch) {
            console.log('user is first');
            var setup = {
              id: this.userData.data.id,
              isBranch: false,
            };
            this.masterServices.updateFirstSetup(setup).subscribe({
              next: (res: any) => {
                this.reset();
                this.appPreference.setObject(this.preferenceKeys.BRANCH, false);
                this.router.navigate(['/setting/first-setup']);
              },
            });
          }

          setTimeout(() => {
            this.handleSuccess('Branch Added Successfully');
            this.reset();
            this.formData(response);
          }, 1000);
        },
        error: (e: any) => {
          this.handleError('server error');
        },
      });
    }
  }

  formData(response: any) {
    this.branchFormData = response['createBranch'];
    console.log(this.branchFormData);
  }

  getDepartment() {
    var temp = {
      where: false,
      limit: this.limit,
      offset: 0,
      department_owner_id: this.userData?.data?.owner_id,
    };
    this.masterServices.getDepartment(temp).subscribe({
      next: (res: any) => {
        this.setData(res.department);
        // this.handleSuccess(res);
        this.reset();
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  setupEdit() {
    this.managebranch.editData.subscribe({
      next: (data: any) => {
        console.log(data);
        this.id = data.id;
        this.branchForm.patchValue(data);
        this.isEdit = this.appPreference.getObject(PreferenceKeys.ISEDIT);
      },
      error: (e) => {
        this.handleError(e);
        this.reset();
      },
    });
  }

  eidtBranch() {
    this.buttonLoader = true;
    console.log(this.branchForm.get('pan_no')?.value);
    console.log(
      "this.branchForm.get('weakly_off')?.value,",
      this.branchForm.get('weakly_off')?.value
    );
    var temp = {
      id: this.id,
      branch_name: this.branchForm.get('branch_name')?.value,
      branch_code: this.branchForm.get('branch_code')?.value,
      branch_type: this.branchForm.get('branch_type')?.value,
      branch_address: this.branchForm.get('branch_address')?.value,
      weakly_off: this.branchForm.get('weakly_off')?.value,
      company_name: this.branchForm.get('company_name')?.value,
      phone_no: this.branchForm.get('phone_no')?.value,
      contact_person: this.branchForm.get('contact_person')?.value,
      branch_email: this.branchForm.get('branch_email')?.value,
      year_of_establish: this.branchForm.get('year_of_establish')?.value,
      fax: this.branchForm.get('fax')?.value,
      branch_mobile: this.branchForm.get('branch_mobile')?.value,
      pan_no: this.branchForm.get('pan_no')?.value,
      header: this.branchForm.get('header')?.value,
      cst: this.branchForm.get('cst')?.value,
      excise_registration: this.branchForm.get('excise_registration')?.value,
      footer: this.branchForm.get('footer')?.value,
      associate_user: this.branchForm.get('associate_user')?.value,
      associate_warehouse: this.branchForm.get('associate_warehouse')?.value,
      branch_owner_id: this.userData?.data?.owner_id,
    };
    console.log('temp====', temp);
    this.masterServices.editBranch(temp).subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this.handleSuccess('Branch Update Successfully');
          this.reset();
          this.buttonLoader = false;
          this.formData(response);
        }, 1000);
      },
      error: (e: any) => {
        this.handleError('server error');
      },
    });
  }

  reset() {
    this.setCurrentTab(0);
    // this.isEdit = false;
    this.initializeForm();

    this.isEdit = this.appPreference.setObject(
      this.preferenceKeys.ISEDIT,
      false
    );
    // this.branchForm.reset();
    this.branchForm.patchValue({
      formName: 'branchForm',
    });
    UIkit.modal('#add-branch').hide();
  }

  setData(res: any) {
    this.departmentId = res.rows;
  }

  getError(formGroup: FormGroup, controlName: any) {
    // console.log(controlName)
    // console.log(formGroup)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }
}
