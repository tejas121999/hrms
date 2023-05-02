import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageHolidayListComponent } from '../manage-holiday-list/manage-holiday-list.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-holiday-list',
  templateUrl: './add-holiday-list.component.html',
  styleUrls: ['./add-holiday-list.component.scss']
})
export class AddHolidayListComponent implements OnInit {
  userData: any
  depnameId: any = [];
  empnameId: any = [];
  asdepdata: any = [];
  asempdata: any = [];
  getpatchdepDate: any = [];
  getpatchempDate: any = [];
  removeEmpId: any = [];
  removeDepId: any = [];
  oldDepData: any = []
  oldEmpData: any = []
  generalop: any = []
  toggleemp = false;
  // department id
  _id: any[] = []
  emp_id: any = []

  single_deptid: any[] = []
  single_emp_id: any[] = []

  department_id: any[] = []
  employee_id: any[] = []


  id: number = 0;
  @Input('isEdit') isEdit: boolean = false;

  constructor(
    private masterService: MasterServices,
    private formValidator: FormValidator,
    private appPreference: AppPreference,
    private manageHolidayList: ManageHolidayListComponent
  ) { }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  ngOnInit(): void {
    this.getProfile();
    this.getDepartment();
    this.setupEdit();
    console.log("this.holidayListForms.get(holiday_assign)?.disabled", this.holidayListForms.get("holiday_assign")?.disabled)
    this.toggleemp = false
  }
  holidayListForms: FormGroup = new FormGroup({
    formName: new FormControl("holidayListForms"),
    holiday_name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    holiday_assign: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    holiday_date: new FormControl('', [Validators.required]),
    holiday_applicable: new FormControl(''),
    holiday_options: new FormControl(0)
  })

  getDepartment() {
    var temp = {
      "where": false,
      "limit": 1000,
      "offset": 0,
      "department_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getDepartment(temp).subscribe({
      next: (res: any) => {
        this.depnameId = res.department.rows
        let obj = { "id": "All", "department_name": "All" }
        this.depnameId.splice(0, 0, obj)
        // this.setupEdit()
      },
      error: (err) => {
        this.handleError(err)
      }
    })


  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }
  reset() {
    this.isEdit = false;
    this.holidayListForms.reset();
    this.manageHolidayList.getHolidayList();
    UIkit.modal("#add-holiday").hide();
    // location.reload()
  }
  removeAllDept() {
    this.single_deptid = []
    this.department_id = []
    this.single_emp_id = []
    this.employee_id = []
    this.holidayListForms.get('holiday_applicable')?.reset()
  }

  removeAllEmp() {
    this.employee_id = []
  }
  onRemoveEmp(e: any) {
    console.log(e.value.id)
    // console.log("this.employee_id46", this.employee_id)
    // delete this.employee_id[e.value.id]

    const index = this.employee_id.findIndex((obj: any) => obj === e.value.id)
    if (index !== -1) {
      this.employee_id.splice(index, 1)
    }
    console.log("this.employee_id45", this.employee_id)
  }
  onRemoveDep(e: any) {
    delete this.department_id[e.value.id]
    console.log("this.department_id2", this.department_id)

  }

  // select department
  selectDepartment(e: any) {
    console.log("e[0]?.id", e[0]?.id)
    var temp
    if (e[0]?.id === "All") {
      // get all department id 
      const index = this.depnameId.findIndex((obj: any) => obj.id === "All")
      if (index !== -1) {
        this.depnameId.splice(index, 1);
      }

      this.depnameId.forEach((data: any) => {
        this.department_id.push(data.id)
      })

      temp = {
        "isDeleted": false,
        "user_owner_id": this.userData?.data?.owner_id,
        "department_id": this.department_id
      }
    } else if (e[0]?.id != "All") {
      this.department_id = this.holidayListForms.get('holiday_assign')?.value
      temp = {
        "isDeleted": false,
        "user_owner_id": this.userData?.data?.owner_id,
        "department_id": this.department_id
      }
    }
    console.log("===========", temp)
    this.masterService.getEmployeebyDepartment(temp).subscribe({
      next: (res: any) => {
        this.empnameId = res.employee
      }, error: (e: any) => {
        this.handleError('error');
      }
    })
  }

  // select employee
  selectEmployee(e: any) {
    console.log("====", e)
    // var temp
    e.forEach((data: any) => {
      this.employee_id.push(data.id)
    })
    console.log("this.employee_id", this.employee_id)

    // console.log("this.single_emp_id", this.single_emp_id)
    // if (this.single_emp_id.length != 0) {
    //   temp = {
    //     "isDeleted": false,
    //     "user_owner_id": this.userData?.data?.owner_id,
    //     "department_id": this.single_emp_id
    //   }
    // } else if (this.employee_id.length != 0) {
    //   temp = {
    //     "isDeleted": false,
    //     "user_owner_id": this.userData?.data?.owner_id,
    //     "department_id": this.employee_id
    //   }
    // }
    // console.log(temp)
    // this.masterService.getEmployeebyDepartment(temp).subscribe({
    //   next: (res: any) => {
    //     this.empnameId = res.employee
    //   }, error: (e: any) => {
    //     this.handleError('error');
    //     console.log(e)
    //   }
    // })
  }

  getEmployee(e: any) {
    console.log(e)
    e.forEach((data: any) => {
      this.employee_id.push(data.id)
    })

    var temp = {
      "isDeleted": false,
      "user_owner_id": this.userData?.data?.owner_id,
      "department_id": this.employee_id
    }

    console.log(temp)
    this.masterService.getEmployeebyDepartment(temp).subscribe({
      next: (res: any) => {
        this.empnameId = res.employee
        console.log("this.empnameId", this.empnameId)
      }, error: (e: any) => {
        this.handleError('error');
        console.log(e)
      }
    })
  }



  depId(e: any) {
    let fetchempbydepid: any
    var temp
    if (e[0]?.id === "All") {
      fetchempbydepid = this.depnameId
      const index = fetchempbydepid.findIndex((obj: any) => obj.id === "All")
      if (index !== -1) {
        fetchempbydepid.splice(index, 1);
      }
      fetchempbydepid.forEach((data: any) => {
        this._id.push(data.id)
      })
    } else {
      this.single_deptid.push(this.holidayListForms.get('holiday_assign')?.value);
    }
    if (this._id.length != 0) {
      temp = {
        "isDeleted": false,
        "user_owner_id": this.userData?.data?.owner_id,
        "department_id": this._id
      }
    } else if (this.employee_id.length != 0) {
      temp = {
        "isDeleted": false,
        "user_owner_id": this.userData?.data?.owner_id,
        "department_id": this.single_deptid
      }
    }
    this.masterService.getEmployeebyDepartment(temp).subscribe({
      next: (res: any) => {
        this.empnameId = res.employee
        let obj = { "id": "All", "first_name": "All" }
        this.empnameId.splice(0, 0, obj)
        this.empnameId.forEach((data: any) => {
          this.emp_id.push(data.id)
        })
      }, error: (e: any) => {
        this.handleError('error');
      }
    })

  }


  depIds(depid: any) {
    let empIds: any
    var temp
    if (depid[0]?.id === "All") {
      empIds = this.empnameId
      const index = empIds.findIndex((obj: any) => obj.id === "All")
      if (index !== -1) {
        empIds.splice(index, 1);
      }
      empIds.forEach((data: any) => {
        this.emp_id.push(data.id)
      })
    } else {
      this.single_emp_id.push(this.holidayListForms.get('holiday_applicable')?.value)
    }
    if (this.emp_id.length != 0) {
      temp = {
        "isDeleted": false,
        "user_owner_id": this.userData?.data?.owner_id,
        "department_id": this.emp_id
      }
    } else if (this.single_emp_id.length != 0) {
      temp = {
        "isDeleted": false,
        "user_owner_id": this.userData?.data?.owner_id,
        "department_id": this.single_emp_id
      }
    }
    this.masterService.getEmployeebyDepartment(temp).subscribe({
      next: (res: any) => {
        this.empnameId = res.employee
      }, error: (e: any) => {
        this.handleError('error');

      }
    })

  }
  holiday_applicable: any[] = []
  addHolidayList() {
    if (this.holidayListForms.invalid) {
      this.holidayListForms.markAllAsTouched()
    } else {
      var temp
      this.holiday_applicable = this.holidayListForms.get('holiday_applicable')?.value
      var unique = [...new Set(this.employee_id)]
      this.employee_id = unique
      if (this.employee_id.length === 0) {
        this.empnameId.forEach((data: any) => {
          this.employee_id.push(data.id)
        })
      }
      // console.log(" this.holiday_applicable", this.holiday_applicable.length)
      if (this.holiday_applicable.length === 0) {
        temp = {
          "holidayPayload": {
            "holiday_name": this.holidayListForms.get('holiday_name')?.value,
            "holiday_date": moment(this.holidayListForms.get('holiday_date')?.value).format("YYYY-MM-DD"),
            "holiday_day": 0,
            "holiday_owner_id": this.userData?.data?.owner_id,
            "option": this.holidayListForms.get('holiday_options')?.value,
          },
          "generalPayload": {
            "option": this.holidayListForms.get('holiday_options')?.value,
          },
          "departmentPayload": this.department_id,
          "employeePayload": this.employee_id
        }
        console.log("temp 1")
      } else if (this.employee_id.length !== 0) {
        temp = {
          "holidayPayload": {
            "holiday_name": this.holidayListForms.get('holiday_name')?.value,
            "holiday_date": moment(this.holidayListForms.get('holiday_date')?.value).format("YYYY-MM-DD"),
            "holiday_day": 0,
            "holiday_owner_id": this.userData?.data?.owner_id,
            "option": this.holidayListForms.get('holiday_options')?.value,
          },
          "generalPayload": {
            "option": this.holidayListForms.get('holiday_options')?.value,
          },
          "departmentPayload": this.department_id,
          "employeePayload": this.employee_id
        }
      }
      this.masterService.addHolidayList(temp).subscribe({
        next: (res: any) => {
          this.handleSuccess("Added holiday successfully")
          UIkit.modal("#add-holiday").hide();
          // this.manageHolidayList.getHolidayList()
          this.single_deptid = []
          this.single_emp_id = []
          this.department_id = []
          this.employee_id = []
          this.reset()
        }, error: (e: any) => {
          this.handleError('error');
        }
      })
    }

    // }
  }

  hoildaydepId: any = []
  setupEdit() {
    this.manageHolidayList.editData.subscribe({
      next: (data: any) => {
        console.log("data====", data)
        this.hoildaydepId = data.data.holiday.HolidayDepartments
        this.oldDepData = data.data.holiday.HolidayDepartments;
        this.oldEmpData = data.data.holiday.HolidayEmployees;
        this.id = data.data.holiday.id;
        this.generalop = data.data.holiday.HolidayGenerals
        let dep: any = data.data.holiday.HolidayDepartments
        let depvalue: any = []
        dep.forEach((element: any) => {
          depvalue.push(element.department_id)
        });
        let emp: any = data.data.holiday.HolidayEmployees
        let empvalue: any = []
        emp.forEach((element: any) => {
          empvalue.push(element.employee_id)
        });
        this.getEmployee(depvalue);
        this.getpatchdepDate = data.data.holiday.HolidayDepartments;
        this.getpatchempDate = data.data.holiday.HolidayEmployees;
        this.holidayListForms.patchValue({
          holiday_name: data.data.holiday.holiday_name,
          holiday_date: data.data.holiday.holiday_date,
          holiday_assign: depvalue,
          holiday_applicable: empvalue,
          holiday_options: +data.data.holiday.option,
        })
        dep = [];
        depvalue = [];
        empvalue = [];
        emp = [];
        this.isEdit = true
        let empsid = this.holidayListForms.get('holiday_applicable')?.value;
        if (empsid == '') {
          this.toggleemp = false
        } else {
          this.toggleemp = true
        }
      }, error: (e: any) => {
        this.handleError(e);
        this.reset()
      }
    })
  }
  EditHolidayList() {

    let depid: any = [];
    let empsid: any = []

    depid = this.holidayListForms.get('holiday_assign')?.value;
    empsid = this.holidayListForms.get('holiday_applicable')?.value;

    let removeDepIddelete: any = [];
    let removeEmpIddelete: any = []
    let remEmp: any = [];
    let remdep: any = []

    let updateDepIddelete: any = [];
    let updateEmpIddelete: any = [];

    depid.forEach((ins: any) => {
      updateDepIddelete.push({ "department_id": ins })
    });



    if (!empsid) {

      this.asempdata = [{}]
    } else {
      empsid.forEach((ins: any) => {
        updateEmpIddelete.push({ "employee_id": ins })
      });

    }

    this.removeDepId.forEach((e: any) => {

      removeDepIddelete.push(this.oldDepData.find((i: any) => {

        if (i.department_id === e)
          return {
            ...i
          }
      }));

    });



    this.removeEmpId.forEach((e: any) => {

      removeEmpIddelete.push(this.oldEmpData.find((i: any) => {

        if (i.employee_id == e) {
          return {
            ...i
          }
        }


      }))
    });

    console.log(this.oldEmpData);

    empsid.forEach((e: any) => {

      remEmp.push({ "employee_id": e })
    });
    depid.forEach((e: any) => {
      remdep.push({ "department_id": e })
    });




    let option: any = []

    this.generalop.forEach((opt: any) => {
      option.push({ "id": opt.id, "option": this.holidayListForms.get('holiday_options')?.value })
    });

    var temp = {
      "holidayPayload": {
        "id": this.id,
        "holiday_name": this.holidayListForms.get('holiday_name')?.value,
        "holiday_date": moment(this.holidayListForms.get('holiday_date')?.value).format("YYYY-MM-DD"),
        "holiday_day": "10",
        "holiday_owner_id": this.userData?.data?.owner_id,
      },
      "generalPayload": option,
      "departmentPayload": remdep,
      "deletedDepartment": removeDepIddelete,
      "employeePayload": remEmp,
      "deletedEmployee": removeEmpIddelete
    }


    this.masterService.updateHolidaylist(temp).subscribe({
      next: (res: any) => {
        console.log(res);

        this.handleSuccess("Holiday updated successfully")
        this.reset()
        UIkit.modal("#add-holiday").hide();
        this.toggleemp = false
        this.isEdit = false
      }, error: (e: any) => {
        this.handleError('error');
        this.isEdit = false
        this.toggleemp = false
      }

    })



  }
  option = [
    { id: 0, optionname: "Yes" },
    { id: 1, optionname: "No" }
  ]
}
