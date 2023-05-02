import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application-services';
import { masterRoutes } from 'src/app/shared/config/masterRoutes';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {

  isNotification: boolean = false
  disableMasterSearch: boolean = false;
  routes = masterRoutes;
  currentRoute: any = null;
  moduleRoute: any = null;
  access: any;

  constructor(
    private router: Router,
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    
    this.setCurrentAddRoute();
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentAddRoute();
        this.notification()
      }
    });
  }
    
    notification() {
      let currentRoute = this.getCurrentRoute();
      if (currentRoute == "notification") {
        this.isNotification = true
      } else {
        this.isNotification = false
      }
    }

    setCurrentAddRoute() {
      masterRoutes.map(x => {
        if (x.manageRoute == this.getCurrentRoute()) {
          this.currentRoute = x;
        }
      })
    }
    
    getCurrentRoute() {
      var route = this.router.url;
      var currentRoute = route.split("/");
      this.moduleRoute = currentRoute[1];
      if (currentRoute[2] == undefined)
      return "/masters/manage-employee";
      return currentRoute[2];
    }
    
    masterAdd() {
      this.applicationService.isMasterEdit = false;
    }
    
  }
  