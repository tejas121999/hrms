import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee-provident-fund',
  templateUrl: './add-employee-provident-fund.component.html',
  styleUrls: ['./add-employee-provident-fund.component.scss']
})
export class AddEmployeeProvidentFundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  rate : any = [
    {  name : "12% Of Actual Wages" },
    {  name : "Restrict Contribution To ₹15,000 Of PF Wages" },
  ];

  reset(){}

}
