import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
declare var UIkit: any;
@Component({
  selector: 'app-assign-shift',
  templateUrl: './assign-shift.component.html',
  styleUrls: ['./assign-shift.component.scss'],
})
export class AssignShiftComponent implements OnInit {
  count: any;
  from: number = 0;
  limit: number = 50;
  offset: number = 0;
  userData: any;
  loader: boolean = false;
  shiftCheck: boolean = false;
  empId: any;
  emp_shift: any;
  shiftData: any[] = [];
  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
    private ManageEmployee: ManageEmployeeComponent
  ) {}
  preferenceKeys = PreferenceKeys;
  ngOnInit(): void {
    this.getProfile();
    this.getEmpID();
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }

  getEmpID() {
    this.ManageEmployee.shiftData.subscribe({
      next: (data: any) => {
        console.log('======', data.emp_shift);
        this.empId = data.id;
        this.emp_shift = data.emp_shift;
        this.getShift();
      },
    });
  }

  getShift() {
    console.log('hello');
    var temp = {
      isDeleted: false,
      limit: this.limit,
      offset: this.offset,
      shift_owner_id: this.userData?.data?.owner_id,
    };
    this.masterServices.getShift(temp).subscribe({
      next: (res: any) => {
        this.shiftData = res.shift.rows;

        this.shiftData.forEach((data: any, index: any) => {
          console.log(data.id === this.emp_shift);
          if (this.emp_shift === data.id) {
            console.log(data.id);
            var temp = {
              id: data.id,
              shift_name: data.shift_name,
              start_time: data.start_time,
              end_time: data.end_time,
              shiftCheck: this.emp_shift === data.id,
            };
            this.shiftData[index] = temp;
          }
        });
        console.log('jbjvjbv', this.shiftData);
      },
    });
  }
  temp: any = {
    id: '',
    emp_shift: '',
  };
  selectShift:boolean = false
  payloade: any[] = [];
  preparePayloade(id: any) {
    // const shiftId: any[] = []
    // shiftId.push(id)
    // shiftId.forEach((data: any) => {
    console.log('======', id);
    if (id != undefined) {
      this.selectShift = true
      this.temp = {
        id: this.empId,
        emp_shift: id,
      };
    }

    //   this.payloade.push(temp)
    // })
  }

  assignShift() {
    console.log(Object.values(this.temp));
    let data: any = Object.values(this.temp);

    console.log(data.id);

    this.masterServices.assignShift(this.temp).subscribe({
      next: (res: any) => {
        this.handleSuccess('Shift Assigned Successfully');
        this.reset();
      },
      error: (e: any) => {
        this.handleError('Server Error');
      },
    });
  }

  reset() {
    this.ManageEmployee.getEmployee();
    UIkit.modal('#assign-shift').hide();
    this.getShift();
  }
}
