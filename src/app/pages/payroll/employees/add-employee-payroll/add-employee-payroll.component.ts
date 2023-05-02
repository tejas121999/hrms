import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee-payroll',
  templateUrl: './add-employee-payroll.component.html',
  styleUrls: ['./add-employee-payroll.component.scss']
})
export class AddEmployeePayrollComponent implements OnInit {

  step = 1;

  constructor() { }

  ngOnInit(): void {
  }

  reset(){}

  next() {
    this.step++
  }

  prev(){
    this.step--
  }

}
