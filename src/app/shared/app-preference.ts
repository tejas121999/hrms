import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ToastrService } from "ngx-toastr";

export enum PreferenceKeys {
    ACCESS_TOKEN = "ACCESS_TOKEN",
    PROFILE_INFO = "PROFILE_INFO",
    EMPLOYEE_DATA = 'EMPLOYEE_DATA',
    USER_PROFILE = "USER_PROFILE",
    USER_PREFERENCES = "USER_PREFERENCES",
    USER_ID = "USER_ID",
    APP_DATA = "APP_DATA",
    ACCESS = "ACCESS",
    COMPANY = "COMPANY",
    DEPARTMENT = 'DEPARTMENT',
    BRANCH = 'BRANCH',
    DESIGNATION = 'DESIGNATION',
    ATTENDENCE_CONFIG_ID = 'ATTENDENCE_CONFIG_ID',
    LEAVE_CONFIG_ID = "LEAVE_CONFIG_ID",
    LEAVE_TYPE_ID = "LEAVE_TYPE_ID",
    LEAVE_TYPE_CONFIG_ID = "LEAVE_TYPE_CONFIG_ID",
    ISEDIT = 'ISEDIT'
}

@Injectable({
    providedIn: "root",
})
export class AppPreference {
    constructor(private titleService: Title,
        private toastr: ToastrService,

    ) { }

    loginData: any;
    access: any;

    setInPreference(key: PreferenceKeys, value: any) {
        localStorage.setItem(key + "", value);
    }

    getFromPreference(key: PreferenceKeys) {
        return localStorage.getItem(key + "");
    }

    deleteFromPreference(key: PreferenceKeys) {
        localStorage.removeItem(key + "");
    }

    setAccessToken(accessToken: any) {
        this.setInPreference(PreferenceKeys.ACCESS_TOKEN, accessToken);
    }
    setAccessPermission(access: any) {
        this.setInPreference(PreferenceKeys.ACCESS, access);
    }

    getAccessToken() {
        return this.getFromPreference(PreferenceKeys.ACCESS_TOKEN);
    }

    isEmailVerified() {
        return this.getFromPreference(PreferenceKeys.PROFILE_INFO);
    }



    setUserAsLoggedIn(profile: any) {
        this.setObject(PreferenceKeys.ACCESS, profile);
    }

    setUserAsPermission() {
        return this.getObject(PreferenceKeys.ACCESS);
    }


    isUserLoggedIn() {
        const accessToken = this.getAccessToken();
        return accessToken && accessToken != "";
    }

    clearStorage() {
        localStorage.clear();
    }

    setObject(key: PreferenceKeys, object: any) {
        const objectStr = JSON.stringify(object);
        this.setInPreference(key, objectStr);
    }

    getObject(key: PreferenceKeys) {
        const objectStr = this.getFromPreference(key);
        if (objectStr) {
            return JSON.parse(objectStr);
        }
        return null;
    }

    setEmployeeInfo(data: any) {
        this.setObject(PreferenceKeys.EMPLOYEE_DATA, data);
    }

    setProfileInfo(profile: any) {
        this.setObject(PreferenceKeys.PROFILE_INFO, profile);
    }

    getProfileInfo() {
        return this.getObject(PreferenceKeys.PROFILE_INFO);
    }

    getUserName() {
        const profileInfo = this.getProfileInfo();
        return profileInfo
            ? profileInfo["firstName"] + " " + profileInfo["lastName"]
            : "";
    }

    getUserId() {
        const profileInfo = this.getProfileInfo();
        return profileInfo ? profileInfo["Id"] : "";
    }

    getUserCurrency() {
        const profileInfo = this.getProfileInfo();
        return profileInfo ? profileInfo["currency"] : null;
    }

    getRoleLabel(role: string, object: { [x: string]: any; }) {
        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    getUserRole() {
        const profileInfo = this.getProfileInfo();
        return profileInfo ? profileInfo["userType"] : "";
    }

    getUserProfileImage() {
        const profileInfo = this.getProfileInfo();
        return profileInfo && profileInfo["profileImage"]
            ? profileInfo["profileImage"]["url"]
            : "";
    }

    setAccess(access: any) {
        this.access = access;
    }

    getAccess() {
        return this.access;
    }

    clearPreference() {
        localStorage.clear()
    }

    showSuccess(message: any) {
        // todo toster
        this.toastr.success(message);
    }

    showWarning(message: any) {
        // todo toster
        this.toastr.warning(message);
    }
}
