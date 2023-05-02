import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageCompanyComponent } from '../manage-company/manage-company.component';
import { Router } from "@angular/router";
import * as moment from 'moment';
// import { FILE_UPLOAD_LIMIT, FOLDERS, supportedFileTypes } from 'src/app/shared/config/config';
import { DmsService } from 'src/app/services/dms.service';
// import { firstValueFrom } from 'rxjs';

declare var UIkit: any;

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  // @Input('isEdit') isEdit: boolean = false;

  isEdit: any;
  loader: boolean = false;
  Countries: any = []
  buttonLoader: boolean = false;
  companyFormData: any[] = []
  limit = 5;
  yearDate: any;
  id: any
  isCompanyDone: boolean = false
  preferenceKeys = PreferenceKeys;
  userData: any;
  step = 1;
  city: any = []
  disableNext: boolean = false
  disablePrev: boolean = true
  enableField: any;
  localdata: any;
  state: any = []
  active = false;
  index: number = 0;
  todaysDate: any = new Date()
  disableParent: boolean = true
  companyToggle = false
  headerFile: any;
  footerFile: any;
  companyForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private managecompany: ManageCompanyComponent,
    private dmsService: DmsService,
    public router: Router
  ) {
    this.initializeForm();
  }



  initializeForm() {
    this.isEdit = false
    this.companyForm = this.fb.group({
      formName: new FormControl("companyForm"),
      company_name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      company_code: new FormControl('', [Validators.required]),
      parent_company: new FormControl(''),
      subsidiaries: new FormControl(''),
      year_of_establishment: new FormControl(''),
      type_of_orginization: new FormControl('', [Validators.maxLength(50)]),
      company_phone: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      company_email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      company_fax: new FormControl(''),
      company_website: new FormControl(''),
      company_contact_person: new FormControl(''),
      company_mobile: new FormControl('', [Validators.pattern('^[6-9]{1}[0-9]{9}$')]),
      company_vat: new FormControl(''),
      company_pan: new FormControl('', [Validators.maxLength(10), Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
      company_gst: new FormControl(''),
      company_excise_registration: new FormControl(''),
      company_header: new FormControl(''),
      company_footer: new FormControl(''),
      company_note: new FormControl(''),
      company_address: new FormControl(''),
      company_secondary_address: new FormControl(''),
      company_city: new FormControl(''),
      company_district: new FormControl(''),
      company_state: new FormControl('', [Validators.required]),
      company_zipcode: new FormControl(''),
      company_country: new FormControl('', [Validators.required]),
      CIN_no: new FormControl(''),
      IEC: new FormControl(''),
      TAN: new FormControl(''),
    })


  }

  ngOnInit(): void {
    this.setupEdit()
    this.getProfile();
    this.getCountries();

  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      company: this.appPreference.getObject(PreferenceKeys.COMPANY)
    }

    console.log(this.userData.data.isFirst)
    this.companyToggle = this.userData.company
  }
  type_of_org = [
    { name: "Public Limited Company" },
    { name: "Private Limited Company" },
    { name: "NGO" }
  ]
  currentTab: String = "";

  setCurrentTab(ind: any) {
    switch (ind) {
      case 0:
        this.currentTab = 'general-info'
        this.index = 0;
        this.active = true
        break;
      case 1:
        this.currentTab = 'company-info';
        this.index = 1;
        this.active = true
        break;
      case 2:
        this.currentTab = 'tax-info'
        this.index = 2;
        this.active = true
        break;
      default:
        break;
    }
  }

  isParent(checked: any) {
    this.disableParent = checked
    if (!checked) {
      this.disableParent = true;
    } else {
      this.disableParent = false
    }
  }


  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.managecompany.getCompany();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  contactPerson = [
    { person: 'person_1' },
    { person: 'person_2' }
  ]


  async addCompany() {
    // console.log(this.companyForm.value)
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched()
    } else {
      this.buttonLoader = true
      var temp: any = {
        company_name: this.companyForm.get('company_name')?.value,
        company_code: this.companyForm.get('company_code')?.value,
        parent_company: this.companyForm.get('parent_company')?.value,
        subsidiaries: this.companyForm.get('subsidiaries')?.value,
        year_of_establishment: this.companyForm.get('year_of_establishment')?.value || null,
        type_of_orginization: this.companyForm.get('type_of_orginization')?.value,
        company_phone: this.companyForm.get('company_phone')?.value,
        company_email: this.companyForm.get('company_email')?.value,
        company_fax: this.companyForm.get('company_fax')?.value,
        company_website: this.companyForm.get('company_website')?.value,
        company_contact_person: this.companyForm.get('company_contact_person')?.value,
        company_mobile: this.companyForm.get('company_mobile')?.value,
        company_vat: this.companyForm.get('company_vat')?.value,
        company_pan: this.companyForm.get('company_pan')?.value,
        company_gst: this.companyForm.get('company_gst')?.value,
        company_excise_registration: this.companyForm.get('company_excise_registration')?.value,
        company_header: this.companyForm.get('company_header')?.value,
        company_footer: this.companyForm.get('company_footer')?.value,
        company_note: this.companyForm.get('company_note')?.value,
        company_address: this.companyForm.get('company_address')?.value,
        company_secondary_address: this.companyForm.get('company_secondary_address')?.value,
        company_city: this.companyForm.get('company_city')?.value,
        company_district: this.companyForm.get('company_district')?.value,
        company_state: this.companyForm.get('company_state')?.value,
        company_zipcode: this.companyForm.get('company_zipcode')?.value,
        company_country: this.companyForm.get('company_country')?.value,
        CIN_no: this.companyForm.get('CIN_no')?.value,
        IEC: this.companyForm.get('IEC')?.value,
        TAN: this.companyForm.get('TAN')?.value,
        company_owner_id: this.userData?.data?.owner_id
      }
      console.log(temp);

      // const folderData = {
      //   folderName: FOLDERS.COMPANY
      // }

      // const folderResult: any = await firstValueFrom(this.dmsService.getFolder(folderData))
      // const folderId = folderResult.result[0].id

      // const headerData = new FormData();
      // // if (this.headerFile) { // check if headerFile is defined
      // //   headerData.append("document", this.headerFile, "document");
      // // }
      // console.log("this.file", this.headerFile)
      // headerData.append("document", this.headerFile, "document")
      // const headerResult: any = await firstValueFrom(this.dmsService.upload(headerData, folderId))
      // console.log("headerResult", headerResult)

      // const footerData = new FormData();
      // // if (this.footerFile) { // check if headerFile is defined
      // //   headerData.append("document", this.footerFile, "document");
      // // }
      // footerData.append("document", this.footerFile, "document")
      // const footerResult: any = await firstValueFrom(this.dmsService.upload(footerData, folderId))
      // console.log("footerResult", footerResult)

      // temp.company_header = headerResult.result
      // temp.company_footer = footerResult.result

      this.masterService.addCompany(temp).subscribe({
        next: (res: any) => {
          // this.handleSuccess("Company Added Successfully")
          console.log("=======", res.company.id)
          this.buttonLoader = false
          this.formData(res)
          console.log("user is not first")
          if (this.userData.company) {
            console.log("user is first")
            // var temp = {
            //   company_id: res?.company?.id,
            // }
            // this.masterService.updateSetup(temp).subscribe({
            //   next: (res: any) => {
            //     console.log('Role Update Successfully');
            //     console.log('success');
            //   },
            //   error: (e: any) => {
            //     // this.handleError("Internal Serever Error"
            //     console.log('error');
            //   },
            // });
            var setup = {
              "id": this.userData.data.id,
              "isCompany": false,
              "company_id": res?.company?.id,
            }
            this.masterService.updateFirstSetup(setup).subscribe({
              next: (res: any) => {
                this.reset();
                this.appPreference.setObject(this.preferenceKeys.COMPANY, false)
                this.router.navigate(["/setting/first-setup"]);
              }
            })
          } else {
            // setTimeout(() => {
            this.handleSuccess("Company Created Successfully");
            this.reset();
            this.formData(res)
            // }, 1000)
          }


        }, error: (e: any) => {
          this.handleError(e)
          this.buttonLoader = false
        }
      })
    }
  }

  formData(res: any) {
    this.companyFormData = res['company']
  }

  // prepareFilesList(files: Array<any>, type: string){
  //   for(const items of files){
  //     if (files.length > 0) {
  //       const file = items;
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         items.base64 = reader.result?.toString().split(",")[1];
  //       };
  //       // this.files.push(items);

  //       // Diffrentiate type of file
  //       if (type == "header") {
  //         this.headerFile = items
  //       }else if(type == "footer"){
  //         this.footerFile = items
  //       }

  //       console.log("aadhar card", this.headerFile)
  //       console.log("pan card", this.footerFile)
  //     } else {
  //       this.appPreference.showWarning("Please upload a file");
  //     }
  //   }
  // }

  // // Pass file, type
  // uploadFile(event:any, type: string){
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

  setupEdit() {
    this.managecompany.editData.subscribe({
      next: (data: any) => {
        this.id = data.id
        console.log("data.year_of_establishment", typeof data.year_of_establishment)
        this.isEdit = this.appPreference.getObject(PreferenceKeys.ISEDIT)
        var date: any = new Date(data.year_of_establishment)
        this.yearDate = this.yearDate?._d
        this.companyForm.patchValue(data)
        this.companyForm.get("year_of_establishment")?.setValue(date)
        if (data?.parent_company) {
          this.disableParent = false;
          this.companyForm.patchValue(data.subsidiaries[1])
        } else {
          this.disableParent = true;
        }

        console.log("setupedit", typeof this.todaysDate)
      },
      error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  editCompany() {
    this.buttonLoader = true
    var temp = {
      id: this.id,
      company_name: this.companyForm.get('company_name')?.value,
      company_code: this.companyForm.get('company_code')?.value,
      parent_company: this.companyForm.get('parent_company')?.value,
      subsidiaries: this.companyForm.get('subsidiaries')?.value,
      year_of_establishment: this.companyForm.get('year_of_establishment')?.value,
      type_of_orginization: this.companyForm.get('type_of_orginization')?.value,
      company_phone: this.companyForm.get('company_phone')?.value,
      company_email: this.companyForm.get('company_email')?.value,
      company_fax: this.companyForm.get('company_fax')?.value,
      company_website: this.companyForm.get('company_website')?.value,
      company_contact_person: this.companyForm.get('company_contact_person')?.value,
      company_mobile: this.companyForm.get('company_mobile')?.value,
      company_vat: this.companyForm.get('company_vat')?.value,
      company_pan: this.companyForm.get('company_pan')?.value,
      company_gst: this.companyForm.get('company_gst')?.value,
      company_excise_registration: this.companyForm.get('company_excise_registration')?.value,
      company_header: this.companyForm.get('company_header')?.value,
      company_footer: this.companyForm.get('company_footer')?.value,
      company_note: this.companyForm.get('company_note')?.value,
      company_address: this.companyForm.get('company_address')?.value,
      company_secondary_address: this.companyForm.get('company_secondary_address')?.value,
      company_city: this.companyForm.get('company_city')?.value,
      company_district: this.companyForm.get('company_district')?.value,
      company_state: this.companyForm.get('company_state')?.value,
      company_zipcode: this.companyForm.get('company_zipcode')?.value,
      company_country: this.companyForm.get('company_country')?.value,
      CIN_no: this.companyForm.get('CIN_no')?.value,
      IEC: this.companyForm.get('IEC')?.value,
      TAN: this.companyForm.get('TAN')?.value,
    }
    this.masterService.editCompany(temp).subscribe({
      next: (response: any) => {
        setTimeout(() => {
          this.handleSuccess("Company Updated Successfully");
          this.reset();
          this.buttonLoader = false
          this.formData(response)
        }, 1000)
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  next() {
    this.step++
    if (this.step == 3) {
      this.disableNext = true
    } else {
      this.disablePrev = false
    }
  }

  prev() {
    this.step--
    if (this.step == 1) {
      this.disablePrev = true
    } else {
      this.disableNext = false
    }
  }
  getCountries() {
    var temp = {};
    this.masterService.getCountries(temp).subscribe({
      next: (res: any) => {
        console.log("=====", res)
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


  reset() {
    this.setCurrentTab(0)
    this.step = 1
    // this.isEdit = false;
    this.isEdit = this.appPreference.setObject(this.preferenceKeys.ISEDIT, false)
    // this.companyForm.reset();
    this.initializeForm();

    // window.location.reload()
    this.companyForm.patchValue({
      "formName": "companyForm"
    })
    UIkit.modal("#add-company").hide();
    this.managecompany.getCompany()
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
