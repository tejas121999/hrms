import { EventEmitter, Injectable, Output } from "@angular/core";
import { AppPreference } from "../shared/app-preference";

@Injectable({
    providedIn: 'root'
  })
  export class ApplicationService {
    @Output() loaderEvent = new EventEmitter<boolean>();
    @Output() masterNav = new EventEmitter<string>();
    @Output() payNav = new EventEmitter<string>();
    isMasterEdit: boolean = false;
    constructor(private appPreference: AppPreference) { }
  
    showLoader(value: boolean) {
      this.loaderEvent.emit(value);
    }
    disableNav(value: string) {
      this.masterNav.emit(value)
    }
    disablePayNav(value: string) {
      this.payNav.emit(value)
    }
}