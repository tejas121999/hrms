import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;


@Component({
  selector: 'app-manage-shift',
  templateUrl: './manage-shift.component.html',
  styleUrls: ['./manage-shift.component.scss']
})
export class ManageShiftComponent implements OnInit, OnDestroy {
  editData = new Subject<any>();
  searchText = new FormControl('');
  loader: boolean = false;
  count: any;
  isEdit: boolean = false;
  addItem: boolean = false;
  currentPage: any
  limit: number = 500
  offset: number = 0
  userData: any
  shiftData: any = []

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getShift()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchShift(query)
    })
  }

  searchShift(data: any) {
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "shift_owner_id": this.userData?.data?.owner_id,
      "q": data
    }

    this.masterService.searchShift(temp).subscribe({
      next: (res: any) => {
        this.count = res.data.count
        this.shiftData = res.data.rows
        this.loader = false
      },
      error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }
      }
    })
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }


  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  getShift() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "shift_owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getShiftList(temp).subscribe({
      next: (res: any) => {
        this.count = res.shift.count
        this.shiftData = res.shift.rows
        console.log(this.shiftData);
        this.loader = false
      },
      error: (err: any) => {
        this.handleError(err.error)
      }
    })
  }
  ngOnDestroy(): void {
    $("#add-shift").remove();
  }

  openEdit(data: any) {
    UIkit.modal("#add-shift").show();
    this.editData.next(data)
    this.isEdit = true;

  }
  deleteShiftlist(data: any) {
    console.log(data);

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this record ?",
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
          "id": data.id,
          "shiftMetaDataDelete": {
            "shift_id": data?.ShiftMetaDatum?.shift_id,
            "isDeleted": true
          }
        }



        this.masterService.deleteShift(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Shift has been deleted.',
              'success'
            )
            // this.handleSuccess("Delete booking Successfully")
            this.getProfile();
            this.getShift()
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
  }


}
