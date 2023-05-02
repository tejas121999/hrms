import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import * as moment from 'moment';
import { ManageMarkAttendanceComponent } from '../manage-mark-attendance/manage-mark-attendance.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-mark-attendance',
  templateUrl: './add-mark-attendance.component.html',
  styleUrls: ['./add-mark-attendance.component.scss'],
})
export class AddMarkAttendanceComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;
  buttonLoader: boolean = false;
  loader: boolean = false;
  limit: number = 10000;
  offset: number = 0;
  loadedData: any = [];
  resDate: any = [];
  getstartsTime: any;
  getendsTime: any;
  startsTime: any;
  endsTime: any;
  todate: any;
  count: any;
  status = 'present';
  userData: any;
  preferenceKeys = PreferenceKeys;
  employeeData: any = [];
  bulkattendance: any = [];
  fullempdata: any = [];
  saveRecord: any = [];
  unbulkattendance: any = [];

  saveAllready: any = [];
  id: any;
  currentDate = new Date();
  today = new Date();

  shiftData: any = [];

  payloade: any[] = [];
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private managemarkattendance: ManageMarkAttendanceComponent
  ) { }

  addAttendenceForm = new FormGroup({
    formName: new FormControl('addAttendenceForm'),
    emp_attendence_name: new FormControl(''),
    attendence_date: new FormControl(''),
    status: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
  });

  ngOnInit(): void {
    this.getProfile();
    this.setupEdit();
    this.getEmployee();
    this.preparePayloade();
    this.getAttendence(this.currentDate);

    // if (this.isEdit) {
    //   this.addAttendenceForm.get('attendence_date')?.disable();
    //   this.addAttendenceForm.get('emp_attendence_name')?.disable();
    // }
    // this.addAttendenceForm.get('attendence_date')?.disable();
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
    this.managemarkattendance.getAttendence();
    this.loader = false;
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
  }

  reset() {
    this.getEmployee();
    this.isEdit = false;
    this.addAttendenceForm.reset();
    this.currentDate = new Date();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    this.addAttendenceForm.patchValue({
      formName: 'addAttendenceForm',
    });
    UIkit.modal('#add-mark-attendance').hide();
    this.status = 'present';
  }

  dateFun(e: any) {
    let data = new Date(e);
    this.getAttendence(data);
  }

  getAttendence(date: any) {
    this.loader = true;
    var currentDate = date;

    currentDate.setHours(0, 0, 0, 0);

    var temp = {
      owner_id: this.userData?.data?.owner_id,
      attendence_date: currentDate,
      status: [],
    };
    this.masterService.getAllAttendence(temp).subscribe({
      next: (res: any) => {
        this.loadedData = [];

        this.loadedData = res.attendence.rows;
        // console.log(this.loadedData?.emp_attendence_data?.first_name);
        // console.log(this.loadedData);
      },
      error: (e: any) => {
        this.handleError(e);
      },
    });
  }

  getEmployee() {
    this.loader = true;
    var temp = {
      isDeleted: false,
      limit: this.limit,
      offset: this.offset,
      isExitDetail: false,
      user_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getEmployee(temp).subscribe({
      next: (res: any) => {
        this.count = res.employee.count;

        this.employeeData = res.employee.rows.filter((filter: any) => {
          return !this.loadedData.find((find: any) => {
            return filter.id === find.employee_id;
          });
        });
        setTimeout(() => {
          this.employeeData.forEach((data: any) => {
            this.shiftData.push({
              emp_id: data.id,
              start_time: data.shift_data.start_time,
              end_time: data.shift_data.end_time,
            });
          });
          this.loader = false;
        }, 100);
      },
      error: (err: any) => {
        this.handleError(err);
        this.loader = false;
      },
    });
  }

  preparePayloade() {
    // console.log(
    //   "this.addAttendenceForm.get('emp_attendence_name')?.value",
    //   this.addAttendenceForm.get('emp_attendence_name')?.value
    // );
    let attendance_name: any = this.addAttendenceForm.get(
      'emp_attendence_name'
    )?.value;
    attendance_name.forEach((data: any) => {
      var temp = {
        status: this.addAttendenceForm.get('status')?.value,
        emp_attendence_name: data,
        attendence_date: this.addAttendenceForm.get('attendence_date')?.value,
      };
      this.payloade.push(temp);
    });
  }

  addAttendence() {
    this.fullempdata = [];

    var attendenceDate: any = moment(
      this.addAttendenceForm.get('attendence_date')?.value
    ).format('YYYY-MM-DD');

    let attendance_name: any = this.addAttendenceForm.get(
      'emp_attendence_name'
    )?.value;

    attendance_name.forEach((data: any) => {
      // console.log('data data data ', data);

      // console.log(attendenceDate)
      var temp = {
        owner_id: this.userData?.data?.owner_id,
        status: this.addAttendenceForm.get('status')?.value,
        employee_id: data,
        date: attendenceDate,
        attendence_date: attendenceDate,
      };
      this.payloade.push(temp);
    });
    this.buttonLoader = true;

    this.shiftData.forEach((parentLoop: any) => {
      this.payloade.forEach((childLoop) => {
        //only selected box data
        if (parentLoop.emp_id == childLoop.employee_id) {
          this.bulkattendance.push({
            attendence_date: attendenceDate,
            employee_id: childLoop?.employee_id,
            owner_id: childLoop?.owner_id,
            status: childLoop?.status,
            inTime: parentLoop?.start_time,
            outTime: parentLoop?.end_time,
          });
        } else {
          this.unbulkattendance.push({
            attendence_date: attendenceDate,
            employee_id: childLoop?.employee_id,
            owner_id: childLoop?.owner_id,
          });
        }
      });
    });

    this.preparePayloade;
    var sendPayLoad = {
      date: attendenceDate,
      attendence: this.bulkattendance,
    };

    // var attendenceDate: any = moment
    // .utc(this.addAttendenceForm.get('attendence_date')?.value)
    // .format('YYYY-MM-DD HH:mm:ss');
    this.fullempdata = this.employeeData.filter((emp: any) => {
      return this.bulkattendance.find((filterEmpdetails: any) => {
        return emp.id === filterEmpdetails?.employee_id;
      });
    });
    let noShiftData = this.employeeData.filter((emp: any) => {
      return this.unbulkattendance.find((filterEmpdetails: any) => {
        return emp.id === filterEmpdetails?.employee_id;
      });
    });

    // console.log(' this.unbulkattendance', this.unbulkattendance);
    let unAssignShiftData: any = [];
    noShiftData.forEach((unShiftData: any) => {
      // console.log('unShiftDataunShiftDataunShiftDataunShiftDataunShiftData ',unShiftData);

      if (unShiftData?.shift_data == null) {
        this.handleError(
          `Please Assing Shift  To ${unShiftData?.first_name}  ${unShiftData?.last_name}.`
        );
      }
    });

    // console.log('this.noShiftData ', noShiftData);

    console.log(
      'sendPayLoad sendPayLoad sendPayLoad',
      sendPayLoad.attendence.length
    );

    if (sendPayLoad.attendence.length !== 0) {
      this.masterService.addAttendence(sendPayLoad).subscribe({
        next: (res: any) => {
          res.addAttendence.forEach((resData: any) => {
            this.resDate.push(resData.employee_id);
          });

          //   console.log('after save data res success full id', this.resDate);

          this.buttonLoader = false;
          this.saveRecord = [];
          // this.handleSuccess('Attendance Added Successfully');
          this.saveRecord = this.fullempdata.filter((payloadData: any) => {
            return this.resDate.find((resData: any) => {
              return payloadData.id === resData;
            });
          });
          //    console.log('after save data res success full id', this.saveRecord);

          this.saveRecord.forEach((successFull: any) => {
            console.log(successFull);
            this.handleSuccess(
              successFull.first_name + 'Attendance Added Successfully'
            );
          });
          this.saveRecord = [];

          this.saveAllready = this.fullempdata.filter((payloadData: any) => {
            return !this.resDate.find((resData: any) => {
              return payloadData.id === resData;
            });
          });
          this.saveAllready.forEach((allreadyFull: any) => {
            this.handleError(
              allreadyFull.first_name + ' Attendance Already Marked'
            );
          });
          this.saveAllready = [];

          this.reset();
        },
        error: (e: any) => {
          console.log(e.error.message);
          this.buttonLoader = false;
          this.reset();
          // this.addAttendenceForm.reset();
          this.addAttendenceForm.patchValue({
            formName: 'addAttendenceForm',
          });
          this.handleError(e.error.message);
        },
      });
    } else {
      this.reset();
    }
  }

  setupEdit() {
    this.managemarkattendance.editData.subscribe({
      next: (data: any) => {
        console.log('datadatadatadatadatadatadata ', data);
        console.log(data.status);
        this.getstartsTime = data.inTime;
        this.getendsTime = data.outTime;

        if (data.status == 'absent') {
          console.log('true');
          this.startsTime = '';
          this.endsTime = '';
        } else {
          this.startsTime = data.inTime;
          this.endsTime = data.outTime;
        }

        // var attendenceDate: any = moment(data?.attendence_date).add(1, 'days').format("YYYY/MM/DD")
        // var temp = {
        this.isEdit = true;
        this.id = data.id;
        this.addAttendenceForm
          .get('emp_attendence_name')
          ?.patchValue(data.employee_id);
        this.addAttendenceForm
          .get('attendence_date')
          ?.patchValue(data.attendence_date);
        this.addAttendenceForm.get('status')?.patchValue(data.status);
        this.addAttendenceForm.get('start_time')?.patchValue(data.inTime);
        this.addAttendenceForm.get('end_time')?.patchValue(data.outTime);
        // this.addAttendenceForm.patchValue(data)
        this.addAttendenceForm.get('attendence_date')?.disable();
        this.addAttendenceForm.get('emp_attendence_name')?.disable();
      },
      error: (e) => {
        this.handleError(e);
        this.reset();
      },
    });
  }

  clearDatawhileAbsent() {
    this.startsTime = '';
    this.endsTime = '';
  }
  AddDatawhileAbsent() {
    this.startsTime = this.getstartsTime;
    this.endsTime = this.getendsTime;
  }
  getDefference(startDate: any, endDate: any) {
    var diff: any = endDate.getTime() - startDate.getTime();
    var days: any = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours: any = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    var minutes: any =
      Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
    var seconds: any =
      Math.floor(diff / 1000) -
      (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
    return { hour: hours, minute: minutes, second: seconds };
  }
  editMarkAttendance() {
    var attendenceDate: any = moment(
      this.addAttendenceForm.get('attendence_date')?.value
    ).format('YYYY/MM/DD');

    var start_time: any = this.addAttendenceForm.get('start_time')?.value;
    var end_time: any = this.addAttendenceForm.get('end_time')?.value;
    start_time = new Date(start_time);
    end_time = new Date(end_time);
    var diff: any = end_time.getTime() - start_time.getTime();
    var days: any = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours: any = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    console.log(hours);
    var temp = {
      id: this.id,
      attendence: {
        attendence_date: attendenceDate,
        status: this.addAttendenceForm.get('status')?.value,
        inTime: this.addAttendenceForm.get('start_time')?.value || null,
        outTime: this.addAttendenceForm.get('end_time')?.value || null,
        hours: hours,
      },
    };

    this.masterService.editMarkAttendance(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess('Attendance updated successfully');
        this.reset();
        this.buttonLoader = false;
      },
      error: (e: any) => {
        this.handleError('server error');
      },
    });
  }
}
function getAttendance() {
  throw new Error('Function not implemented.');
}
