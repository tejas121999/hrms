  import { ActivatedRoute, ParamMap } from '@angular/router';
  import { MasterServices } from 'src/app/services/master-services';
  import * as moment from 'moment';
  import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
  import {
    Component,
    OnInit,
    ViewChild,
    forwardRef,
    ElementRef,
    AfterViewInit,
  } from '@angular/core';
  import { CalendarOptions, Calendar, EventClickArg } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin, {
    DateClickArg,
    EventDragStopArg,
  } from '@fullcalendar/interaction';
  import { FullCalendarComponent } from '@fullcalendar/angular';
  import { ManageMarkAttendanceComponent } from '../manage-mark-attendance/manage-mark-attendance.component';
  import { EventApi } from 'fullcalendar';
  declare var UIkit: any;
  // import { CalendarOptions } from '@fullcalendar/angular';

  @Component({
    selector: 'app-view-attendance',
    templateUrl: './view-attendance.component.html',
    styleUrls: ['./view-attendance.component.scss'],
  })
  export class ViewAttendanceComponent implements OnInit, AfterViewInit {
    @ViewChild('data') el: ElementRef | undefined;
    calDate: any = [];
    month:any ;
    empID = 0;
    year:any;
    dateChange: any;
    messageEvent: any = [];
    viewName = '';
    displayDateDetails: any = [];
    date: any = new Date();
    userid: any;
    chatData: any = [];
    userData: any;
    loader = true;
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
    currentDate: any;

    constructor(
      private route: ActivatedRoute,
      private masterService: MasterServices,
      private managemarkattendance: ManageMarkAttendanceComponent,
      private appPreference: AppPreference
    ) {}

    ngOnInit() {
      this.getProfile();
      this.setupEdit();
      this.currentDate = new Date();
      this.month=  this.currentDate.getMonth()
      this.year=this.currentDate.getFullYear()

      for (var i = 1; i <= 31; i++) {
        let indate = `${this.year}-${this.month}-${i}`;
        var d = new Date(indate);
        var newDate = new Date(d.getFullYear(), d.getMonth(), i);
        let dat: any = moment(d).format(moment.HTML5_FMT.DATE);
        if (newDate.getDay() == 0) {
          //if Sunday
          this.sun.push({
            status: 'weekly off',
            attendence_date: dat,
          });
        }
        if (newDate.getDay() == 6) {
          //if Saturday
          this.sat.push({
            status: 'weekly off',
            attendence_date: dat,
          });
        }
      }

      function daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
      }

      forwardRef(() => Calendar);
    }
    ngAfterViewInit() {
      this.calDate = this.fullcalendar?.options?.headerToolbar;
    }
    getProfile() {
      this.userData = {
        data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      };
    }

    setupEdit() {
      this.managemarkattendance.calanderData.subscribe({
        next: (data: any) => {
          this.viewName =
            data?.emp_attendence_data.first_name +
            ' ' +
            data?.emp_attendence_data.last_name;
          this.empID = +data.employee_id;
          this.calanderLoadData(data.employee_id, this.month, this.year);
        },
        error: (e: any) => {
          this.reset();
        },
      });
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
          console.log(this.leaveData);

          let attendence_date: any = [];

          res.attendence.forEach((date: any) => {
            console.log('datedatedatedatedatedatedate ',date);

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


                if (date?.attendence?.status === 'absent') {
                  attendence_date.push({
                    title: 'absent',
                    date: days,
                    color: ' #E9C3C6',
                    borderColor: '#C1121F',
                    employee_id: date?.attendence?.employee_id,

                  });

                } else if (date?.attendence?.status === 'present'){
                  attendence_date.push({
                    title: 'Present',
                    date: days,
                    color: '#CDE7D2',
                    employee_id: date?.attendence?.employee_id,
                    inTime: date?.attendence?.inTime,
                    outTime: date?.attendence?.outTime,
                  });

                }else{


                }

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
            console.log('attendence_date  ', attendence_date);

            this.getData(moment(currentDate).format(moment.HTML5_FMT.DATE));
            setTimeout(() => {
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
                  left: 'prev,next',
                  center: 'title',
                  right: '',
                },

                events: this.events,
                eventClick: this.handleEventClick.bind(this),
                dateClick: this.handleDateClick.bind(this),
                datesSet: this.handleEvents.bind(this),
                // eventDragStop: this.handleEventDragStop.bind(this),

              };
            }, 100);
          });
        },
        error: (err: any) => {},
      });
    }
    handleDateClick(arg: DateClickArg) {
      console.log(arg);
    }
    handleEvents(event: EventApi | any): void {
      this.month = moment(event.view.title).month() + 1;
      this.year = moment(event.view.title).year();

      this.calanderLoadData(this.empID, this.month, this.year);
      this.displayDateDetails = [];

      // console.log(moment(event).month()+1);
    }

    getData(getData: any) {
      this.displayDateDetails = this.events.find((res: any) => {
        return res.date === getData;
      });
    }
    handleEventClick(arg: EventClickArg) {
      //logic implement
      this.displayDateDetails = [];
      let getDate = moment(arg?.event._instance?.range.start).format(
        moment.HTML5_FMT.DATE
      );
      this.getData(getDate);

      // console.log(this.displayDateDetails);
    }

    // handleEventDragStop(arg: EventDragStopArg) {
    //   console.log(arg);
    // }

    reset() {
      UIkit.modal('#view-attendance').hide();
      this.loader = true;
    }
  }
