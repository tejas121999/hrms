import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
declare var UIkit: any;
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-manage-mark-attendance',
  templateUrl: './manage-mark-attendance.component.html',
  styleUrls: ['./manage-mark-attendance.component.scss'],
})
export class ManageMarkAttendanceComponent implements OnInit, OnDestroy {
  limit: number = 10;
  offset: number = 0;
  attendence: any = [];
  currentDate: any = new Date();
  count: any;
  currentPage: number = 1;
  loader: boolean = false;
  editData = new Subject<any>();
  calanderData = new Subject<any>();
  searchText = new FormControl('');
  isEdit: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  permission: any;
  accessPermission: any;

  constructor(
    private router: Router,
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile();
    // this.getAttendence()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchAttendance(query)
    })
  }
  ngOnDestroy(): void {
    $("#add-mark-attendance").remove();
    $("#view-attendance").remove();
  }

  searchAttendance(data: any) {

  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS),
    };
    this.permission = this.accessPermission?.accessdata;
    console.warn(this.permission.add_denied_request);
    let today: any = new Date();
    today = moment.utc(today).add(-1, 'days').format('YYYY-MM-DD');
    this.getDateCal(today);
  }
  getDateCal(date: any) {
    this.currentDate = moment.utc(date).add(1, 'days').format('YYYY-MM-DD');
    console.log('log data ', this.currentDate);

    this.getAttendence();
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }

  getAttendence() {
    this.loader = true;

    var temp = {
      owner_id: this.userData?.data?.owner_id,
      attendence_date: this.currentDate,
      status: ['present', 'absent', 'half_day'],
      limit: this.limit,
      offset: this.offset,
    };
    this.masterService.getAllAttendence(temp).subscribe({
      next: (res: any) => {
        this.attendence = [];
        this.attendence = res.attendence.rows;

        let result: any = [];
        this.attendence = res.attendence.rows.filter((a: any) => {
          console.log(a);

          let flag = result.includes(a.employee_id);
          if (flag) return false;
          else {
            result.push(a.employee_id);
            return true;
          }
        });

        console.log(this.attendence);

        this.count = res.attendence.count;
        this.loader = false;
      },
      error: (e: any) => {
        this.handleError(e);
      },
    });
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.offset = (event - 1) * this.limit;
    this.getAttendence();
  }

  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user);
    UIkit.modal('#add-mark-attendance').show();
  }

  openCalender(user: any) {
    this.calanderData.next(user);
    UIkit.modal('#view-attendance').show();
  }
}
