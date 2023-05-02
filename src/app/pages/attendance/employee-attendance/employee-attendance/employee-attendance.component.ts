import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventApi, EventClickArg } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from '@fullcalendar/interaction';
import * as moment from 'moment';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.scss'],
})
export class EmployeeAttendanceComponent implements OnInit {
  calDate: any = [];
  month = 3;
  empID = 0;
  year = 2023;
  dateChange: any;
  messageEvent: any = [];
  viewName = '';
  displayDateDetails: any = [];
  date: any = new Date();
  userid: any;
  chatData: any = [];
  userData: any;
  loader: any = true;
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  presentDays: number = 0;
  absentDays: number = 0;
  events: any = [];
  lateMark: any = [];
  currentData = new Date();
  leaveData: any = [];
  leaveDateData: any = [];
  sat: any = [];
  sun: any = [];
  visibleEdit: boolean = false;
  selectDate: any;
  inTime: any;
  outTime: any;
  departmentdata: any = [];
  manage_name: any;
  managenameid: any;


  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) {}

  regularization = new FormGroup({
    formName: new FormControl('regularization'),
    date: new FormControl(''),
    checkin_time: new FormControl(''),
    checkout_time: new FormControl(''),
    reason: new FormControl(''),
    managerName:new FormControl(''),
  });

  ngOnInit(): void {
    this.getProfile();

    this.calanderLoadData(
      this.userData?.data?.user_emp_ID,
      this.month,
      this.year
    );
  }

  ngAfterViewInit() {
    this.calDate = this.fullcalendar?.options?.headerToolbar;
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
    this.getDepartmentid();
  }
  getDepartmentid() {
    let temp = {
      id: this.userData.data.department_id,
    };
    this.masterService.getDepartmentid(temp).subscribe({
      next: (res) => {
        this.departmentdata = res;
        this.departmentdata.department.forEach((element: any) => {
          this.manage_name =
            element.manager_data.first_name +
            ' ' +
            element.manager_data.last_name;
          this.managenameid = element.manager_id;

          console.log(this.manage_name);
        });
      },
      error: (e: any) => {
        this.handleError(e);
      },
    });
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }
  calanderLoadData(emp: number, month: number, year: number) {
    console.log(emp, month, year);

    var temp = {
      //  employee_id: this.userData?.data?.user_emp_ID,

      employee_id: emp,
      isApproved: 2,
      month: month,
      year: year,
      owner_id: this.userData?.data?.owner_id,
    };
    console.log(temp);
    this.masterService.getMonthlyAttendance(temp).subscribe({
      next: (res: any) => {
        console.log(res);
        this.leaveData = res.attendence;

        let attendence_date: any = [];

        res.attendence.forEach((date: any) => {
          let currentDate: any = new Date();
          currentDate = moment(currentDate).format(moment.HTML5_FMT.DATE);
          let dates: any;
          dates = moment(date.date);
          dates = moment(dates._i, 'DD/MM/YYYY');
          let days = moment(dates._d).format(moment.HTML5_FMT.DATE);
          if (days <= currentDate) {
            switch (date.status) {
              case 'absent':
                attendence_date.push({
                  title: 'absent',
                  date: days,
                  color: ' #E9C3C6',
                  borderColor: '#C1121F',
                });
                break;

              case 'present':
                attendence_date.push({
                  title: 'Present',
                  date: days,
                  color: '#CDE7D2',
                  employee_id: date?.attendence?.employee_id,
                  inTime: date?.attendence?.inTime,
                  outTime: date?.attendence?.outTime,
                });
                break;
              case 'holiday':
                let leavetype;
                if (!date?.holiday?.holiday_name) {
                  leavetype = 'Week Off';
                } else {
                  leavetype = date?.holiday?.holiday_name;
                }
                attendence_date.push({
                  title: 'holiday',
                  date: days,
                  color: '#F7DABF',
                  leavetype: leavetype,
                });

                break;
              case 'leave':
                attendence_date.push({
                  title: 'leave',
                  date: days,
                  color: '#BFD5E1',
                  leavesName: date?.leaves?.leave_name,
                  from_date: date?.leaves?.from_date,
                  to_date: date?.leaves?.to_date,
                });

                break;

              default:
            }
          } else {
          }

          this.events = attendence_date; //calander print data
          setTimeout(() => {
            this.getData(currentDate);
            this.loader = false;

            const convert = (unique: any[]) => {
              const res: any = {};
              attendence_date.forEach((obj: any) => {
                // title counts
                const key = `${obj.color}${obj.borderColor}${obj['title']} `;
                if (!res[key]) {
                  unique;
                  res[key] = { ...obj, count: 0 };
                }
                res[key].count += 1;
              });
              return Object.values(res);
            };

            this.messageEvent = convert(attendence_date);

            this.events.forEach((e: { [x: string]: string }) => {
              if (e['title'] == 'present') {
                this.presentDays++;
              } else {
                this.absentDays++;
              }
            });
            this.calendarOptions = {
              plugins: [
                dayGridPlugin,
                interactionPlugin,
                dayGridPlugin,
                interactionPlugin,
              ],
              editable: true,

              headerToolbar: {
                left: '',
                center: 'prev,title,next',
                right: '',
              },

              eventClick: this.handleEventClick.bind(this),
              dateClick: this.handleDateClick.bind(this),
              datesSet: this.handleEvents.bind(this),
              // eventDragStop: this.handleEventDragStop.bind(this),

              events: this.events,
            };
          }, 1000);
        });
      },
      error: (err: any) => {},
    });
  }

  saveRegularize() {
    let temp = {
      date: this.regularization.get('date')?.value,
      checkin_time: this.regularization.get('checkin_time')?.value,
      checkout_time: this.regularization.get('checkout_time')?.value,
      reason: this.regularization.get('reason')?.value,
      emp_id: this.userData.data.user_emp_ID,
      owner_id: this.userData.data.owner_id,
      manager_id: this.managenameid,
      isApproved: 0,
      shift_type: 170,
    };

    this.masterService.saveRegularize(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess('Regularize add successfully');

        this.regularization.reset();
      },
      error: (e: any) => {

        this.regularization.reset();

      },
    });
    console.log(temp);
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }
  handleDateClick(arg: DateClickArg) {
    console.log(arg);
  }

  handleEvents(event: EventApi | any): void {
    this.month = moment(event.view.title).month() + 1;
    this.year = moment(event.view.title).year();
    this.calanderLoadData(
      this.userData?.data?.user_emp_ID,
      this.month,
      this.year
    );
  }

  getData(getData: any) {
    this.displayDateDetails = this.events.find((res: any) => {
      return res.date === getData;
    });

    console.log(this.displayDateDetails);
    this.selectDate = this.displayDateDetails.date;
    this.inTime = this.displayDateDetails.inTime;
    this.outTime = this.displayDateDetails.outTime;

  }

  handleEventClick(arg: EventClickArg) {
    //logic implement
    this.displayDateDetails = [];
    let getDate = moment(arg?.event._instance?.range.start).format(
      moment.HTML5_FMT.DATE
    );
    this.getData(getDate);

    console.log(this.displayDateDetails);
  }
  onclick() {
    this.visibleEdit = !this.visibleEdit;
  }
}
