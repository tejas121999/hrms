import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnDestroy,OnInit {
  editData = new Subject<any>();
  from: number = 0;
  limit: number = 10
  offset: number = 0
  currentPage: number = 1;
  count: any;
  isEdit: boolean = false;
  bookingData: any[] = []
  preferenceKeys = PreferenceKeys;
  userData: any;
  loader: boolean = false;
  edit_leave_type=true
  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getbooking()
  }

  permission: any;
  accessPermission: any;

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS)
    }
    this.permission = this.accessPermission?.accessdata
    console.warn(this.permission.add_denied_request);

  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  getbooking() {
    this.loader = true
    setTimeout(() => {
      var temp = {
        "isDeleted": false,
        "limit": 500,
        "offset": 0,
        "booking_owner_id": this.userData?.data?.owner_id,
      }
      this.masterServices.getBooking(temp).subscribe({
        next: (res: any) => {
          this.bookingData = res.booking.rows
          this.count = res.booking.count
          this.loader = false
        },
        error: (e: any) => {
          this.handleError("error")
        }
      })
    }, 3000);

  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-booking").show();
  }
  ngOnDestroy(): void {
    $("#add-booking").remove();
  }
  deleteBookingy(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true
        var temp = {
          "isDeleted": true,
          "id": data.id
        }
        this.masterServices.deleteBooking(temp).subscribe({
          next: (res: any) => {


            Swal.fire(
              'Deleted!',
              'Your booking has been deleted.',
              'success'
            )
            // this.handleSuccess("Delete booking Successfully")
          }, error: (e: any) => {
            this.handleError("error")
          }
        })
      }
    })
  }


  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getbooking()
  }

}
