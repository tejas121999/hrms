import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData, Chart } from 'chart.js';
import { CalendarOptions } from 'fullcalendar';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from '@fullcalendar/interaction';
import { EventApi } from 'fullcalendar';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedmonth = 1
  selectedattedance =1
  selecteddailytime = 1
  // calendarOptions?: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  // work location
  public doughnutChartLabels: string[] = ['Office', 'On Crew'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [350, 450], backgroundColor: ['#3D5DD1', '#3D5DD159'], label: 'Series A' },
  ];
  
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    cutout: 60,
  };

  //total employee
  public doughnutChartLabels1: string[] = ['Male', 'Female'];
  public doughnutChartDatasets1: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [350, 450], label: 'Series A', backgroundColor: ['#006699', '#5FA62F'], },
  ];

  public doughnutChartOptions1: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    cutout: 60,
  };

  //barchart
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40, 60, 50], backgroundColor: ['#032D7C'], label: 'Series A', stack: 'a' },
      { data: [65, 59, 80, 81, 56, 55, 40, 50, 30], backgroundColor: ['#B1B1B1'], label: 'Series B', stack: 'a' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartType: ChartType = 'bar';
  public chartColors: any[] = [
    {
      backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }
  ];

  // calender

  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    events: [
      { title: 'Eid', date: '2023-04-22' },
      { title: 'Good Friday', date: '2023-04-07' }
    ],
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGrid3W,dayGrid2W,dayGridWeek'
    },
    buttonText: {
      today: 'today',
      month: 'M',
      week: 'T',
      day: 'D',
      list: 'lista'
    },
    views: {
      dayGrid2W: {
        type: 'dayGrid',
        duration: { weeks: 2 },
        dateIncrement: { weeks: 1 },
        buttonText: '2T'
      },
      dayGrid3W: {
        type: 'dayGrid',
        duration: { weeks: 3 },
        dateIncrement: { weeks: 1 },
        buttonText: '3T',
        // visibleRange: function(currentDate) {
        //   console.log(currentDate)
        //   return {
        //     start: currentDate.clone().subtract(1, 'weeks'),
        //     end: currentDate.clone().add(3, 'weeks') // exclusive end, so 3
        //   };
        // }
      }
    },
    defaultView: 'dayGridMonth'
  }
  //task chart
  public doughnutChartLabels2: string[] = ['Done', 'Pending'];
  public doughnutChartDatasets2: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [350, 450], label: 'Series A', backgroundColor: ['#9BA7F0', '#D9D9D9'], },
  ];

  public doughnutChartOptions2: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    cutout: 60,
  };

  //attendance chart
  public doughnutChartLabels3: string[] = ['Attendance', 'Leaves'];
  public doughnutChartDatasets3: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [150, 450], label: 'Series A', backgroundColor: ['#9BA7F0', '#3D5DD1'], },
  ];

  public doughnutChartOptions3: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
    cutout: 60,
  };

  //daliy active hours chart
  chart: any;


  ngAfterViewInit() {
    let ctx: any = document.getElementById('lineChart') as HTMLElement;

    var data = {
      labels: ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec', '7 Dec'],
      datasets: [
        {
          label: 'TeamA Score',
          data: [10, 50, 25, 70, 40, 30, 60],
          backgroundColor: '#0A2472',
          borderColor: '#0A2472',
          fill: false,
          lineTension: 0,
          radius: 10,
          pointBackgroundColor: '#0A2472',
        },
      ],
    };

    //options
    var options = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Line Graph',
        fontSize: 18,
        fontColor: '#111',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#333',
          fontSize: 25,
        },
      },
    };

    var chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }
  constructor(
    private appPreference: AppPreference,
  ) { }

  isAdimin: boolean = false
  preferenceKeys = PreferenceKeys;
  userData: any;

  ngOnInit(): void {
    this.getProfile()
    // this.selectedmonth = { id:1, name: 'Mar-Nov' };

  }

  getProfile() {
    this.userData = this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    console.log("this.userData", this.userData)
  }
  turnoverMonths= [
    { id:1, name: 'Mar-Nov' },
    { id:2, name: 'Nov-Dec' },
  ]
  dailyAttendance= [
    { id:1, name: 'Monthly' },
    { id:2, name: 'Yearly' },
  ]
  dailyActiveHours= [
    { id:1, name: 'This Week' },
  ]
}
