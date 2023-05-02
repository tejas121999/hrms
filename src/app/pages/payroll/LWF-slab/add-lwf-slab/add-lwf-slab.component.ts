import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-lwf-slab',
  templateUrl: './add-lwf-slab.component.html',
  styleUrls: ['./add-lwf-slab.component.scss']
})
export class AddLwfSlabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  LWFForm = new FormGroup({
    formName : new FormControl("LWFForm"),
    month : new FormControl(''),
    employee_amount : new FormControl(''),
    employer_amount : new FormControl(''),
    comment : new FormControl('')
  })

  month : any = [
    { month: "Jan" },
    { month: "Feb" },
    { month: "Mar" },
    { month: "Apr" },
    { month: "May" },
    { month: "Jun" },
    { month: "Jul" },
    { month: "Aug" },
    { month: "Sep" },
    { month: "Oct" },
    { month: "Nov" },
    { month: "Dec" },
  ];

}
