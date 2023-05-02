import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-payroll',
  templateUrl: './process-payroll.component.html',
  styleUrls: ['./process-payroll.component.scss']
})
export class ProcessPayrollComponent implements OnInit {

  currentPage: any
  limit: number = 10
  offset: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

}
