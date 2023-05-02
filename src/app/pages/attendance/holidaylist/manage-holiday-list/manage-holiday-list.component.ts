import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-holiday-list',
  templateUrl: './manage-holiday-list.component.html',
  styleUrls: ['./manage-holiday-list.component.scss']
})
export class ManageHolidayListComponent implements OnInit, OnDestroy {
  [x: string]: any;
  editData = new Subject<any>();
  searchText = new FormControl('');
  permission: any;
  accessPermission: any;
  loader: boolean = false;
  count: any;
  isEdit: boolean = false;
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  currentPage: any
  limit: number = 10
  offset: number = 0
  holidayData: any = [];

  userData: any

  ngOnInit(): void {
    this.getProfile();
    this.getHolidayList()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.holidatSearch(query)
    })
  }

  holidatSearch(data: any) {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "holiday_owner_id": this.userData?.data?.owner_id,
      "q": data,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.searchHoliday(temp).subscribe({
      next: (res: any) => {
        this.holidayData = res.data.rows
        this.count = res.data.count
        this.loader = false
      }, error: (err: any) => {
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
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS),
    };
    this.permission = this.accessPermission?.accessdata;
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  getHolidayList() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "holiday_owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getHolidayList(temp).subscribe({
      next: (res: any) => {
        this.count = res.holiday.count
        this.holidayData = res.holiday.rows

        this.loader = false
      },
      error: (err: any) => {
        this.handleError(err.error)
      }
    })



  }


  ngOnDestroy(): void {
    $("#add-holiday").remove();
  }
  openEdit(data: any) {
    UIkit.modal("#add-holiday").show();

    this.isEdit = true;

    var temp = {
      "id": data.id,
    }
    this.masterService.getHolidayListdataByID(temp).subscribe({
      next: (res: any) => {
        this.editData.next(res)
      },
      error: (err: any) => {
        this.handleError(err.error)
      }
    })

    // this.editData.next(data)
    UIkit.modal("#add-holiday").show();
  }
  deleteHolidaylist(id: any) {
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
          "id": id
        }
        this.masterService.deleteHolidaylist(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'The corresponding holiday record has been deleted.',
              'success'
            )
            // this.handleSuccess("Delete booking Successfully")
            this.getProfile();
            this.getHolidayList()
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
