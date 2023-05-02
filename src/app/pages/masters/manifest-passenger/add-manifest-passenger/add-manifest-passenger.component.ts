import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';
// declare var UIkit: any;
import * as moment from "moment";
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { MasterServices } from 'src/app/services/master-services';
import { ManageManifestPassengerComponent } from '../manage-manifest-passenger/manage-manifest-passenger.component';
declare var UIkit: any;


@Component({
  selector: 'app-add-manifest-passenger',
  templateUrl: './add-manifest-passenger.component.html',
  styleUrls: ['./add-manifest-passenger.component.scss']
})
export class AddManifestPassengerComponent implements OnInit {
  buttonDisable = false;
  buttonLoader: boolean = false;
  loader: boolean = false;
  @Input('isEdit') isEdit: boolean = false;
  passengerFormData: any = []
  preferenceKeys = PreferenceKeys;
  userData: any;

  constructor(private formValidator: FormValidator,
    private appPreference: AppPreference,
    private managePassenger: ManageManifestPassengerComponent,
    private masterService: MasterServices,
  ) { }

  passengerForm = new FormGroup({
    formName: new FormControl("passengerForm"),
    type: new FormControl('', [Validators.required]),
    purchasing: new FormControl('', [Validators.required]),
    plant: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    vendor_code: new FormControl('', [Validators.required]),
    subvendor_code: new FormControl(''),
    company_name: new FormControl(''),
    company_address: new FormControl(''),
    rfm_number: new FormControl(''),
    vendor_name: new FormControl(''),
    date_of_sorti: new FormControl(''),
    sorti_type: new FormControl(''),
    task: new FormControl(''),
    plant_for_manifest: new FormControl(''),
    mode_of_journey: new FormControl(''),
    scheduled_sector: new FormControl(''),
    schedule_dep_time: new FormControl(''),
    remark: new FormControl('')
  })

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    // this.managerig.getRig();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  addPassenger() {
    if (this.passengerForm.invalid) {
      this.passengerForm.markAllAsTouched()
    } else {
      var date: any = moment(this.passengerForm.get('date')?.value).add(1, 'days').format("YYYY/MM/DD")
      this.buttonLoader = true
      this.buttonDisable = true
      var temp = {
        "owner_id": this.userData?.data?.owner_id,
        "type": this.passengerForm.get('type')?.value,
        "purchasing": this.passengerForm.get('purchasing')?.value,
        "plant": this.passengerForm.get('plant')?.value,
        "passengerManifest_date": date,
        "vendor_code": this.passengerForm.get('vendor_code')?.value,
        "sub_vendor_code": this.passengerForm.get('subvendor_code')?.value,
        "company_name": this.passengerForm.get('company_name')?.value,
        "company_address": this.passengerForm.get('company_address')?.value,
        "RFM_number": this.passengerForm.get('rfm_number')?.value,
        "vendor_name": this.passengerForm.get('vendor_name')?.value,
        "date_of_sortie": this.passengerForm.get('date_of_sorti')?.value,
        "sortie_type": this.passengerForm.get('sorti_type')?.value,
        "task": this.passengerForm.get('task')?.value,
        "plant_of_manifest": this.passengerForm.get('plant_for_manifest')?.value,
        "mode_of_journey": this.passengerForm.get('mode_of_journey')?.value,
        "scheduled_sector": this.passengerForm.get('scheduled_sector')?.value,
        "scheduled_dep_time": this.passengerForm.get('schedule_dep_time')?.value,
        "remark": this.passengerForm.get('remark')?.value,
      }
      this.masterService.addPassenger(temp).subscribe({
        next: (res) => {
          this.handleSuccess("Passenger Added Successfully");
          this.formData(res)
          this.reset();
          this.buttonLoader = false
          this.buttonDisable = false

        },
        error: (e: any) => {
          this.buttonLoader = false
          this.buttonDisable = false
          this.handleError(e)
        }
      })
    }
  }
  _id: any
  setupEdit() {
    this.managePassenger.editData.subscribe({
      next: (data: any) => {
        this._id = data.id
        this.passengerForm.get("type")?.patchValue(data.type)
        this.passengerForm.get("purchasing")?.patchValue(data.purchasing)
        this.passengerForm.get("plant")?.patchValue(data.plant)
        // this.passengerForm.get("date")?.patchValue(data)
        this.passengerForm.get("vendor_code")?.patchValue(data.vendor_code)
        this.passengerForm.get("subvendor_code")?.patchValue(data.sub_vendor_code)
        this.passengerForm.get("company_name")?.patchValue(data.company_name)
        this.passengerForm.get("company_address")?.patchValue(data.company_address)
        this.passengerForm.get("rfm_number")?.patchValue(data.RFM_number)
        this.passengerForm.get("vendor_name")?.patchValue(data.vendor_name)
        this.passengerForm.get("date_of_sorti")?.patchValue(data.date_of_sortie)
        this.passengerForm.get("sorti_type")?.patchValue(data.sortie_type)
        this.passengerForm.get("task")?.patchValue(data.task)
        this.passengerForm.get("plant_for_manifest")?.patchValue(data.plant_of_manifest)
        this.passengerForm.get("mode_of_journey")?.patchValue(data.mode_of_journey)
        this.passengerForm.get("scheduled_sector")?.patchValue(data.scheduled_sector)
        this.passengerForm.get("schedule_dep_time")?.patchValue(data.scheduled_dep_time)
        this.passengerForm.get("remark")?.patchValue(data.remark)
        this.passengerForm.get('date')?.patchValue(data.passengerManifest_date)
        this.isEdit = true
      }, error: (e: any) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  editBooking() {
    var date: any = moment(this.passengerForm.get('date')?.value).add(1, 'days').format("YYYY/MM/DD")
    this.buttonLoader = true
    var temp = {
      "id": this._id,
      "type": this.passengerForm.get('type')?.value,
      "purchasing": this.passengerForm.get('purchasing')?.value,
      "plant": this.passengerForm.get('plant')?.value,
      "passengerManifest_date": date,
      "vendor_code": this.passengerForm.get('vendor_code')?.value,
      "sub_vendor_code": this.passengerForm.get('subvendor_code')?.value,
      "company_name": this.passengerForm.get('company_name')?.value,
      "company_address": this.passengerForm.get('company_address')?.value,
      "RFM_number": this.passengerForm.get('rfm_number')?.value,
      "vendor_name": this.passengerForm.get('vendor_name')?.value,
      "date_of_sortie": this.passengerForm.get('date_of_sorti')?.value,
      "sortie_type": this.passengerForm.get('sorti_type')?.value,
      "task": this.passengerForm.get('task')?.value,
      "plant_of_manifest": this.passengerForm.get('plant_for_manifest')?.value,
      "mode_of_journey": this.passengerForm.get('mode_of_journey')?.value,
      "scheduled_sector": this.passengerForm.get('scheduled_sector')?.value,
      "scheduled_dep_time": this.passengerForm.get('schedule_dep_time')?.value,
      "remark": this.passengerForm.get('remark')?.value,
    }
    console.log(temp)
    this.masterService.editPassenger(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Passenger Edit successfully")
        this.reset();
        this.buttonLoader = false
      }, error: (e: any) => {
        this.handleError(e)
        this.buttonLoader = false
      }
    })
  }

  formData(res: any) {
    // this.passengerFormData = res['rigManifest']
    // console.log(this.passengerFormData)
  }

  reset() {
    this.isEdit = false
    this.managePassenger.getPassenger()
    this.passengerForm.reset();
    window.location.reload()
    this.passengerForm.patchValue({
      "formName": "passengerForm"
    })
    UIkit.modal("#add-manifest-passenger").hide();
  }

}
