import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-employee-payroll',
  templateUrl: './manage-employee-payroll.component.html',
  styleUrls: ['./manage-employee-payroll.component.scss']
})
export class ManageEmployeePayrollComponent implements OnInit {

  limit: number = 10
  offset: number = 0
  currentPage: any

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

}
