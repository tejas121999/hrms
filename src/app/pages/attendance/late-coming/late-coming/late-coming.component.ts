import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-late-coming',
  templateUrl: './late-coming.component.html',
  styleUrls: ['./late-coming.component.scss']
})
export class LateComingComponent implements OnInit {

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

  late_coming = [
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
