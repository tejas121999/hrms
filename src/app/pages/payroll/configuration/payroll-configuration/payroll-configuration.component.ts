import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-configuration',
  templateUrl: './payroll-configuration.component.html',
  styleUrls: ['./payroll-configuration.component.scss']
})
export class PayrollConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  process_period = [
    { name: "1 st" },
    { name: "2 nd" },
    { name: "3 rd" },
    { name: "4 th" },
    { name: "5 th" },
    { name: "6 th" },
    { name: "7 th" },
    { name: "8 th" },
    { name: "9 th" },
    { name: "10 th" },
    { name: "11 th" },
    { name: "12 th" },
    { name: "13 th" },
    { name: "14 th" },
    { name: "15 th" },
    { name: "16 th" },
    { name: "17 th" },
    { name: "18 th" },
    { name: "19 th" },
    { name: "20 th" },
    { name: "21 st" },
    { name: "22 nd" },
    { name: "23 rd" },
    { name: "24 th" },
    { name: "25 th" },
    { name: "26 th" },
    { name: "27 th" },
  ]

  rounding = [
    { name: "Round Up" },
    { name: "Round Down" }
  ]

  mode = [
    { name: "Declared" },
    { name: "Actual" }
  ]

  run_payroll = [
    { name: "India" },
    { name: "Africa" }
  ]

  payroll_import = [
    { name: "Basic" },
    { name: "HRA" },
    { name: "Special Allowance" },
    { name: "Overtime Allowance" }
  ]

}
