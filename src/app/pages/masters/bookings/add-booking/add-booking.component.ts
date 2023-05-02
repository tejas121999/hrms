import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageBookingComponent } from '../manage-booking/manage-booking.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  files: File[] = [];
  @Input('isEdit') isEdit: boolean = false;
  loader: boolean = false;
  buttonLoader: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  buttonDisable = false


  constructor(
    private formValidator: FormValidator,
    private masterServices: MasterServices,
    private appPreference: AppPreference,
    private manageBooking: ManageBookingComponent
  ) { }

  bookingForm = new FormGroup({
    formName: new FormControl("bookingForm"),
    booking_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    date: new FormControl('', [Validators.required]),
    code: new FormControl(''),
    upload: new FormControl('')
  })

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  reset() {
    this.bookingForm.reset();
    window.location.reload()
    this.bookingForm.patchValue({
      "formName": "bookingForm"
    })
    this.manageBooking.getbooking()
    UIkit.modal("#add-booking").hide();
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  addBooking() {
    this.buttonLoader = true;
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.buttonLoader = false;
    } else {
      this.buttonDisable = true;
      this.buttonLoader = true
      var temp = {
        "booking_owner_id": this.userData?.data?.owner_id,
        "name": this.bookingForm.get('booking_name')?.value,
        "description": this.bookingForm.get('description')?.value,
        "booking_date": this.bookingForm.get('date')?.value,
        "upload": this.bookingForm.get('upload')?.value,
        "code": this.bookingForm.get('code')?.value,
      }
      this.masterServices.addBooking(temp).subscribe({
        next: (res: any) => {
          this.handleSuccess("Booking Add successfully")
          this.buttonDisable = false;
          this.reset()
        }, error: (e: any) => {
          this.handleError('error');
          this.buttonDisable = false;

        }
      })
    }
  }

  bookingId: any
  setupEdit() {
    this.manageBooking.editData.subscribe({
      next: (data: any) => {
        this.bookingId = data.id
        this.bookingForm.patchValue({
          booking_name: data.name,
          description: data.description,
          date: data.booking_date,
          code: data.code,
        })
        this.isEdit = true
      }, error: (e: any) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  editBooking() {
    var temp = {
      "id": this.bookingId,
      "booking": {
        "name": this.bookingForm.get('booking_name')?.value,
        "description": this.bookingForm.get('description')?.value,
        "booking_date": this.bookingForm.get('date')?.value,
        "upload": this.bookingForm.get('upload')?.value,
        "code": this.bookingForm.get('code')?.value,
      }

    }

    this.masterServices.editBooking(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Booking Edit successfully")
        this.reset();
      }, error: (e: any) => {
        this.handleError("server error")
      }
    })

  }



  getError(formGroup: FormGroup, controlName: any) {
    console.log(formGroup, controlName)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
