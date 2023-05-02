import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
import { CalendarOptions, Calendar, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from '@fullcalendar/interaction';
import { EventApi } from 'fullcalendar';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-leave-track',
  templateUrl: './manage-leave-track.component.html',
  styleUrls: ['./manage-leave-track.component.scss'],
})
export class ManageLeaveTrackComponent implements OnInit, OnDestroy {
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) {}
  selectedAttributes = 0;
  preferenceKeys = PreferenceKeys;
  currentPage: any;
  limit: number = 5;
  userData: any;
  calanderDateData: any = [];
  attendence_date: any = [];
  offset: number = 0;
  toggle = true;
  leaveData: any = [];
  filterstatus = 2;
  messageEvent: any = [];
  totalLeave: any = [];
  calanderData: any = [];
  count: any;
  leaveDateData: any = [];
  month: any = 3;
  year: any = 2023;
  availableLeaves: any[] = [];
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  presentDays: number = 0;
  absentDays: number = 0;
  events: any = [];
  lateMark: any = [];
  isActive = 11;

  isEdit: boolean = false;
  loader: boolean = false;
  editData = new Subject<any>();
  option = [
    { id: 11, name: 'All' },
    { id: 0, name: 'Pending' },
    { id: 1, name: 'Decline' },
    { id: 2, name: 'Approved' },
  ];

  ngOnInit(): void {
    this.getProfile();
    this.getLeaveTrack();
    this.getAllAvailableLeaves();
    this.calanderLoadData(
      this.userData?.data?.user_emp_ID,
      this.month,
      this.year
    );
  }

  setData(res: any) {
    this.leaveData = res;
  }
  ngOnDestroy(): void {
    $('#add-leave-type').remove();
  }

  selectId = 11;
  changeFilter(e: any) {
    this.loader = true;
    this.attendence_date = [];
    this.filterstatus = e;
    this.calanderLoadData(
      this.userData?.data?.user_emp_ID,
      this.month,
      this.year
    );

    if (e == 11) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        emp_id: this.userData?.data?.user_emp_ID,
        isApproved: [0, 1, 2],
      };
      this.masterService.getAllReq(temp).subscribe({
        next: (res: any) => {
          this.leaveData = res.getRequest.rows;
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    } else if (e == 0) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        emp_id: this.userData?.data?.user_emp_ID,
        isApproved: [0],
      };
      this.masterService.getAllReq(temp).subscribe({
        next: (res: any) => {
          this.leaveData = res.getRequest.rows;
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    } else if (e == 1) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        emp_id: this.userData?.data?.user_emp_ID,
        isApproved: [1],
      };
      this.masterService.getAllReq(temp).subscribe({
        next: (res: any) => {
          this.leaveData = res.getRequest.rows;
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    } else if (e == 2) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        emp_id: this.userData?.data?.user_emp_ID,
        isApproved: [2],
      };
      this.masterService.getAllReq(temp).subscribe({
        next: (res: any) => {
          this.leaveData = res.getRequest.rows;
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    }
  }
  calanderLoadData(emp: number, month: number, year: number) {
    setTimeout(() => {
      this.attendence_date = [];

      this.calanderData.forEach((date: any) => {
        switch (date.status) {
          case 0:
            if (this.filterstatus === 0) {
              this.attendence_date.push({
                title: 'pending',
                date: date?.date,
                color: '#FFCC00',
              });
            }

            break;
          case 1:
            if (this.filterstatus === 1) {
              this.attendence_date.push({
                title: 'decline',
                date: date?.date,
                color: 'red',
              });
            }
            break;
          case 2:
            if (this.filterstatus === 2) {
              this.attendence_date.push({
                title: 'Leave',
                date: date?.date,
                color: '#E9C3C6',
              });
            }

            break;

          default:
        }

        let result: any = [];
        let filterResult = this.attendence_date.filter((a: any) => {
          let flag = result.includes(a.date);
          if (flag) return false;
          else {
            result.push(a.date);
            return true;
          }
        });

        this.events = filterResult; //calander print data

        setTimeout(() => {
          const convert = (unique: any[]) => {
            const res: any = {};
            this.attendence_date.forEach((obj: any) => {
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

          this.messageEvent = convert(this.attendence_date);

          this.events.forEach((e: { [x: string]: string }) => {
            if (e['title'] == 'present') {
              this.presentDays++;
            } else {
              this.absentDays++;
            }
            this.loader = false;
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
    }, 3000);

    this.getLeaveData();
    var temp = {
      employee_id: emp,
      isApproved: 2,
      month: month,
      year: year,
      owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getMonthlyAttendance(temp).subscribe({
      next: (res: any) => {
        let attendence_date: any = [];

        res.attendence.forEach((date: any) => {
          let currentDate: any = new Date();
          currentDate = moment(currentDate).format(moment.HTML5_FMT.DATE);
          let dates: any;
          dates = moment(date.date);
          dates = moment(dates._i, 'DD/MM/YYYY');
          let days = moment(dates._d).format(moment.HTML5_FMT.DATE);

          this.events = attendence_date; //calander print data
          setTimeout(() => {
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
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }
  openAdd() {
    UIkit.modal('#add-leave-type').show();
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg);
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

  permission: any;
  accessPermission: any;

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS),
    };
    this.permission = this.accessPermission?.accessdata;
  }

  getLeaveTrack() {
    var temp = {
      isDeleted: false,
      owner_id: this.userData?.data?.owner_id,
      emp_id: this.userData?.data?.user_emp_ID,
      isApproved: [0, 1, 2],
    };
    this.masterService.getAllReq(temp).subscribe({
      next: (res: any) => {
        this.leaveData = res.getRequest.rows;
      },
      error: (err: any) => {
        this.handleError(err.error);
      },
    });
  }
  finalLeave: any = [];
  // getAllAvailableLeaves() {

  //   var temp = {
  //     emp_id: this.userData?.data?.user_emp_ID,
  //     isDeleted:false
  //   };
  //   this.masterService.getAllAvailableLeaves(temp).subscribe({
  //     next: (res: any) => {
  //       this.finalLeave=[]
  //       this.totalLeave = res.result;

  //       this.totalLeave.forEach((ele:any) => {
  //         console.log(ele)
  //         this.finalLeave.push({'leave_name':ele.leave_name,'no_of_days':ele.no_of_days,'leaveTake':ele?.available?.count})

  //       });

  //     },
  //     error: (err: any) => {
  //       this.handleError(err.error);
  //     },
  //   });

  // }
  getAllAvailableLeaves() {
    let total_available_leave = 0;
    let total_consumed_leave = 0;
    let total_leave = 0;
    var temp = {
      emp_id: this.userData?.data?.user_emp_ID,
      isDeleted: false,
    };
    this.masterService.getAllAvailableLeaves(temp).subscribe({
      next: (res: any) => {
        let element: any = [];
        for (let a = 0; a < res?.result.length; a++) {
          if (res.result[a]?.available?.length !== 0) {
            console.log(
              'res.result[a].available ',
              res.result[a].available.length
            );

            for (let b = 0; b < res?.result[a]?.available.length; b++) {
              if (res?.result[a]?.available[b]?.isApproved == 2) {
                console.log(
                  'res.result[a]?.available[b]?.isApproved == 2',
                  res.result[a]?.available[b]?.isApproved
                );

                element.push({
                  leave_name: res.result[a].leave_name,
                  assignLeave: res.result[a].no_of_days,
                  takenLeave: +res.result[a].available[b].count,
                });
              } else if (res?.result[a]?.available[b]?.isApproved == 1) {
                console.log(
                  'res.result[a]?.available[b]?.isApproved == 1',
                  res.result[a]?.available[b]?.isApproved
                );
                if (element.length !== 0) {
                  element.forEach((check: any) => {
                    if (check.leave_name !== res.result[a].leave_name) {
                      element.push({
                        leave_name: res.result[a].leave_name,
                        assignLeave: res.result[a].no_of_days,
                        takenLeave: 0,
                      });
                    }
                  });
                } else {
                  element.forEach((check: any) => {
                    if (check.leave_name !== res.result[a].leave_name) {
                      element.push({
                        leave_name: res.result[a].leave_name,
                        assignLeave: res.result[a].no_of_days,
                        takenLeave: 0,
                      });
                    }
                  });
                }
              } else if (res.result[a]?.available[b]?.isApproved == 0) {
                console.log(
                  'res.result[a]?.available[b]?.isApproved == 0',
                  res.result[a]?.available[b]?.isApproved
                );
                if (element.length !== 0) {
                  element.forEach((check: any) => {
                    if (check.leave_name !== res.result[a].leave_name) {
                      element.push({
                        leave_name: res.result[a].leave_name,
                        assignLeave: res.result[a].no_of_days,
                        takenLeave: 0,
                      });
                    }
                  });
                } else {
                  element.forEach((check: any) => {
                    if (check.leave_name !== res.result[a].leave_name) {
                      element.push({
                        leave_name: res.result[a].leave_name,
                        assignLeave: res.result[a].no_of_days,
                        takenLeave: 0,
                      });
                    }
                  });
                }
              }
            }
          } else {
            element.push({
              leave_name: res.result[a].leave_name,
              assignLeave: res.result[a].no_of_days,
              takenLeave: 0,
            });
          }
        }

        console.log(
          'elementelementelementelementelementelementelement ',
          element
        );
        this.availableLeaves = element;
      },
      error: (err: any) => {
        this.handleError(err.error);
      },
    });
  }
  handleDateClick(arg: DateClickArg) {
    console.log(arg);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
  }
  deleteLeaveRecord(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this leave ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;
        var temp = {
          id: data.id,
          isDeleted: true,
        };
        this.masterService.deleteLeaveRecord(temp).subscribe({
          next: (res: any) => {
            this.getLeaveTrack();
            Swal.fire(
              'Deleted!',
              'Your Leave Request has been deleted.',
              'success'
            );
            // this.handleSuccess("Delete booking Successfully")
          },
          error: (e: any) => {
            this.handleError('error');
          },
        });
      }
    });
  }
  getLeaveData() {
    for (let index = 1; index <= 31; index++) {
      let indate = `${this.year}-${this.month}-${index}`;
      let date = moment(indate).format(moment.HTML5_FMT.DATE);
      let fun = this.checkIfLeave(date, 5);
      // console.log(fun);

      if (fun !== null) {
      } else {
      }
    }
  }

  checkIfLeave(date: any, no: any) {
    this.leaveData.forEach((datePrint: any) => {
      let startDate: any = moment(datePrint?.from_date).format(
        moment.HTML5_FMT.DATE
      );

      let toDate: any = moment(datePrint?.to_date).format(
        moment.HTML5_FMT.DATE
      );

      if (date >= startDate && date <= toDate) {
        this.calanderData.push({ date: date, status: datePrint?.isApproved });
        console.log(date, ' this.calanderData ', datePrint?.isApproved);

        return true;
      } else {
        return false;
      }
    });
    // console.log(this.leaveDateData);
  }
  openEdit(data: any) {
    this.editData.next(data);
    this.isEdit = true;
    UIkit.modal('#leave-track').show();
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.offset = (event - 1) * this.limit;
    this.getLeaveTrack();
  }
}
function getcount() {
  throw new Error('Function not implemented.');
}
