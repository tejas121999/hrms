import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageLeaveTrackComponent } from '../manage-leave-track/manage-leave-track.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-leave-track',
  templateUrl: './add-leave-track.component.html',
  styleUrls: ['./add-leave-track.component.scss'],
})
export class AddLeaveTrackComponent implements OnInit {
  loader: boolean = false;
  @Input('isEdit') isEdit: boolean = false;
  leaveId = 0
  userData: any;
  fdate: any;
  to_name = '';
  Apply_Leave = 0
  days: any;
  leaveType: any;
  no_of_days: any;
  managers: any = [];
  managerName: any;
  balanceDateToggle = false;
  clearToDate: any;
  clearFromDate: any;
  leaveTrackForm!:FormGroup;



  id: any;
  ids: any;

  constructor(
    private fb:FormBuilder,
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageLeaveTrack: ManageLeaveTrackComponent
  ) {

  }


  preferenceKeys = PreferenceKeys;
  currentPage: any;
  limit: number = 10;
  offset: number = 0;
  leaveData: any[] = [];
  count: any;
  leaveConfig: any = [];
  managerIds: any = [];
  minimumDate: any;
  date: any = new Date();
  editData = new Subject<any>();
  managerNam: any[] = [];
  isChecked: any;
  recManager: any = [];
  Managerdata: any = [];
  departmentdata: any = [];
  managename: any;
  balCount = 0;
  managenameid: any;
  removeEmpIddelete: any = [];
  selectedDate: any;
  removeEmpIddeletes: any = [];
  managerText: any = [];
  unremoveId: any = [];
  values: any = [];
  AddEmpId: any = [];
  updatedEmpData: any = [];

  ngOnInit(): void {
    this.getProfile();
    this.getLeaveConfig();
    this.getDepartmentid();
    this.getLeavenmae();
    this.getEmployee();
    this.setupEdit();
    this.initializeForm();
    // this.minimumDate = new Date(this.date.toLocaleString('default', { month: 'short' }) +' ' + this.date.getDate() +', ' +((this.date.getFullYear())));

    this.managerNam = this.userData?.data?.user_emp_ID;
  }
  fromDate(e: any) {
    this.minimumDate = new Date(e);
  }
  initializeForm(){

    this.leaveTrackForm =this.fb.group({
      formName: new FormControl('leaveTrackForm'),
      leave_type: new FormControl('', [Validators.required]),
      available_leave: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      from_date: new FormControl('', [Validators.required]),
      to_date: new FormControl('', [Validators.required]),
      total_leave: new FormControl(''),
      reason_leave: new FormControl('', [Validators.required]),
      manage_name: new FormControl(''),
      other_manage_names: new FormControl(''),
    });
  }


  getLeaveConfig() {
    var temp = {
      // configuration_id: this.userData.data.leave_config_id,
      "company_id":this.userData?.data?.company_id,
      "owner_id":this.userData?.data?.owner_id,
    };

    this.masterService.leaveConfigs(temp).subscribe({
      next: (res: any) => {

        this.leaveConfig = res.configuration;
        console.log('Config leave data ', this.leaveConfig);
        this.leaveType = res.leave;
        this.loader=false
        console.log('leaves', res.leave);
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }
  gettoDate(dateSent: any) {
    this.selectedDate = dateSent;
    let day = Math.floor(
      (Date.UTC(
        dateSent.getFullYear(),
        dateSent.getMonth(),
        dateSent.getDate()
      ) -
        Date.UTC(
          this.minimumDate.getFullYear(),
          this.minimumDate.getMonth(),
          this.minimumDate.getDate()
        )) /
      (1000 * 60 * 60 * 24)
    );

    this.days = day + 1;

    this.Apply_Leave = +this.no_of_days;

    if (this.leaveConfig?.leave_balance?.clb_1 && this.leaveId == this.leaveConfig?.leave_balance?.clb_11) {
      console.log('calling first ');
      this.Apply_Leave = this.Apply_Leave + +this.leaveConfig?.leave_balance?.clb_2;
      console.log(
        'calling count ',
        this.Apply_Leave + 'total date',
        this.no_of_days
      );


    } else {
      console.log(' ');

      if  (this.Apply_Leave > this.days || this.Apply_Leave == this.days)
       {
        this.balanceDateToggle = false;
      } else {
        this.balanceDateToggle = true;
      }
    }
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
    this.getDepartmentid();
  }
  getLeavenmae() {
    this.loader = true;
    var temp = {
      leave_emp_id: this.userData.data.user_emp_ID,
      "isDeleted": false
    };

    this.masterService.getLeave(temp).subscribe({
      next: (res: any) => {
        this.loader = false;

        this.leaveType = res.leave;
        console.log('leaves', res.leave);
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }

  getLeaveDay(i: any) {
    this.clearFromDate = '';
    this.clearToDate = '';
    this.days = '';
    this.no_of_days = +i.no_of_days;

    this.leaveId = i.id

    console.log('Leave Application ', this.leaveId);

    let temp = {
      emp_id: this.userData.data.user_emp_ID,
      leave_id: i.id,

      //  "emp_id":109,
      //   "leave_id":60
    };

    this.masterService.getBalLeave(temp).subscribe({
      next: (res: any) => {
        console.log(res);

        let balanceLeaves = 0;
        if (!res.package) {
          balanceLeaves;
          console.log('avi ', balanceLeaves);
        } else {
          res.package.forEach((ins: any) => {
            if (ins.isApproved == 2) {
              console.log(ins.count);
              balanceLeaves = ins.count;
              console.log('avi ', balanceLeaves);

              setTimeout(() => {
                this.no_of_days = +i.no_of_days - balanceLeaves;
              }, 100);
            }
          });
        }
      },
      error: (e: any) => { },
    });
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }
  getDepartmentid() {
    let temp = {
      id: this.userData.data.department_id,
    };
    this.masterService.getDepartmentid(temp).subscribe({
      next: (res) => {
        this.departmentdata = res;
        this.departmentdata.department.forEach((element: any) => {
          this.managename = element.manager_data.first_name;
          this.managenameid = element.manager_id;

        });

      },
      error: (e: any) => {
        this.handleError(e);
      },
    });
  }

  addleavetrack() {


    if (this.leaveTrackForm.invalid ) {
      this.leaveTrackForm.markAllAsTouched();
      console.log('calling data 1');

    }else if(this.balanceDateToggle){
      return

    }     else {
      console.log('calling data 3')
      var temp = {
        leaveRequest: {
          emp_id: this.userData?.data?.user_emp_ID,
          leave_type: this.leaveTrackForm.get('leave_type')?.value,
          manager_id: this.managenameid,
          owner_id: this.userData?.data?.owner_id,
          other_manager_name: 10,
          available_leave: this.leaveTrackForm.get('available_leave')?.value,
          from_date: this.leaveTrackForm.get('from_date')?.value,
          to_date: this.leaveTrackForm.get('to_date')?.value,
          total_leave_days: this.leaveTrackForm.get('total_leave')?.value,
          reason: this.leaveTrackForm.get('reason_leave')?.value,
          isApproved: 0,
        },
        otherRequest: [null],
      };
      console.log('=======', temp);

      this.masterService.addLeaveTrack(temp).subscribe({
        next: (res: any) => {
          this.manageLeaveTrack.getLeaveTrack();
          this.handleSuccess('Leave applied successfully.');
          this.reset();
        },
        error: (e: any) => {
          this.handleError('error');
        },
      });
    }
  }

  checkValue(e: any) {
    this.isChecked = e.target.checked;
  }

  setupEdit() {
    this.manageLeaveTrack.editData.subscribe({
      next: (data: any) => {
        this.ids = data.id;
        this.recManager = this.managerIds;
        let temp = {
          id: data.id,
        };
        this.masterService.getLeaveTrackId(temp).subscribe({
          next: (data: any) => {
            let managerId = data.otherRequests;
            this.Managerdata = data.otherRequests;
            managerId.forEach((element: any) => {
              this.managerIds.push(element.request_user_id);
            });
            let temp = {
              id: data.sendRequest.manager_id,
            };
            this.masterService.getDepartmentid(temp).subscribe({
              next: (res) => {
                this.departmentdata = res;
                this.departmentdata.department.forEach((element: any) => {
                  this.managename = element.first_name;
                  this.managenameid = element.manager_id;
                  this.leaveTrackForm
                    .get('manage_name')
                    ?.patchValue(element.first_name);
                });
              },
              error: (e: any) => {
                this.handleError(e);
              },
            });
            data.otherRequests;

            (this.isEdit = true),
              this.leaveTrackForm
                .get('leave_type')
                ?.patchValue(data.sendRequest.leave_type),
              // this.leaveTrackForm.get('manage_name')?.patchValue(data.sendRequest.manager_id),

              this.leaveTrackForm
                .get('from_date')
                ?.patchValue(data.sendRequest.from_date),
              this.leaveTrackForm
                .get('to_date')
                ?.patchValue(data.sendRequest.to_date),
              this.leaveTrackForm
                .get('total_leave')
                ?.patchValue(data.sendRequest.total_leave_days),
              this.leaveTrackForm
                .get('reason_leave')
                ?.patchValue(data.sendRequest.reason),
              this.leaveTrackForm
                .get('available_leave')
                ?.patchValue(data.sendRequest.available_leave),
              this.leaveTrackForm
                .get('other_manage_names')
                ?.patchValue(this.managerIds);
          },
        });
      },
      error: (e: any) => {
        this.handleError(e);
        this.reset();
      },
    });
  }
  reset() {

    // this.leaveTrackForm.reset();
    window.location.reload()
    this.getDepartmentid();
    this.initializeForm();

    this.leaveTrackForm.patchValue({
      formName: 'leaveTrackForm',
    });
    UIkit.modal('#leave-track').hide();
    this.manageLeaveTrack.getLeaveTrack();

  }
  getEmployee() {
    this.loader = true;
    var temp = {
      isDeleted: false,
      limit: 1000,
      offset: this.offset,
      user_owner_id: this.userData?.data?.owner_id,
      "isExitDetail": false
    };
    this.masterService.getEmployee(temp).subscribe({
      next: (res: any) => {
        this.managerName = res.employee.rows;
        const index = this.managerName.findIndex(
          (obj: any) => obj.id === this.managenameid
        );
        if (index !== -1) {
          this.managerName.splice(index, 1);
        }
        const i = this.managerName.findIndex(
          (obj: any) => obj.id === this.userData?.data?.user_emp_ID
        );
        if (i !== -1) {
          this.managerName.splice(i, 1);
        }
        this.loader = false;
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error');
        }
      },
    });
  }

  updateleavetrack() {
    this.managerText = this.leaveTrackForm.get('other_manage_names')?.value;
    var temp = {
      leaveRequest: {
        id: this.ids,
        from_date: this.leaveTrackForm.get('from_date')?.value,
        to_date: this.leaveTrackForm.get('to_date')?.value,
        reason: this.leaveTrackForm.get('reason_leave')?.value,
        total_leave: this.leaveTrackForm.get('total_leave')?.value,
        isDeleted: false,
        isApproved: 0,
      },
      otherRequest: this.managerText,

      deletedOtherRequests: this.removeId,
    };

    this.masterService.updateleavetrack(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess('Update Leave successfully');
        this.reset();
        this.removeId = [];
        this.managerText = [];
      },
      error: (e: any) => {
        this.handleError('error');
      },
    });
  }
  removeId: any = [];

  onRemove(e: any) {
    this.removeId.push(e.value.id);
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }
}
