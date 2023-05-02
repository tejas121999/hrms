import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-manifest-passenger',
  templateUrl: './manage-manifest-passenger.component.html',
  styleUrls: ['./manage-manifest-passenger.component.scss']
})
export class ManageManifestPassengerComponent implements OnDestroy, OnInit {
  date = new Date();
  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  count: any;
  currentPage: number = 1;
  passengerData: any = []
  editData = new Subject<any>();
  isEdit: boolean = false;
  userData: any
  preferenceKeys = PreferenceKeys
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getPassenger();
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getPassenger() {
    this.loader = true;
    setTimeout(() => {
      var temp = {
        "owner_id": this.userData?.data?.owner_id,
        "isDeleted": false,
        "limit": this.limit,
        "offset": this.offset
      }
      this.masterService.getPassenger(temp).subscribe({
        next: (res: any) => {
          this.setData(res.passengerManifest.rows)
          // console.log(res)
          this.count = res.passengerManifest.count
          this.loader = false;
        },
        error: (err: any) => {
          this.handleError(err)
        }
      })
    }, 3000);

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

  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-manifest-passenger").show();
  }
  ngOnDestroy(): void {
    $("#add-manifest-passenger").remove();
  }
  deletePassenger(data: any) {
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
          "id": data.id,
          "isDeleted": true
        }
        this.masterService.deletePassenger(temp).subscribe({
          next: (res: any) => {
            console.log("hello")
            Swal.fire(
              'Deleted!',
              'Your Passenger has been deleted.',
              'success'
            )
            this.handleSuccess("Delete booking Successfully")
            this.getPassenger()
          }, error: (e: any) => {
            this.handleError("error")
          }
        })
      }
    })
  }

  setData(res: any) {
    this.passengerData = res
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getPassenger();
  }

}
