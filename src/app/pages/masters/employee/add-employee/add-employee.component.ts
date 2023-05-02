import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { Router } from '@angular/router';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
import Swal from 'sweetalert2';
// import { FILE_UPLOAD_LIMIT, FOLDERS, supportedFileTypes } from 'src/app/shared/config/config';
// import { firstValueFrom } from 'rxjs' ;
import { DmsService } from 'src/app/services/dms.service';
import * as moment from 'moment';
declare var UIkit: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;
  @Input() bankData: any;
  buttonLoader: boolean = false;
  buttondisable = false;
  step = 1;
  defaultShift: any;
  usersToggle = false;
  limit: any = 100;
  currentDate = new Date();
  selectedDoc: any;
  empCodeId: any;
  PAN: any;
  companyData: any[] = [];
  designationData: any[] = [];
  departmentData: any[] = [];
  branchData: any[] = [];
  empId: any;
  workingEmail = false;
  disableNext: boolean = false;
  disablePrev: boolean = true;
  userData: any;
  preferenceKeys = PreferenceKeys;
  creat_user: boolean = false;
  getPackageofEmp: any[] = [];
  currentPage: number = 1;
  count: any;
  toggleCount = 0;
  employeeShift: any = [];
  employeePAckageData: any;
  leaveData: any[] = [];
  leaveEmpData: any[] = [];
  message: string = '';
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({ year: this.year, month: this.month, day: this.day }).format('YYYY-MM-DD');
  maxDate = moment({ year: this.year, month: this.month + 3, day: this.day }).format('YYYY-MM-DD');
  date: any = new Date();
  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = moment({ year: this.year, month: this.month, day: this.day }).format('YYYY-MM-DD');
  maxDate = moment({ year: this.year, month: this.month +3, day: this.day }).format('YYYY-MM-DD');
  minimumDate: any = new Date(
    this.date.toLocaleString('default', { month: 'short' }) +
    ' ' +
    this.date.getDate() +
    ', ' +
    (this.date.getFullYear() - 18)
  );
  index: number = 0;
  empType = false;
  active = false;
  create_user_check: boolean = false;
  access: any;
  workLocations: any;
  Countries: any = [];
  state: any = [];
  city: any = [];
  currentTab: String = '';
  accountNumber: string = '';
  pCountries: any = [];
  pstate: any = [];
  pcity: any = [];
  tCountries: any = [];
  tstate: any = [];
  tcity: any = [];
  files: any[] = [];
  aadharFile: any;
  panFile: any;
  passportFile: any;
  cdcFile: any;
  cvFile: any;
  smartcardFile: any;
  nomineeFile: any;
  generalForm!: FormGroup;
  personalForm!: FormGroup;
  nomineeForm!: FormGroup;
  bankDetailsInfoForm!: FormGroup;
  otherInfoForm!: FormGroup;
  clientInfoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private ManageEmployee: ManageEmployeeComponent,
    private dmsService: DmsService
  ) {
    this.initializeForm();
  }
  ngOnInit(): void {
    console.log("minDate", this.minDate)
    console.log("maxDate", this.maxDate)
    this.getProfile();
    this.getCountries();
    // this.attendanceConfiguration() ;
    //attendanceConfiguration
    this.tgetCountries();
    this.pgetCountries();


    // this.generalForm.get('manager_name')?.disable()
  }
  initializeForm() {
    this.isEdit = false
    this.generalForm = this.fb.group({
      formName: new FormControl('generalForm'),
      title: new FormControl('', [Validators.required]),
      first_name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      middle_name: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      emp_id: new FormControl(''),
      emp_type: new FormControl('', [Validators.required]),
      crew_type: new FormControl(''),
      company_type: new FormControl(''),
      manager_name: new FormControl(''),
      employee_status: new FormControl(''),
      employee_classification: new FormControl(''),
      company_id: new FormControl('', [Validators.required]),
      attendance_code: new FormControl(''),
      probation_period: new FormControl(''),
      remark: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      working_location: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      work_emailId: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      date_of_joining: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      department_id: new FormControl('', [Validators.required]),
      designation_id: new FormControl(''),
      branch_id: new FormControl(''),
      emp_role: new FormControl('', [Validators.required]),
    });
    this.personalForm = this.fb.group({
      formName: new FormControl('personalForm'),
      languages: new FormControl(''),
      date_of_birth: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      marital_status: new FormControl(''),
      gender: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      personal_email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      blood_group: new FormControl(''),
      mobile_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[6-9]{1}[0-9]{9}$'),
      ]),
      highest_qualification: new FormControl(''),
      work_experience: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      religion: new FormControl('', [
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      no_of_dependency: new FormControl(''),
      safty_shoe_size: new FormControl(''),
      nearest_domestic_airport: new FormControl(''),
      nearest_internatinal_airport: new FormControl(''),
      // address
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      zipcode: new FormControl('', [Validators.required]),
      permanent_address: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),

      // common address
      comm_address: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      comm_country: new FormControl('', [Validators.required]),
      comm_city: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      comm_destrict: new FormControl('', [Validators.required]),
      comm_zip: new FormControl('', [Validators.required]),
      comm_state: new FormControl('', [Validators.required]),
      // temperary address
      temp_country: new FormControl(''),
      temp_city: new FormControl(''),
      temp_destrict: new FormControl(''),
      temp_zip: new FormControl(''),
      temp_state: new FormControl(''),
      temporary_address: new FormControl(''),
      Same_as_Permanent: new FormControl(''),
      Same_as_Temporary: new FormControl(''),
    });

    this.nomineeForm = this.fb.group({
      formName: new FormControl('nomineeForm'),
      nominee_address: new FormControl(''),
      nominee_mobile_no: new FormControl(''),
      nominee_email: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      relation_with_employee: new FormControl(''),
      nominee_name: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      nominee_telephone_no: new FormControl(''),
      upload_nominee_form: new FormControl(''),
      // emergency
      emergency_name: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      emergency_relation_employee: new FormControl(''),
      emergency_telephone_no: new FormControl(''),
      emergency_cellphone_no: new FormControl(''),
      emergency_address: new FormControl(''),
      emergency_Email: new FormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      make_this_as_emergency: new FormControl(''),
    });
    this.bankDetailsInfoForm = this.fb.group({
      formName: new FormControl('bankDetailsInfoForm'),
      bank_name: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      IFSC_code: new FormControl(''),
      account_no: new FormControl(''),
      branch: new FormControl(''),
      address: new FormControl(''),
    });
    this.otherInfoForm = this.fb.group({
      formName: new FormControl('otherInfoForm'),
      pan_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
      ]),
      upload_pan: new FormControl(''),
      aadhar_no: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^[0-9]{12}'),
      ]),
      upload_aadhar: new FormControl(''),
      passport_no: new FormControl('', [
        Validators.pattern('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$'),
      ]),
      restriction_passport: new FormControl(''),
      date_of_issue: new FormControl(''),
      date_of_expiry: new FormControl(''),
      place_of_issue: new FormControl(''),
      place_of_birth: new FormControl(''),
      passport_type: new FormControl(''),
      upload_passport: new FormControl(''),
      issued_by: new FormControl(''),
      smartcard_issued: new FormControl(''),
      cdc_no: new FormControl(''),
      cdc_date_of_issue: new FormControl(''),
      cdc_date_of_expiry: new FormControl(''),
      upload_cdc: new FormControl(''),
    });
    this.clientInfoForm = this.fb.group({
      formName: new FormControl('clientInfoForm'),
      cv_approvel: new FormControl(''),
      cv_uploade: new FormControl(''),
      smartcard_approvel: new FormControl(''),
      smartcard_upload: new FormControl(''),
    });
    this.setCurrentTab(0);
    this.sameAsPermenent();
    this.sameAsCommunication();
  }

  attendanceConfiguration() {
    let temp = {
      owner_id: this.userData?.data?.owner_id,
      company_id: this.userData?.data?.company_id,
    };
    this.masterService.attendanceConfiguration(temp).subscribe({
      next: (res: any) => {
        console.log('res.configuration.shift', res.configuration.shift);

        console.log(res?.configuration?.shift?.sc_10);

        this.defaultShift;
      },
      error: (e: any) => {
        this.handleError(e.error.message);
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void { }
  getEmpCode() {
    var temp = {
      user_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getEmpCode(temp).subscribe({
      next: (res: any) => {
        if (res.data.length === 0) {
          this.empCodeId = 'emp-' + 1;
        } else {
          var emp_id = res.data.length + 1;
          this.empCodeId = 'emp-' + emp_id;
        }
      },
      error: (e: any) => {
        this.handleError(e.error.message);
      },
    });
  }
  deleteAssignLEave(id: any) {
    console.log(id);
    var temp = {
      id: id,
    };
    this.masterService.deleteAsignLeave(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess('Deleted Successfully');
        this.reset();
      },
      error: (e: any) => {
        console.log(e.error.message);
        this.handleError(e.error.message);
      },
    });
  }

  setEmail(event: any) {
    console.log('eventse', event.target.value);
    let text = event.target.value;
    var setEmail = text.split('@');
    console.log('setEmail====', setEmail[1]);
    if (setEmail[1] == 'gmail.com' || setEmail[1] == 'yahoo.com' || setEmail[1] == 'outlook.com' || setEmail[1] == 'aol.com' || setEmail[1] == 'proton.com' || setEmail[1] == 'tutanota.com' || setEmail[1] == 'yandex.com' || setEmail[1] == 'zoho.com' || setEmail[1] == 'icloud.com' || setEmail[1] == 'hotmail.com' || setEmail[1] == 'yopmail.com') {
      this.workingEmail = true;
    } else {
      this.workingEmail = false;
    }
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
    this.getEmpCode();
    this.getCompany();
    this.getDesignation();
    this.getDepartment();
    this.getBranch();
    this.setUpEdit();
    this.sameAsPermenent();
    this.sameAsCommunication();
    this.makeThisAsEmergency();
    this.getRole();
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
        this.currentTab = 'nominee-info';
        this.index = 2;
        this.active = true;
        break;
      case 3:
        this.currentTab = 'bank-info';
        this.index = 3;
        this.active = true;
        break;
      case 4:
        this.currentTab = 'client-info';
        this.index = 4;
        this.active = true;
        break;
      case 5:
        this.currentTab = 'other-info';
        this.index = 5;
        this.active = true;
        break;
      case 6:
        this.currentTab = 'shift-info';
        this.index = 6;
        this.active = true;
        break;
      case 7:
        this.currentTab = 'leave-info';
        this.index = 7;
        this.active = true;
        break;

      case 8:
        this.currentTab = 'package-info';
        this.index = 8;
        this.active = true;
        break;
      default:
        this.currentTab = 'general-info';
        this.index = 0;
        this.active = true;
        break;
    }
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

  createUser(event: any) {
    this.usersToggle = event.currentTarget.checked;

    this.toggleCount = 1;

    this.creat_user = event.currentTarget.checked;
    console.log('', event.currentTarget.checked);
    console.log('this.creat_user', this.creat_user);
    if (this.creat_user) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Would you like to make this employee as user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result: any) => {
        console.log('login data', result);
        console.log('this.creat_user', this.create_user_check);
        if (!result.isConfirmed) {
          this.creat_user = !this.creat_user
        }
      });
    } else if (!this.creat_user) {
      Swal.fire({
        // title: 'Are you sure?',
        text: 'This will be effective only for employee',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result: any) => {
        if (!result.isConfirmed) {
          this.creat_user = !this.creat_user
        }
      });
    }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }

  // prepareFilesList(files: Array<any>, type: string) {
  //   for (const items of files) {
  //     if (files.length > 0) {
  //       const file = items;
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         items.base64 = reader.result?.toString().split(",")[1];
  //       };
  //       // this.files.push(items);

  //       // Diffrentiate type of file
  //       if (type == "aadhar") {
  //         this.aadharFile = items
  //       } else if (type == "pan") {
  //         this.panFile = items
  //       } else if (type == "passport") {
  //         this.passportFile = items
  //       } else if (type == "cdc") {
  //         this.cdcFile = items
  //       } else if (type == "cv") {
  //         this.cvFile = items
  //       } else if (type == "smartcard") {
  //         this.smartcardFile = items
  //       } else if (type == "nominee") {
  //         this.nomineeFile = items
  //       }

  //       console.log("aadhar card", typeof this.aadharFile)
  //       console.log("pan card", this.panFile)
  //       console.log("passport", this.passportFile)
  //       console.log("cdc", this.cdcFile)
  //       console.log("cv", this.cvFile)
  //       console.log("smartcard", this.smartcardFile)
  //       console.log("nominee", this.nomineeFile)
  //     } else {
  //       this.appPreference.showWarning("Please upload a file");
  //     }
  //   }
  // }

  // // Pass file, type
  // uploadFile(event: any, type: string) {
  //   const files = event.target.files;
  //   const fileArray = Array.from(files).filter(function (obj: any) {
  //     return obj.size <= FILE_UPLOAD_LIMIT && supportedFileTypes.includes(obj.type);
  //   });
  //   const rejectedFiles = Array.from(files).filter(function (obj: any) {
  //     return obj.size > FILE_UPLOAD_LIMIT || !supportedFileTypes.includes(obj.type);
  //   });

  //   if (rejectedFiles.length > 0) {
  //     var result = rejectedFiles.map(function (e: any) {
  //       return e.name;
  //     }).join(', ');
  //     this.appPreference.showWarning(`Following files are above 10MB or not supported: ${result}`);
  //   }
  //   this.prepareFilesList(fileArray, type);
  //   console.log("events", files)
  // }

  disableButton: boolean = false;


  async addEmployee() {
    this.buttondisable = false;
    this.buttonLoader = false;
    if (
      this.generalForm.invalid ||
      this.personalForm.invalid ||
      this.nomineeForm.invalid ||
      this.bankDetailsInfoForm.invalid ||
      this.clientInfoForm.invalid ||
      this.workingEmail
    ) {
      this.generalForm.markAllAsTouched();
      this.personalForm.markAllAsTouched();
      this.nomineeForm.markAllAsTouched();
      this.bankDetailsInfoForm.markAllAsTouched();
      this.clientInfoForm.markAllAsTouched();
      this.otherInfoForm.markAllAsTouched();
      this.disableButton = true;
      this.buttonLoader = false;

      if (!this.message) {
        this.handleError(
          'Some of the fields are missing please check your employee form'
        );
        return;
      } else {
        this.handleError(this.message);
        return;
      }
      return;
    } else {
      this.disableButton = false;
      this.buttonLoader = true;
      console.log('account no', this.accountNumber);
      var temp: any = {
        employee: {
          Same_as_Permanent: this.personalForm.get('Same_as_Permanent')?.value,
          Same_as_Temporary: this.personalForm.get('Same_as_Temporary')?.value,
          title: this.generalForm.get('title')?.value,
          first_name: this.generalForm.get('first_name')?.value,
          middle_name: this.generalForm.get('middle_name')?.value,
          last_name: this.generalForm.get('last_name')?.value,
          // emp_id: this.generalForm.get('emp_id')?.value,
          emp_type: this.generalForm.get('emp_type')?.value,
          crew_type: this.generalForm.get('crew_type')?.value,
          company_type: this.generalForm.get('company_type')?.value,
          manager_name: this.generalForm.get('manager_name')?.value,
          employee_status: this.generalForm.get('employee_status')?.value,
          employee_classification: this.generalForm.get(
            'employee_classification'
          )?.value,
          company_id: this.generalForm.get('company_id')?.value || null,
          attendance_code: this.generalForm.get('attendance_code')?.value,
          probation_period: this.generalForm.get('probation_period')?.value,
          remark: this.generalForm.get('remark')?.value,
          working_location: this.generalForm.get('working_location')?.value,
          work_email: this.generalForm.get('work_emailId')?.value,
          date_of_joining:
            this.generalForm.get('date_of_joining')?.value || null,
          department_id: this.generalForm.get('department_id')?.value || null,
          designation_id: this.generalForm.get('designation_id')?.value || null,
          emp_role: this.generalForm.get('emp_role')?.value || null,
          // branch_id: this.generalForm.get("branch_id")?.value,
          languages: this.personalForm.get('languages')?.value,
          date_of_birth: this.personalForm.get('date_of_birth')?.value || null,
          nationality: this.personalForm.get('nationality')?.value,
          marital_status: this.personalForm.get('marital_status')?.value,
          gender: this.personalForm.get('gender')?.value,
          email: this.personalForm.get('personal_email')?.value,
          blood_group: this.personalForm.get('blood_group')?.value,
          mobile_no: this.personalForm.get('mobile_no')?.value,
          highest_qualification: this.personalForm.get('highest_qualification')
            ?.value,
          work_experience: this.personalForm.get('work_experience')?.value,
          religion: this.personalForm.get('religion')?.value,
          no_of_dependency: this.personalForm.get('no_of_dependency')?.value,
          personal_telephone: this.personalForm.get('telephone')?.value,
          safty_shoe_size: this.personalForm.get('safty_shoe_size')?.value,
          nearest_domestic_airport: this.personalForm.get(
            'nearest_domestic_airport'
          )?.value,
          nearest_internatinal_airport: this.personalForm.get(
            'nearest_internatinal_airport'
          )?.value,
          country: this.personalForm.get('country')?.value,
          state: this.personalForm.get('state')?.value,
          district: this.personalForm.get('district')?.value,
          city: this.personalForm.get('city')?.value,
          zipcode: this.personalForm.get('zipcode')?.value,
          temp_country: this.personalForm.get('temp_country')?.value,
          temp_city: this.personalForm.get('temp_city')?.value,
          temp_destrict: this.personalForm.get('temp_destrict')?.value,
          temp_zip: this.personalForm.get('temp_zip')?.value,
          temp_state: this.personalForm.get('temp_state')?.value,
          permanent_address: this.personalForm.get('permanent_address')?.value,
          temporary_address: this.personalForm.get('temporary_address')?.value,
          comm_address: this.personalForm.get('comm_address')?.value,
          comm_country: this.personalForm.get('comm_country')?.value,
          comm_city: this.personalForm.get('comm_city')?.value,
          comm_destrict: this.personalForm.get('comm_destrict')?.value,
          comm_zip: this.personalForm.get('comm_zip')?.value,
          comm_state: this.personalForm.get('comm_state')?.value,
          nominee_address: this.nomineeForm.get('nominee_address')?.value,
          nominee_mobile_no: this.nomineeForm.get('nominee_mobile_no')?.value,
          nominee_email: this.nomineeForm.get('nominee_email')?.value,
          relation_with_employee: this.nomineeForm.get('relation_with_employee')
            ?.value,
          nominee_name: this.nomineeForm.get('nominee_name')?.value,
          nominee_telephone_no: this.nomineeForm.get('nominee_telephone_no')
            ?.value,
          upload_nominee_form: this.nomineeForm.get('upload_nominee_form')
            ?.value,
          emergency_name: this.nomineeForm.get('emergency_name')?.value,
          emergency_relation_employee: this.nomineeForm.get(
            'emergency_relation_employee'
          )?.value,
          emergency_telephone_no: this.nomineeForm.get('emergency_telephone_no')
            ?.value,
          emergency_cellphone_no: this.nomineeForm.get('emergency_cellphone_no')
            ?.value,
          emergency_address: this.nomineeForm.get('emergency_address')?.value,
          emergency_Email: this.nomineeForm.get('emergency_Email')?.value,
          bank_name: this.bankDetailsInfoForm.get('bank_name')?.value,
          account_no: this.accountNumber,
          bank_branch: this.bankDetailsInfoForm.get('branch')?.value,
          bank_address: this.bankDetailsInfoForm.get('address')?.value,
          pan_no: this.otherInfoForm.get('pan_no')?.value,
          upload_pan: this.otherInfoForm.get('upload_pan')?.value,
          aadhar_no: this.otherInfoForm.get('aadhar_no')?.value,
          upload_aadhar: this.otherInfoForm.get('upload_aadhar')?.value,
          passport_no: this.otherInfoForm.get('passport_no')?.value,
          restriction_passport: this.otherInfoForm.get('restriction_passport')
            ?.value,
          date_of_issue: this.otherInfoForm.get('date_of_issue')?.value || null,
          date_of_expiry:
            this.otherInfoForm.get('date_of_expiry')?.value || null,
          place_of_issue: this.otherInfoForm.get('place_of_issue')?.value,
          place_of_birth:
            this.otherInfoForm.get('place_of_birth')?.value || null,
          passport_type: this.otherInfoForm.get('passport_type')?.value,
          upload_passport: this.otherInfoForm.get('upload_passport')?.value,
          issued_by: this.otherInfoForm.get('issued_by')?.value,
          smartcard_issued: this.otherInfoForm.get('smartcard_issued')?.value,
          cdc_no: this.otherInfoForm.get('cdc_no')?.value,
          cdc_date_of_issue:
            this.otherInfoForm.get('cdc_date_of_issue')?.value || null,
          cdc_date_of_expiry:
            this.otherInfoForm.get('cdc_date_of_expiry')?.value || null,
          upload_cdc: this.otherInfoForm.get('upload_cdc')?.value,
          cv_approvel: this.clientInfoForm.get('cv_approvel')?.value,
          cv_uploade: this.clientInfoForm.get('cv_uploade')?.value,
          smartcard_approvel:
            this.clientInfoForm.get('smartcard_approvel')?.value,
          smartcard_upload: this.clientInfoForm.get('smartcard_upload')?.value,
          user_owner_id: this.userData?.data?.owner_id,
          create_user_check: this.creat_user,
        },
      };

      //   const folderData = {
      //     folderName: FOLDERS.EMPLOYEE
      //   }

      //   // fetching id from folder
      //   const folderResult: any = await firstValueFrom(this.dmsService.getFolder(folderData))

      //   console.log(folderResult);

      //   const folderId = folderResult.result[0].id

      //   // uploading Files
      //   if (this.panFile === undefined) {
      //     const panData = new FormData();
      //     panData.append("document", this.panFile, "document")
      //     const panResult: any = await firstValueFrom(this.dmsService.upload(panData, folderId))
      //     console.log("panResult", panResult);
      //     temp.employee.upload_pan = panResult?.result
      //   }

      //   if(this.aadharFile === undefined){
      //     const aadharData = new FormData();
      //     aadharData.append("document", this.aadharFile, "document")
      //     console.log("type of", typeof this.aadharFile);
      //     const aadharResult: any = await firstValueFrom(this.dmsService.upload(aadharData, folderId))
      //     console.log("aadharResult", aadharResult)
      //     temp.employee.upload_aadhar = aadharResult?.result
      //   }

      //   if(this.passportFile === undefined){
      //     const passportData = new FormData();
      //     passportData.append("document", this.passportFile, "document")
      //     const passportResult: any = await firstValueFrom(this.dmsService.upload(passportData, folderId))
      //     console.log("passportResult", passportResult);
      //     temp.employee.upload_passport = passportResult?.result
      //   }

      //  if(this.cdcFile === undefined){
      //   const cdcData = new FormData();
      //   cdcData.append("document", this.cdcFile, "document")
      //   const cdcResult: any = await firstValueFrom(this.dmsService.upload(cdcData, folderId))
      //   console.log("cdcResult", cdcResult);
      //   temp.employee.upload_cdc = cdcResult?.result
      //  }

      //   if(this.cvFile === undefined){
      //     const cvData = new FormData();
      //     cvData.append("document", this.cvFile, "document")
      //     const cvResult: any = await firstValueFrom(this.dmsService.upload(cvData, folderId))
      //     console.log("cvResult", cvResult);
      //     temp.employee.cv_uploade = cvResult?.result
      //   }

      //   if(this.smartcardFile === undefined){
      //     const smartcardData = new FormData();
      //     smartcardData.append("document", this.smartcardFile, "document")
      //     const smartcardResult: any = await firstValueFrom(this.dmsService.upload(smartcardData, folderId))
      //     console.log("smartcardResult", smartcardResult);
      //     temp.employee.smartcard_upload = smartcardResult?.result
      //   }

      //   if(this.nomineeFile === undefined){
      //     const nomineeData = new FormData();
      //     nomineeData.append("document", this.nomineeFile, "document")
      //     const nomineeResult: any = await firstValueFrom(this.dmsService.upload(nomineeData, folderId))
      //     console.log("nomineeResult", nomineeResult);
      //     temp.employee.upload_nominee_form = nomineeResult?.result
      //   }

      //   console.log("aadhar", this.aadharFile)

      this.masterService.addEmployee(temp).subscribe({
        next: (res: any) => {
          console.log(res.create_employee.id);

          // this.handleSuccess(this.personalForm.get('work_emailId')?.value)
          console.log(this.access);
          delete this.access.id;
          Object.keys(this.access).forEach((data: any) => {
            if (data === 'role_id') {
              // access["role_id"] = null
              this.access.emp_id = res.create_employee.id;
            }
            console.log(typeof data);
          });

          var temp = {
            access: this.access,
          };
          this.masterService.addAccess(temp).subscribe({
            next: (res: any) => {
              console.log('success');
            },
            error: (err: any) => {
              console.log('error');
            },
          });
          if (this.creat_user == true) {
            this.createEmpAsUser(res.create_employee.id);
          } else {
            this.ManageEmployee.getEmployee();
            this.handleSuccess('User Created Successfully');
            setTimeout(() => {
              Swal.fire(
                'Warning!',
                'Please make sure to enter the leave and shift details before proceeding to the employee information..',
                'warning'
              );
            }, 2000);
          }
          this.reset();
          this.buttonLoader = false;
        },
        error: (e: any) => {
          console.log('error', e.error.message);
          if (e.status == 400) {
            this.handleError(e.error.message);
          } else if (e.status == 500) {
            this.handleError('Internal Serever Error');
          }
          this.buttonLoader = false;
        },
      });
    }
  }

  employeeRole(event: any) {
    var temp = {
      role_id: event.id,
    };
    this.masterService.clone(temp).subscribe({
      next: (res: any) => {
        console.log(res.clone);
        // res.clone.array.forEach((element: any) => {
        //     console.log(element)
        // });
        this.access = res.clone;
        console.log(this.access);
        if (this.isEdit) {
          delete this.access.id;
          Object.keys(this.access).forEach((data: any) => {
            if (data === 'role_id') {
              // access["role_id"] = null
              this.access.emp_id = this.empId;
            }
            console.log(typeof data);
          });

          var temp = {
            access: this.access,
          };
          this.masterService.addAccess(temp).subscribe({
            next: (res: any) => {
              console.log('success');
            },
            error: (err: any) => {
              console.log('error');
            },
          });
        }
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }

  createEmpAsUser(id: any) {
    var createUser = {
      owner_id: this.userData?.data?.owner_id,
      user_emp_ID: id,
      first_name: this.generalForm.get('first_name')?.value,
      last_name: this.generalForm.get('last_name')?.value,
      mobile_no: this.personalForm.get('mobile_no')?.value,
      company_id: this.generalForm.get('company_id')?.value || null,
      work_email: this.generalForm.value.work_emailId,
      user_role: this.generalForm.value.emp_role,
      leave_config_id: this.userData?.data?.leave_config_id,
      attendence_config_id: this.userData?.data?.attendence_config_id,
      department_id: this.generalForm.value.department_id,
      user_type: 'user',
      isFirst: false,
      isCompany: false,
      isBranch: false,
      isDepartment: false,
      isDesignation: false,
      password: 'admin@123',
    };
    console.log(createUser);
    this.masterService.createUser(createUser).subscribe({
      next: (res: any) => {
        this.handleSuccess('User Created Successfully');
      },
      error: (e: any) => {
        this.handleError('server error');
      },
    });
  }

  deleteEmpAsUser() {
    console.log('delete user');
    var temp = {
      id: this.empId,
    };
    this.masterService.deletebyuser(temp).subscribe({
      next: (res: any) => {
        console.log('delete user');
      },
      error: (e: any) => {
        this.handleError(e.error.message);
      },
    });
  }

  getEmp(e: any) {
    this.workLocations = '';
    if (e.type === 'Crew' || e.type === 'Expat') {
      this.empType = true;
    } else {
      this.empType = false;
    }
  }

  async editUser() {
    this.buttonLoader = true;
    if (
      this.generalForm.invalid ||
      this.personalForm.invalid ||
      this.nomineeForm.invalid ||
      this.bankDetailsInfoForm.invalid ||
      this.clientInfoForm.invalid ||
      this.clientInfoForm.invalid
    ) {
      console.log(
        this.generalForm.invalid,
        this.personalForm.invalid,
        this.nomineeForm.invalid,
        this.bankDetailsInfoForm.invalid,
        this.clientInfoForm.invalid,
        this.clientInfoForm.invalid
      );
      this.generalForm.markAllAsTouched();
      this.personalForm.markAllAsTouched();
      this.nomineeForm.markAllAsTouched();
      this.bankDetailsInfoForm.markAllAsTouched();
      this.clientInfoForm.markAllAsTouched();
      this.otherInfoForm.markAllAsTouched();
      this.disableButton = true;
      this.buttonLoader = false;
    } else {
      var temp: any = {
        emp_id: this.empId,
        employee: {
          Same_as_Permanent: this.personalForm.get('Same_as_Permanent')?.value,
          Same_as_Temporary: this.personalForm.get('Same_as_Temporary')?.value,
          title: this.generalForm.get('title')?.value,
          first_name: this.generalForm.get('first_name')?.value,
          middle_name: this.generalForm.get('middle_name')?.value,
          last_name: this.generalForm.get('last_name')?.value,
          emp_id: this.generalForm.get('emp_id')?.value,
          emp_type: this.generalForm.get('emp_type')?.value,
          crew_type: this.generalForm.get('crew_type')?.value,
          company_type: this.generalForm.get('company_type')?.value,
          manager_name: this.generalForm.get('manager_name')?.value,
          employee_status: this.generalForm.get('employee_status')?.value,
          employee_classification: this.generalForm.get(
            'employee_classification'
          )?.value,
          company_id: this.generalForm.get('company_id')?.value,
          attendance_code: this.generalForm.get('attendance_code')?.value,
          probation_period: this.generalForm.get('probation_period')?.value,
          working_location: this.generalForm.get('working_location')?.value,
          work_email: this.generalForm.get('work_emailId')?.value,
          date_of_joining:
            this.generalForm.get('date_of_joining')?.value || null,
          department_id: this.generalForm.get('department_id')?.value,
          designation_id: this.generalForm.get('designation_id')?.value,
          remark: this.generalForm.get('remark')?.value,
          emp_role: this.generalForm.get('emp_role')?.value || null,
          // branch_id: this.generalForm.get("branch_id")?.value,
          languages: this.personalForm.get('languages')?.value,
          date_of_birth: this.personalForm.get('date_of_birth')?.value || null,
          nationality: this.personalForm.get('nationality')?.value,
          marital_status: this.personalForm.get('marital_status')?.value,
          gender: this.personalForm.get('gender')?.value,
          email: this.personalForm.get('personal_email')?.value,
          blood_group: this.personalForm.get('blood_group')?.value,
          mobile_no: this.personalForm.get('mobile_no')?.value,
          highest_qualification: this.personalForm.get('highest_qualification')
            ?.value,
          work_experience: this.personalForm.get('work_experience')?.value,
          religion: this.personalForm.get('religion')?.value,
          no_of_dependency: this.personalForm.get('no_of_dependency')?.value,
          personal_telephone: this.personalForm.get('telephone')?.value,
          safty_shoe_size: this.personalForm.get('safty_shoe_size')?.value,
          nearest_domestic_airport: this.personalForm.get(
            'nearest_domestic_airport'
          )?.value,
          nearest_internatinal_airport: this.personalForm.get(
            'nearest_internatinal_airport'
          )?.value,
          country: this.personalForm.get('country')?.value,
          state: this.personalForm.get('state')?.value,
          district: this.personalForm.get('district')?.value,
          city: this.personalForm.get('city')?.value,
          zipcode: this.personalForm.get('zipcode')?.value,
          temp_country: this.personalForm.get('temp_country')?.value,
          temp_city: this.personalForm.get('temp_city')?.value,
          temp_destrict: this.personalForm.get('temp_destrict')?.value,
          temp_zip: this.personalForm.get('temp_zip')?.value,
          temp_state: this.personalForm.get('temp_state')?.value,
          permanent_address: this.personalForm.get('permanent_address')?.value,
          temporary_address: this.personalForm.get('temporary_address')?.value,
          comm_address: this.personalForm.get('comm_address')?.value,
          comm_country: this.personalForm.get('comm_country')?.value,
          comm_city: this.personalForm.get('comm_city')?.value,
          comm_destrict: this.personalForm.get('comm_destrict')?.value,
          comm_zip: this.personalForm.get('comm_zip')?.value,
          comm_state: this.personalForm.get('comm_state')?.value,
          nominee_address: this.nomineeForm.get('nominee_address')?.value,
          nominee_mobile_no: this.nomineeForm.get('nominee_mobile_no')?.value,
          nominee_email: this.nomineeForm.get('nominee_email')?.value,
          relation_with_employee: this.nomineeForm.get('relation_with_employee')
            ?.value,
          nominee_name: this.nomineeForm.get('nominee_name')?.value,
          nominee_telephone_no: this.nomineeForm.get('nominee_telephone_no')
            ?.value,
          upload_nominee_form: this.nomineeForm.get('upload_nominee_form')
            ?.value,
          emergency_name: this.nomineeForm.get('emergency_name')?.value,
          emergency_relation_employee: this.nomineeForm.get(
            'emergency_relation_employee'
          )?.value,
          emergency_telephone_no: this.nomineeForm.get('emergency_telephone_no')
            ?.value,
          emergency_cellphone_no: this.nomineeForm.get('emergency_cellphone_no')
            ?.value,
          emergency_address: this.nomineeForm.get('emergency_address')?.value,
          emergency_Email: this.nomineeForm.get('emergency_Email')?.value,
          bank_name: this.bankDetailsInfoForm.get('bank_name')?.value,
          account_no: this.bankDetailsInfoForm.get('account_no')?.value,
          bank_branch: this.bankDetailsInfoForm.get('branch')?.value,
          bank_address: this.bankDetailsInfoForm.get('address')?.value,
          pan_no: this.otherInfoForm.get('pan_no')?.value,
          upload_pan: this.otherInfoForm.get('upload_pan')?.value,
          aadhar_no: this.otherInfoForm.get('aadhar_no')?.value,
          upload_aadhar: this.otherInfoForm.get('upload_aadhar')?.value,
          passport_no: this.otherInfoForm.get('passport_no')?.value,
          restriction_passport: this.otherInfoForm.get('restriction_passport')
            ?.value,
          date_of_issue: this.otherInfoForm.get('date_of_issue')?.value || null,
          date_of_expiry:
            this.otherInfoForm.get('date_of_expiry')?.value || null,
          place_of_issue: this.otherInfoForm.get('place_of_issue')?.value,
          place_of_birth:
            this.otherInfoForm.get('place_of_birth')?.value || null,
          passport_type: this.otherInfoForm.get('passport_type')?.value,
          upload_passport: this.otherInfoForm.get('upload_passport')?.value,
          issued_by: this.otherInfoForm.get('issued_by')?.value,
          smartcard_issued: this.otherInfoForm.get('smartcard_issued')?.value,
          cdc_no: this.otherInfoForm.get('cdc_no')?.value,
          cdc_date_of_issue:
            this.otherInfoForm.get('cdc_date_of_issue')?.value || null,
          cdc_date_of_expiry:
            this.otherInfoForm.get('cdc_date_of_expiry')?.value || null,
          upload_cdc: this.otherInfoForm.get('upload_cdc')?.value,
          cv_approvel: this.clientInfoForm.get('cv_approvel')?.value,
          cv_uploade: this.clientInfoForm.get('cv_uploade')?.value,
          smartcard_approvel:
            this.clientInfoForm.get('smartcard_approvel')?.value,
          smartcard_upload: this.clientInfoForm.get('smartcard_upload')?.value,
          user_owner_id: this.userData?.data?.owner_id,
          create_user_check: this.creat_user,
        },
      };
      console.log(temp);

      // const folderData = {
      //   folderName: FOLDERS.EMPLOYEE
      // }

      // // fetching id from folder
      // const folderResult: any = await firstValueFrom(this.dmsService.getFolder(folderData))

      // console.log(folderResult);

      // const folderId = folderResult.result[0].id

      // // uploading Files
      // const panData = new FormData();
      // panData.append("document", this.panFile, "document")
      // const panResult: any = await firstValueFrom(this.dmsService.upload(panData, folderId))
      // console.log("panResult", panResult);

      // const aadharData = new FormData();
      // aadharData.append("document", this.aadharFile, "document")
      // console.log("type of", typeof this.aadharFile);
      // const aadharResult: any = await firstValueFrom(this.dmsService.upload(aadharData, folderId))
      // console.log("aadharResult", aadharResult)

      // const passportData = new FormData();
      // passportData.append("document", this.passportFile, "document")
      // const passportResult: any = await firstValueFrom(this.dmsService.upload(passportData, folderId))
      // console.log("passportResult", passportResult);

      // const cdcData = new FormData();
      // cdcData.append("document", this.cdcFile, "document")
      // const cdcResult: any = await firstValueFrom(this.dmsService.upload(cdcData, folderId))
      // console.log("cdcResult", cdcResult);

      // const cvData = new FormData();
      // cvData.append("document", this.cvFile, "document")
      // const cvResult: any = await firstValueFrom(this.dmsService.upload(cvData, folderId))
      // console.log("cvResult", cvResult);

      // const smartcardData = new FormData();
      // smartcardData.append("document", this.smartcardFile, "document")
      // const smartcardResult: any = await firstValueFrom(this.dmsService.upload(smartcardData, folderId))
      // console.log("smartcardResult", smartcardResult);

      // const nomineeData = new FormData();
      // nomineeData.append("document", this.nomineeFile, "document")
      // const nomineeResult: any = await firstValueFrom(this.dmsService.upload(nomineeData, folderId))
      // console.log("nomineeResult", nomineeResult);

      // temp.employee.upload_aadhar = aadharResult.result
      // temp.employee.upload_pan = panResult.result
      // temp.employee.upload_passport = passportResult.result
      // temp.employee.upload_cdc = cdcResult.result
      // temp.employee.cv_uploade = cvResult.result
      // temp.employee.smartcard_upload = smartcardResult.result
      // temp.employee.upload_nominee_form = nomineeResult.result

      console.log("aadhar", this.aadharFile)


      this.masterService.editEmployee(temp).subscribe({
        next: (res) => {
          this.ManageEmployee.getEmployee();
          this.handleSuccess('Employee Edit Successfully');
          this.setCurrentTab(0);
          this.buttonLoader = false;
          // var temp = {
          //     "user_emp_ID": this.empId,
          //     "user_role": this.generalForm.get("emp_role")?.value || null,
          // }
          // this.masterService.updateRoleByEmpId(temp).subscribe({
          //     next: (res: any) => {
          //         console.log("Role Update Successfully")
          //     }, error: (e: any) => {
          //         this.handleError("Internal Serever Error")
          //     }
          // })

          if (this.creat_user == true && this.toggleCount == 0) {
            var temp2 = {
              user_emp_ID: this.empId,
              // "user_role": this.generalForm.get("emp_role")?.value || null,
              // "department_id": this.generalForm.get("department_id")?.value || null,
              // "work_email": this.generalForm.value.work_emailId,
              first_name: this.generalForm.get('first_name')?.value,
              last_name: this.generalForm.get('last_name')?.value,
              mobile_no: this.personalForm.get('mobile_no')?.value,
              company_id: this.generalForm.get('company_id')?.value || null,
              work_email: this.generalForm.value.work_emailId,
              user_role: this.generalForm.value.emp_role || null,
              leave_config_id: this.userData?.data?.leave_config_id || null,
              attendence_config_id:
                this.userData?.data?.attendence_config_id || null,
              department_id: this.generalForm.value.department_id || null,
            };
            this.masterService.updateSetup(temp2).subscribe({
              next: (res: any) => {
                console.log('Role Update Successfully');
                console.log('success');
              },
              error: (e: any) => {
                // this.handleError("Internal Serever Error"
                console.log('error');
              },
            });
          } else if (this.creat_user == false && this.toggleCount == 0) {
            console.log('none');
          } else if (this.usersToggle == false && this.toggleCount == 1) {
            console.log('delete function');
            this.deleteEmpAsUser();
          } else if (this.usersToggle == true && this.toggleCount == 1) {
            console.log('create function');
            this.createEmpAsUser(this.empId);
          } else {
            this.toggleCount = 0;
          }
          // var setup = {
          // "id": this.userData.data.id,
          // "user_role": this.generalForm.get("emp_role")?.value || null,
          // }
          // this.masterService.updateSetup(setup).subscribe({
          // next: (res: any) => {
          // this.reset();
          // }
          // })
          this.reset();
          this.toggleCount = 0;
        },
        error: (e: any) => {
          this.handleError('Internal Serever Error');
          this.buttonLoader = false;
        },
      });
      // this.index = 0;

      this.setCurrentTab(this.index);
    }
  }

  getManagerName() {
    var temp = {
      id: this.generalForm.get('department_id')?.value,
    };
    this.masterService.getDepartmentById(temp).subscribe({
      next: (res: any) => {
        console.log(res.department[0].manager_data.first_name);
        this.generalForm
          .get('manager_name')
          ?.patchValue(res.department[0].manager_data.first_name);
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }

  reset() {
    this.creat_user = false;
    this.setCurrentTab(0);
    this.step = 1;
    this.isEdit = false;
    this.buttonLoader = false;
    // this.generalForm.reset();
    // this.personalForm.reset();
    // this.nomineeForm.reset();
    // this.bankDetailsInfoForm.reset();
    // this.clientInfoForm.reset();
    // this.otherInfoForm.reset();
    this.initializeForm();
    this.generalForm.patchValue({
      formName: 'generalForm',
    });
    this.nomineeForm.patchValue({
      formName: 'nomineeForm',
    });
    this.bankDetailsInfoForm.patchValue({
      formName: 'bankDetailsInfoForm',
    });
    this.bankDetailsInfoForm.patchValue({
      formName: 'bankDetailsInfoForm',
    });
    this.clientInfoForm.patchValue({
      formName: 'clientInfoForm',
    });
    this.otherInfoForm.patchValue({
      formName: 'otherInfoForm',
    });
    this.ManageEmployee.getEmployee();

    UIkit.modal('#add-employee').hide();
    this.getEmpCode();
  }
  getError(formGroup: FormGroup, controlName: any) {
    this.message = this.formValidator.getErrorForControl(
      formGroup,
      controlName
    );

    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  work_location = [{ name: 'Base' }, { name: 'Rig' }, { name: 'Yard' }];

  doc = [
    { id: 1, name: 'PAN Card' },
    { id: 2, name: 'Aadhar Card' },
    { id: 3, name: 'Passport' },
    { id: 4, name: 'CDC' },
  ];

  probation_period = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
    { name: '5' },
    { name: '6' },
    { name: '7' },
    { name: '8' },
    { name: '9' },
    { name: '10' },
    { name: '11' },
    { name: '12' },
  ];

  title = [{ title: 'Ms.' }, { title: 'Mr.' }, { title: 'Mrs.' }];

  emp_type = [
    { type: 'Staff' },
    { type: 'Crew' },
    // { type: "Expat" }
  ];

  company_type = [
    { type: 'Private Limited Company' },
    { type: 'Public Limited Company' },
    { type: 'Limited By Shares' },
    { type: 'Limited by Guarantee' },
    { type: 'Micro Companies' },
    { type: 'Small Companies' },
    { type: 'Medium Companies' },
  ];

  crew_type = [
    { type: 'National Crew' },
    { type: 'Catering Crew' },
    { type: 'Expat' },
  ];

  emp_status = [{ type: 'Current' }, { type: 'Resigned' }];

  emp_classification = [
    { type: 'Current Opening' },
    { type: 'Assistant Driller' },
    { type: 'Assistant Subsea Engineer' },
    { type: 'Ballast Control Operator' },
    { type: 'Barge Master' },
    { type: 'Bosun' },
    { type: 'Captain' },
    { type: 'Chief Electrician' },
    { type: 'Chief Electrician (Marine)' },
    { type: 'Cheif Machanic' },
    { type: 'Crane Operator' },
    { type: 'Deck Pusher' },
    { type: 'Derrickman' },
    { type: 'DP Supervisor' },
    { type: 'DP Technician' },
    { type: 'Driller' },
    { type: 'Drilling Manager' },
    { type: 'Electrician' },
    { type: 'Floor Man/ Roughneck' },
    { type: 'Marine Engineer Officer' },
    { type: 'Material Coordinator' },
    { type: 'Mechanic' },
    { type: 'Medic' },
    { type: 'Motorman/Oiler' },
    { type: 'Navigational Watch Keeping Officer' },
    { type: 'Offshore Installation Manager' },
    { type: 'Painter' },
    { type: 'Pumpman' },
    { type: 'QHSE Manager' },
    { type: 'Radio Officer' },
    { type: 'Rig Manager' },
    { type: 'Roustabout' },
    { type: 'ROV Supervisor' },
    { type: 'ROV Technician' },
    { type: 'Safety & Training Coordinator' },
    { type: 'Seaman' },
    { type: 'Solids Control Engineer' },
    { type: 'Sr. Contract & Project Manager' },
    { type: 'Sr. Drilling Manager' },
    { type: 'Sr. Infrastructure & Logistic Manager' },
    { type: 'Store Keeper' },
    { type: 'Subsea Engineer' },
    { type: 'Toolpusher' },
    { type: 'Welder' },
  ];

  marital_status = [
    { status: 'Married' },
    { status: 'Unmarried' },
    { status: 'Divorced' },
    { status: 'Seperated' },
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

  relation = [
    { name: 'Self' },
    { name: 'Father' },
    { name: 'Mother' },
    { name: 'Son' },
    { name: 'Daughter' },
    { name: 'Brother' },
    { name: 'Sister' },
    { name: 'Grand Father' },
    { name: 'Grand Mother' },
    { name: 'Husband' },
    { name: 'Wife' },
    { name: 'Uncle' },
    { name: 'Aunt' },
    { name: 'Son in Law' },
    { name: 'Daughter in Law' },
    { name: 'Father in Law ' },
    { name: 'Mother in Law' },
    { name: 'Brother in Law' },
    { name: 'Sister in Law' },
    { name: 'Landlord' },
    { name: 'Neighbour' },
    { name: 'Colleague' },
    { name: 'Creditor' },
    { name: 'Debtor' },
    { name: 'Supplier' },
    { name: 'Friend' },
    { name: 'Other' },
  ];

  passport_type = [
    { type: 'Ordinary passport' },
    { type: 'Diplomatic passport' },
    { type: 'Official passport' },
  ];

  getCompany() {
    var temp = {
      where: false,
      limit: this.limit,
      offset: 0,
      company_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getCompany(temp).subscribe({
      next: (res: any) => {
        this.companyData = res.company.rows;
      },
      error: (err: any) => {
        this.handleError('Server error');
      },
    });
  }

  getDesignation() {
    var temp = {
      isDeleted: false,
      limit: this.limit,
      offset: 0,
      designation_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getDesignation(temp).subscribe({
      next: (res: any) => {
        this.designationData = res.designation.rows;
      },
      error: (err: any) => {
        this.handleError('Server Error');
      },
    });
  }

  getDepartment() {
    var temp = {
      where: false,
      limit: this.limit,
      offset: 0,
      department_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getDepartment(temp).subscribe({
      next: (res: any) => {
        this.departmentData = res.department.rows;
      },
      error: (err: any) => {
        this.handleError('Serve Error');
      },
    });
  }

  getBranch() {
    var temp = {
      where: false,
      limit: 1000,
      offset: 0,
      branch_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getBranch(temp).subscribe({
      next: (response: any) => {
        this.branchData = response['branch']['rows'];
        console.log("=====branch", this.branchData);
      },
      error: (err) => {
        this.handleError('Server Error');
      },
    });
  }

  next() {
    this.step++;
    if (this.step == 4) {
      this.disableNext = true;
    } else {
      this.disablePrev = false;
    }
  }

  prev() {
    this.step--;
    if (this.step == 1) {
      this.disablePrev = true;
    } else {
      this.disableNext = false;
    }
  }

  setUpEdit() {
    this.ManageEmployee.editData.subscribe({
      next: (data: any) => {
        this.generalForm.get('work_emailId')?.disable()
        console.log('EDITDATA', data);
        this.creat_user = data.create_user_check;
        this.empId = data.id;
        this.generalForm.patchValue({
          title: data.title,
          first_name: data.first_name,
          middle_name: data.middle_name,
          last_name: data.last_name,
          emp_id: data.emp_id,
          emp_type: data.emp_type,
          crew_type: data.crew_type,
          company_type: data.company_type,
          manager_name: data.manager_name,
          employee_status: data.employee_status,
          employee_classification: data.employee_classification,
          company_id: data.company_id,
          attendance_code: data.attendance_code,
          probation_period: data.probation_period,
          remark: data.remark,
          working_location: data.working_location,
          work_emailId: data.work_email,
          date_of_joining: data.date_of_joining,
          department_id: data.department_id,
          designation_id: data.designation_id,
          // branch_id: data.branch_id,
          emp_role: data.emp_role,
        });
        // this.personalForm.get('comm_state')?.patchValue(data?.comm_stat);
        this.personalForm.patchValue({
          Same_as_Permanent: data.Same_as_Permanent,
          Same_as_Temporary: data.Same_as_Temporary,
          languages: data.languages,
          date_of_birth: data.date_of_birth,
          nationality: data.nationality,
          marital_status: data.marital_status,
          gender: data.gender,
          personal_email: data.work_email,
          blood_group: data.blood_group,
          mobile_no: data.mobile_no,
          highest_qualification: data.highest_qualification,
          work_experience: data.work_experience,
          religion: data.religion,
          no_of_dependency: data.no_of_dependency,
          safty_shoe_size: data.safty_shoe_size,
          nearest_domestic_airport: data.nearest_domestic_airport,
          nearest_internatinal_airport: data.nearest_internatinal_airport,
          country: data.country,
          state: data.state,
          district: data.district,
          city: data.city,
          zipcode: data.zipcode,
          temp_country: data.temp_country,
          temp_city: data.temp_city,
          temp_destrict: data.temp_destrict,
          temp_zip: data.temp_zip,
          temp_state: data.temp_state,
          permanent_address: data.permanent_address,
          temporary_address: data.temporary_address,
          comm_address: data.comm_address,
          comm_country: data.comm_country,
          comm_city: data.comm_city,
          comm_destrict: data.comm_destrict,
          comm_zip: data?.comm_zip,
          comm_state: data?.comm_state,
        });
        this.nomineeForm.patchValue({
          nominee_address: data.nominee_address,
          nominee_mobile_no: data.nominee_mobile_no,
          nominee_email: data.nominee_email,
          relation_with_employee: data.relation_with_employee,
          nominee_name: data.nominee_name,
          nominee_telephone_no: data.nominee_telephone_no,
          upload_nominee_form: data.upload_nominee_form,
          emergency_name: data.emergency_name,
          emergency_relation_employee: data.emergency_relation_employee,
          emergency_telephone_no: data.emergency_telephone_no,
          emergency_cellphone_no: data.emergency_cellphone_no,
          emergency_address: data.emergency_address,
          emergency_Email: data.emergency_Email,
        });
        this.bankDetailsInfoForm.patchValue({
          bank_name: data.bank_name,
          IFSC_code: data.IFSC_code,
          account_no: data.account_no,
          branch: data.bank_branch,
          address: data.bank_address,
        });
        this.otherInfoForm.patchValue({
          pan_no: data.pan_no,
          upload_pan: data.upload_pan,
          aadhar_no: data.aadhar_no,
          upload_aadhar: data.upload_aadhar,
          passport_no: data.passport_no,
          restriction_passport: data.restriction_passport,
          date_of_issue: data.date_of_issue,
          date_of_expiry: data.date_of_expiry,
          place_of_issue: data.place_of_issue,
          place_of_birth: data.place_of_birth,
          passport_type: data.passport_type,
          upload_passport: data.upload_passport,
          issued_by: data.issued_by,
          smartcard_issued: data.smartcard_issued,
          cdc_no: data.cdc_no,
          cdc_date_of_issue: data.cdc_date_of_issue,
          cdc_date_of_expiry: data.cdc_date_of_expiry,
          upload_cdc: data.upload_cd,
        });
        this.clientInfoForm.patchValue({
          cv_approvel: data.cv_approvel,
          cv_uploade: data.cv_uploade,
          smartcard_approvel: data.smartcard_approvel,
          smartcard_upload: data.smartcard_upload,
        });
        this.employeePAckageData = data?.package_data;
        this.employeeShift = data?.shift_data;
        this.isEdit = true;
        this.getLeaveOfEmployee();
        console.log('checking', data.upload_pan);
        this.getManagerName()
      },
      error: (e) => {
        this.handleError('Server Error');
        this.reset();
      },
    });
  }
  getPackageForEmp() {
    this.masterService.getPackageForEmp().subscribe({
      next: (res: any) => {
        this.getPackageofEmp = res.package;
      },
      error: (e: any) => {
        this.handleError('Server Error');
      },
    });
  }
  getLeaveOfEmployee() {
    var temp = {
      leave_emp_id: this.empId,
      isDeleted: false,
    };
    this.masterService.getLeaveofEmployee(temp).subscribe({
      next: (res: any) => {
        this.leaveData = res.leave;
        this.leaveEmpData = res.employee;
      },
      error: (e: any) => {
        this.handleError('Server Error');
      },
    });
  }
  getRoleData: any[] = [];
  getRole() {
    var temp = {
      isDeleted: false,
      limit: 1000,
      offset: 0,
      role_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getRole(temp).subscribe({
      next: (res: any) => {
        this.getRoleData = res.role.rows;
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }
  sameAsPermenent() {
    this.personalForm
      .get('Same_as_Permanent')
      ?.valueChanges.subscribe((data: any) => {
        console.log(data);
        var permanent_address: any =
          this.personalForm.get('permanent_address')?.value;
        var country: any = this.personalForm.get('country')?.value;
        var state: any = this.personalForm.get('state')?.value;
        var district: any = this.personalForm.get('district')?.value;
        var city: any = this.personalForm.get('city')?.value;
        var zipcode: any = this.personalForm.get('zipcode')?.value;
        if (data) {
          this.personalForm
            .get('temporary_address')
            ?.patchValue(permanent_address);
          this.personalForm.get('temp_country')?.patchValue(country);
          this.personalForm.get('temp_state')?.patchValue(state);
          this.personalForm.get('temp_destrict')?.patchValue(district);
          this.personalForm.get('temp_city')?.patchValue(city);
          this.personalForm.get('temp_zip')?.patchValue(zipcode);
        } else {
          this.personalForm.get('temporary_address')?.reset();
          this.personalForm.get('temp_country')?.reset();
          this.personalForm.get('temp_state')?.reset();
          this.personalForm.get('temp_destrict')?.reset();
          this.personalForm.get('temp_city')?.reset();
          this.personalForm.get('temp_zip')?.reset();
        }
      });
  }

  sameAsCommunication() {
    this.personalForm
      .get('Same_as_Temporary')
      ?.valueChanges.subscribe((data: any) => {
        var comm_address: any = this.personalForm.get('comm_address')?.value;
        var comm_country: any = this.personalForm.get('comm_country')?.value;
        var comm_city: any = this.personalForm.get('comm_city')?.value;
        var comm_destrict: any = this.personalForm.get('comm_destrict')?.value;
        var comm_zip: any = this.personalForm.get('comm_zip')?.value;
        var comm_state: any = this.personalForm.get('comm_state')?.value;
        if (data) {
          this.personalForm.get('permanent_address')?.patchValue(comm_address);
          this.personalForm.get('country')?.patchValue(comm_country);
          this.personalForm.get('state')?.patchValue(comm_state);
          this.personalForm.get('district')?.patchValue(comm_destrict);
          this.personalForm.get('city')?.patchValue(comm_city);
          this.personalForm.get('zipcode')?.patchValue(comm_zip);
        } else {
          this.personalForm.get('permanent_address')?.reset();
          this.personalForm.get('country')?.reset();
          this.personalForm.get('state')?.reset();
          this.personalForm.get('district')?.reset();
          this.personalForm.get('city')?.reset();
          this.personalForm.get('zipcode')?.reset();
        }
      });
  }

  makeThisAsEmergency() {
    this.nomineeForm
      .get('make_this_as_emergency')
      ?.valueChanges.subscribe((data: any) => {
        var nominee_address: any =
          this.nomineeForm.get('nominee_address')?.value;
        var nominee_mobile_no: any =
          this.nomineeForm.get('nominee_mobile_no')?.value;
        var nominee_email: any = this.nomineeForm.get('nominee_email')?.value;
        var relation_with_employee: any = this.nomineeForm.get(
          'relation_with_employee'
        )?.value;
        var nominee_name: any = this.nomineeForm.get('nominee_name')?.value;
        var nominee_telephone_no: any = this.nomineeForm.get(
          'nominee_telephone_no'
        )?.value;
        if (data) {
          this.nomineeForm
            .get('emergency_address')
            ?.patchValue(nominee_address);
          this.nomineeForm
            .get('emergency_telephone_no')
            ?.patchValue(nominee_mobile_no);
          this.nomineeForm.get('emergency_Email')?.patchValue(nominee_email);
          this.nomineeForm
            .get('emergency_relation_employee')
            ?.patchValue(relation_with_employee);
          this.nomineeForm.get('emergency_name')?.patchValue(nominee_name);
          this.nomineeForm
            .get('emergency_telephone_no')
            ?.patchValue(nominee_telephone_no);
        } else {
          this.nomineeForm.get('emergency_address')?.reset();
          this.nomineeForm.get('emergency_telephone_no')?.reset();
          this.nomineeForm.get('emergency_Email')?.reset();
          this.nomineeForm.get('emergency_relation_employee')?.reset();
          this.nomineeForm.get('emergency_name')?.reset();
          this.nomineeForm.get('emergency_telephone_no')?.reset();
        }
      });
  }
}
