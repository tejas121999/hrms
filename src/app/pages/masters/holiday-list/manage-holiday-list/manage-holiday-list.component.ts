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
export class ManageHolidayListComponent implements OnDestroy, OnInit {
  loader: boolean = false;
  searchText = new FormControl('');
  limit: number = 10
  offset: number = 0
  editData = new Subject<any>();
  isEdit: boolean = false;
  count: any
  currentPage: any
  holidayData: any[] = []
  userData: any;
  preferenceKeys = PreferenceKeys;
  permission: any;
  accessPermission: any;
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile()
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
      "holiday_owner_id": 23,
      "q": "hol",
      "limit": 10,
      "offset": 0
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

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    };
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS),
    };
    this.permission = this.accessPermission?.accessdata;
  }

  getHolidayList() {
    this.loader = true

    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "holiday_owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getHoliday(temp).subscribe({
      next: (res: any) => {
        this.count = res.holiday.count
        this.setData(res.holiday.rows)
        this.loader = false
      },
      error: (err: any) => {
        this.handleError(err.error)
      }
    })


  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-holiday-list").show();
  }


  ngOnDestroy(): void {
    $("#add-holiday-list").remove();
  }
  deleteHoliday(data: any) {
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
        this.masterService.deleteHoliday(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Hoilday data has been deleted.',
              'success'
            )
            this.getHolidayList()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })

  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getHolidayList()
  }

  setData(res: any) {
    console.log(res)
    this.holidayData = res
  }

}
