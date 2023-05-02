import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overtime-configuration',
  templateUrl: './overtime-configuration.component.html',
  styleUrls: ['./overtime-configuration.component.scss']
})
export class OvertimeConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mode = [
    { name: "None" },
    { name: "Round" },
    { name: "Round Up" },
    { name: "Round Down" }
  ]

}
