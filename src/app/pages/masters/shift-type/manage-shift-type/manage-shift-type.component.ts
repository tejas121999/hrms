import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
@Component({
  selector: 'app-manage-shift-type',
  templateUrl: './manage-shift-type.component.html',
  styleUrls: ['./manage-shift-type.component.scss']
})
export class ManageShiftTypeComponent implements OnInit {

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }
  preferenceKeys = PreferenceKeys;
  loader: boolean = false;
  limit: number = 10
  offset: number = 0
  editData = new Subject<any>();
  isEdit: boolean = false;
  count: any
  currentPage: any
  shiftData: any[] = []
  userData: any;

  ngOnInit(): void {
    this.getProfile()
    this.getShift()
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

  getShift() {
    this.loader=true

    setTimeout(() => {
      var temp = {
        "isDeleted": false,
        "limit": this.limit,
        "offset": this.offset,
        "shift_owner_id": this.userData.data.owner_id
      }
      this.masterService.getShift(temp).subscribe({
        next: (res: any) => {
          this.count = res.shift.count
          this.setData(res.shift.rows)
          this.loader = false
        },
        error: (err: any) => {
          this.handleError(err)
        }
      })
    }, 300);
  
  }

  deleteShift(data: any) {
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
        this.masterService.deleteShift(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Shift has been deleted.',
              'success'
            )
            // this.handleSuccess("Shift Delete Successfully")
            this.getShift()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })

      }
    })


  }
  setData(res: any) {
    console.log(res)
    this.shiftData = res
  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-shift-type").show();
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getShift()
  }
}
