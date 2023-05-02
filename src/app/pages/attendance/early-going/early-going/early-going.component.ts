import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-early-going',
  templateUrl: './early-going.component.html',
  styleUrls: ['./early-going.component.scss']
})
export class EarlyGoingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deduction_type = [
    { type: "Leave" },
    { type: "Salary" },
    { type: "Leave & Salary" }
  ]

  leave_type = [
    { type: "Privilege" },
    { type: "Loss Of Pay" }
  ]

  early_going = [
    { name: "Yes" },
    { name: "No" }
  ]

  criteria = [
    { name: "Terminated" },
    { name: "Left" },
    { name: "Retired" },
    { name: "Absconding" },
    { name: "Death in Service" },
    { name: "Permanent Sablement" },
    { name: "Suspended" }
  ]

}
