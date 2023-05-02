import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageCandidateComponent } from '../manage-candidate/manage-candidate.component';
declare var UIkit: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private ManageCandidate: ManageCandidateComponent
  ) { }
  currentTab: String = '';
  buttonLoader: boolean = false;
  index: number = 0;
  active = false;
  userData: any;
  message: string = '';
  date: any = new Date();
  Countries: any = [];
  state: any = [];
  city: any = [];
  pCountries: any = [];
  pstate: any = [];
  pcity: any = [];
  tCountries: any = [];
  tstate: any = [];
  tcity: any = [];
  create_emp: boolean = false
  buttondisable = false;
  minimumDate: any = new Date(
    this.date.toLocaleString('default', { month: 'short' }) +
    ' ' +
    this.date.getDate() +
    ', ' +
    (this.date.getFullYear() - 18)
  );
  @Input('isEdit') isEdit: boolean = false;
  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
    this.getCountries();
    this.tgetCountries();
    this.pgetCountries();
    this.sameAsPermenent();
    this.sameAsCommunication();
  }

  worke_experience = [
    { type: '0 yrs' },
    { type: '1 yrs' },
    { type: '2 yrs' },
    { type: '3 yrs' },
    { type: '4 yrs' },
    { type: '5 yrs' },
    { type: '6 yrs' },
    { type: '7 yrs' },
    { type: '8 yrs' },
    { type: '9 yrs' },
    { type: '10 yrs' },
    { type: '11 yrs' },
    { type: '12 yrs' },
    { type: '13 yrs' },
    { type: '14 yrs' },
    { type: '15 yrs' },
    { type: '16 yrs' },
    { type: '17 yrs' },
    { type: '18 yrs' },
    { type: '19 yrs' },
    { type: '20 yrs' },
    { type: '21 yrs' },
    { type: '22 yrs' },
    { type: '23 yrs' },
    { type: '24 yrs' },
    { type: '25 yrs' },
    { type: '26 yrs' },
    { type: '27 yrs' },
    { type: '28 yrs' },
    { type: '29 yrs' },
    { type: '30 yrs' },
    { type: '31 yrs' },
    { type: '32 yrs' },
    { type: '33 yrs' },
    { type: '34 yrs' },
    { type: '35 yrs' },
    { type: '36 yrs' },
    { type: '37 yrs' },
    { type: '38 yrs' },
    { type: '39 yrs' },
    { type: '40 yrs' },
    { type: '41 yrs' },
    { type: '42 yrs' },
    { type: '43 yrs' },
    { type: '44 yrs' },
    { type: '45 yrs' },
  ];

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  getError(formGroup: FormGroup, controlName: any) {
    // this.formValidator.getErrorForControl(formGroup, controlName);
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  cdGeneralForm: any = new FormGroup({
    formName: new FormControl('cdGeneralForm'),
    title: new FormControl("", [Validators.required]),
    first_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    middle_name: new FormControl(''),
    last_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    // emp_id: new FormControl(''),
    // emp_type: new FormControl(''),
    // crew_type: new FormControl(''),
    // emp_status: new FormControl(''),
    // emp_classification: new FormControl(''),
    // crew_grp: new FormControl(''),
    company_name: new FormControl(''),
    // company_type: new FormControl(''),
    work_email_id: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    // manager_name: new FormControl(''),
    // attendance_code: new FormControl(''),
    // remark: new FormControl('')
  })

  cdPersonalForm: any = new FormGroup({
    formName: new FormControl('cdPersonalForm'),
    // email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    mobile_no: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
    date_of_birth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    nationality: new FormControl(''),
    religion: new FormControl(''),
    marital_status: new FormControl(''),
    blood_grp: new FormControl(''),
    language: new FormControl(''),
    // no_of_dependent: new FormControl(''),
    // safety_shoe_size: new FormControl(''),
    // domestic_airport: new FormControl(''),
    // international_airport: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl(''),
    permanent_address: new FormControl(''),

    // common address
    comm_address: new FormControl(''),
    comm_country: new FormControl(''),
    comm_city: new FormControl(''),
    comm_destrict: new FormControl(''),
    comm_zip: new FormControl(''),
    comm_state: new FormControl(''),
    // temperary address
    temp_country: new FormControl(''),
    temp_city: new FormControl(''),
    temp_destrict: new FormControl(''),
    temp_zip: new FormControl(''),
    temp_state: new FormControl(''),
    temporary_address: new FormControl(''),
    Same_as_Temporary: new FormControl(''),
    Same_as_Permanent: new FormControl('')
  })

  cdProfessionalForm: any = new FormGroup({
    formName: new FormControl('cdProfessionalForm'),
    experience: new FormControl(''),
    location: new FormControl(''),
    source_of_hire: new FormControl(''),
    skill_set: new FormControl(''),
    department: new FormControl(''),
    designation: new FormControl(''),
    current_salary: new FormControl(''),
    highest_qualification: new FormControl(''),
    tentative_joining_date: new FormControl('', [Validators.required]),
  })

  // cdNomineeForm = new FormGroup({
  //   formName: new FormControl('cdNomineeForm'),
  //   nominee_name: new FormControl(''),
  //   relation_with_employee: new FormControl(''),
  //   nominee_email: new FormControl(''),
  //   nominee_mobile: new FormControl(''),
  //   nominee_address: new FormControl(''),
  //   nominee_telephone: new FormControl(''),
  //   upload_nominee: new FormControl(''),
  //   mark_as_emergency: new FormControl(''),
  //   emergency_name: new FormControl(''),
  //   emergency_relation_with_employee: new FormControl(''),
  //   emergency_telephone: new FormControl(''),
  //   emergency_mobile: new FormControl(''),
  //   emergency_address: new FormControl(''),
  //   emergency_email: new FormControl('')
  // })

  // cdBankForm = new FormGroup({
  //   formName: new FormControl('cdBankForm'),
  //   bank_name: new FormControl(''),
  //   bank_address: new FormControl(''),
  //   branch: new FormControl(''),
  //   account_no: new FormControl('')
  // })

  // cdClientForm = new FormGroup({
  //   formName: new FormControl('cdClientForm'),
  //   cv_approval: new FormControl(''),
  //   cv_upload: new FormControl(''),
  //   smartcard_approval: new FormControl(''),
  //   smartcard_upload: new FormControl('')
  // })

  cdOtherForm: any = new FormGroup({
    formName: new FormControl('cdOtherForm'),
    pan_no: new FormControl(''),
    upload_pan: new FormControl(''),
    aadhar_no: new FormControl(''),
    upload_aadhar: new FormControl(''),
    // passport_no: new FormControl(''),
    // restriction_on_passport: new FormControl(''),
    // passport_date_of_issue: new FormControl(''),
    // passport_date_of_expiry: new FormControl(''),
    // place_of_issue: new FormControl(''),
    // place_of_birth: new FormControl(''),
    // passport_type: new FormControl(''),
    // upload_passport: new FormControl(''),
    // issued_by: new FormControl(''),
    // smartcard_issued: new FormControl(''),
    // cdc_no: new FormControl(''),
    // cdc_date_of_issue: new FormControl(''),
    // cdc_date_of_expiry: new FormControl(''),
    // upload_cdc: new FormControl('')
  })

  reset() {
    this.isEdit = false
    this.cdGeneralForm.reset()
    this.cdPersonalForm.reset()
    this.cdProfessionalForm.reset()
    this.cdOtherForm.reset()
    this.ManageCandidate.getCandidate()
    UIkit.modal("#add-candidate").hide();
    window.location.reload()
  }

  title = [
    { title: "Ms." },
    { title: "Mr." },
    { title: "Mrs." }
  ]
  users = [
    { id: 'anjmao', name: 'Anjmao' },
    { id: 'varnas', name: 'Tadeus Varnas' }
  ];

  gender = [{ type: 'Male' }, { type: 'Female' }, { type: 'Other' }];

  blood_groop = [
    { type: 'A+' },
    { type: 'A-' },
    { type: 'B+' },
    { type: 'B-' },
    { type: 'AB+' },
    { type: 'AB-' },
    { type: 'O+' },
    { type: 'O-' },
  ];

  marital_status = [
    { status: 'Married' },
    { status: 'Unmarried' },
    { status: 'Divorced' },
    { status: 'Seperated' },
  ];

  addCustomUser = (term: any) => ({ id: term, name: term });

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  addCandidate() {
    if (this.cdGeneralForm.invalid || this.cdPersonalForm.invalid || this.cdOtherForm.invalid || this.cdProfessionalForm.invalid) {
      this.cdGeneralForm.markAllAsTouched()
      this.cdPersonalForm.markAllAsTouched()
      this.cdOtherForm.markAllAsTouched()
      this.cdProfessionalForm.markAllAsTouched()
    } else {
      var temp: any = {
        "candidate": {
          ...this.cdGeneralForm.value,
          ...this.cdPersonalForm.value,
          ...this.cdProfessionalForm.value,
          ...this.cdOtherForm.value
        }
      }
      temp.candidate.candidate_owner_id = this.userData?.data?.owner_id
      console.log(temp)
      this.masterService.addCandiate(temp).subscribe({
        next: (res: any) => {
          this.handleSuccess("added successfully")
          this.reset()
        }, error: (e: any) => {
          if (e.status === 400) {
            this.handleError(e.error.message)
          } else {
            this.handleError("server error")
          }
        }
      })
    }
  }
  candidate_id: any
  setupEdit() {
    this.ManageCandidate.editData.subscribe((data: any) => {
      console.log(data.id)
      this.isEdit = true
      this.candidate_id = data.id
      this.cdGeneralForm.patchValue(data)
      this.cdPersonalForm.patchValue(data)
      this.cdProfessionalForm.patchValue(data)
      this.cdOtherForm.patchValue(data)
    })
  }

  editCandadit() {
    var temp: any = {
      "candidate_id": this.candidate_id,
      "candidate": {
        ...this.cdGeneralForm.value,
        ...this.cdPersonalForm.value,
        ...this.cdProfessionalForm.value,
        ...this.cdOtherForm.value
      }
    }
    this.masterService.editCandadit(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Update Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError("server error")
      }
    })
  }

  getCountries() {
    var temp = {};
    this.masterService.getCountries(temp).subscribe({
      next: (res: any) => {
        this.Countries = res.countries;
      },
    });
  }

  getcountryid(e: any) {
    var temp = {
      id: e.id,
    };
    this.masterService.getState(temp).subscribe({
      next: (res: any) => {
        this.state = res.countries;
      },
    });
  }

  getstateid(e: any) {
    console.log(e.id);
    var temp = {
      id: e.id,
    };
    this.masterService.getCity(temp).subscribe({
      next: (res: any) => {
        console.log(res);

        this.city = res.countries;
      },
    });
  }

  pgetCountries() {
    var temp = {};
    this.masterService.getCountries(temp).subscribe({
      next: (res: any) => {
        this.pCountries = res.countries;
      },
    });
  }

  pgetcountryid(e: any) {
    var temp = {
      id: e.id,
    };
    this.masterService.getState(temp).subscribe({
      next: (res: any) => {
        this.pstate = res.countries;
      },
    });
  }

  pgetstateid(e: any) {
    console.log(e.id);
    var temp = {
      id: e.id,
    };
    this.masterService.getCity(temp).subscribe({
      next: (res: any) => {
        console.log(res);

        this.pcity = res.countries;
      },
    });
  }

  tgetCountries() {
    var temp = {};
    this.masterService.getCountries(temp).subscribe({
      next: (res: any) => {
        this.tCountries = res.countries;
      },
    });
  }

  tgetcountryid(e: any) {
    var temp = {
      id: e.id,
    };
    this.masterService.getState(temp).subscribe({
      next: (res: any) => {
        this.tstate = res.countries;
      },
    });
  }

  tgetstateid(e: any) {
    console.log(e.id);
    var temp = {
      id: e.id,
    };
    this.masterService.getCity(temp).subscribe({
      next: (res: any) => {
        console.log(res);

        this.tcity = res.countries;
      },
    });
  }

  sameAsPermenent() {
    this.cdPersonalForm.get("Same_as_Permanent")?.valueChanges.subscribe((data: any) => {
      var permanent_address: any = this.cdPersonalForm.get('permanent_address')?.value;
      var country: any = this.cdPersonalForm.get('country')?.value;
      var state: any = this.cdPersonalForm.get('state')?.value;
      var district: any = this.cdPersonalForm.get('district')?.value;
      var city: any = this.cdPersonalForm.get('city')?.value;
      var zipcode: any = this.cdPersonalForm.get('zipcode')?.value;
      if (data) {
        this.cdPersonalForm
          .get('temporary_address')
          ?.patchValue(permanent_address);
        this.cdPersonalForm.get('temp_country')?.patchValue(country);
        this.cdPersonalForm.get('temp_state')?.patchValue(state);
        this.cdPersonalForm.get('temp_destrict')?.patchValue(district);
        this.cdPersonalForm.get('temp_city')?.patchValue(city);
        this.cdPersonalForm.get('temp_zip')?.patchValue(zipcode);
      } else {
        this.cdPersonalForm.get('temporary_address')?.reset();
        this.cdPersonalForm.get('temp_country')?.reset();
        this.cdPersonalForm.get('temp_state')?.reset();
        this.cdPersonalForm.get('temp_destrict')?.reset();
        this.cdPersonalForm.get('temp_city')?.reset();
        this.cdPersonalForm.get('temp_zip')?.reset();
      }
    })
  }

  sameAsCommunication() {
    this.cdPersonalForm
      .get('Same_as_Temporary')
      ?.valueChanges.subscribe((data: any) => {
        var comm_address: any = this.cdPersonalForm.get('comm_address')?.value;
        var comm_country: any = this.cdPersonalForm.get('comm_country')?.value;
        var comm_city: any = this.cdPersonalForm.get('comm_city')?.value;
        var comm_destrict: any = this.cdPersonalForm.get('comm_destrict')?.value;
        var comm_zip: any = this.cdPersonalForm.get('comm_zip')?.value;
        var comm_state: any = this.cdPersonalForm.get('comm_state')?.value;
        if (data) {
          this.cdPersonalForm.get('permanent_address')?.patchValue(comm_address);
          this.cdPersonalForm.get('country')?.patchValue(comm_country);
          this.cdPersonalForm.get('state')?.patchValue(comm_state);
          this.cdPersonalForm.get('district')?.patchValue(comm_destrict);
          this.cdPersonalForm.get('city')?.patchValue(comm_city);
          this.cdPersonalForm.get('zipcode')?.patchValue(comm_zip);
        } else {
          this.cdPersonalForm.get('permanent_address')?.reset();
          this.cdPersonalForm.get('country')?.reset();
          this.cdPersonalForm.get('state')?.reset();
          this.cdPersonalForm.get('district')?.reset();
          this.cdPersonalForm.get('city')?.reset();
          this.cdPersonalForm.get('zipcode')?.reset();
        }
      });
  }

  setCurrentTab(ind: any) {
    console.log(ind);

    switch (ind) {
      case 0:
        this.currentTab = 'general-info';
        this.index = 0;
        this.active = true;
        break;
      case 1:
        this.currentTab = 'personal-info';
        this.index = 1;
        this.active = true;
        break;
      case 2:
        this.currentTab = 'professional-info';
        this.index = 2;
        this.active = true;
        break;
      case 3:
        this.currentTab = 'other-info';
        this.index = 3;
        this.active = true;
        break;
      default:
        this.currentTab = 'general-info';
        this.index = 0;
        this.active = true;
        break;
    }
  }

  createEmp(event: any) {
    console.log(event.currentTarget.checked)
    this.create_emp = event.currentTarget.checked
    Swal.fire({
      title: 'Are you sure?',
      text: "Do You Want To Make This Candidate as Employee ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      console.log(result.isConfirmed)
      if (result.isConfirmed) {
        var temp = {
          "id": this.candidate_id
        }

        this.masterService.addCandidateAsEmployee(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Candidate',
              'has been converted successfully.',
              'success'
            )
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      } else {
        this.create_emp = !this.create_emp
      }
    })
  }
}
