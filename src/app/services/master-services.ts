import { Injectable } from '@angular/core';
import { RestEnds } from '../shared/config/config';
import { ApiManager } from '../shared/managers/api-manager';

@Injectable({
  providedIn: 'root'
})

export class MasterServices {
  // getRole(temp: { isDeleted: boolean; limit: number; offset: number; role_owner_id: any; }) {
  //   throw new Error('Method not implemented.');
  // }
  // assignLeave() {
  //   throw new Error('Method not implemented.');
  // }
  // addPackage(temp: { package: { package_name: string | null | undefined; annual_ctc: string | null | undefined; overtime_daily_rate: string | null | undefined; overtime_hourly_rate: string | null | undefined; }; salary: any; leaves: any; }) {
  //   throw new Error('Method not implemented.');
  // }

  // addRole(data: any) {
  //   return this.apiManager.sendPOSTRequest(RestEnds.addRole, data, true)
  // }

  getRole(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getRole, data, true)
  }
  deleteRole(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteRole, data, true)
  }
  addPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addPackage, data, true)
  }

  getPackageInfo(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getPackageInfo, data, true)
  }

  constructor(private apiManager: ApiManager) { }
  getEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmployee, data, true)
  }

  getCountries(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getCountries, data, true)
  }

  getState(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getState, data, true)
  }

  getCity(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getCity, data, true)
  }

  leaveConfig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.leaveConfig, data, true)
  }

  leaveConfigs(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.leaveConfigs, data, true)
  }


  getCrewData(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getCrewData, data, true)
  }

  editEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editEmployee, data, true)
  }


  getonCrewData(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getonCrewData, data, true)
  }

  getoffCrewData(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getonCrewData, data, true)
  }
  addRoster(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addRoster, data, true)
  }



  addYearlyRoster(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addYearlyRoster, data, true)
  }

  getYearlyRosters(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getYearlyRosters, data, true)
  }

  addEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addEmployee, data, true)
  }

  getBranch(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getBranch, data, true)
  }

  addBranch(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addBranch, data, true)
  }

  editBranch(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editBranch, data, true)
  }

  getDepartment(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getDepartment, data, true)
  }

  addDepartment(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addDepartment, data, true)
  }

  editDepartment(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editDepartment, data, true)
  }

  getDesignation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getDesignation, data, true)
  }

  addDesignation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addDesignation, data, true)
  }

  editDesignation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editDesignation, data, true)
  }

  deleteDesignation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteDesignation, data, true)
  }

  getGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getGrade, data, true)
  }

  addGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addGrade, data, true)
  }

  editGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editGrade, data, true)
  }

  getCompany(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getCompany, data, true)
  }

  addCompany(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addCompany, data, true)
  }

  editCompany(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editCompany, data, true)
  }

  deleteCompany(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteCompany, data, true)
  }

  // todays's todo
  getLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeave, data, true)
  }


  getLeaves(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaves, data, true)
  }


  getLeaveById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveById, data, true)
  }

  addLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeave, data, true)
  }

  getDepartmentid(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getdepartmentGetById, data, true)
  }

  updateLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateLeave, data, true)
  }

  getHoliday(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getHoliday, data, true)
  }

  addHoliday(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addHoliday, data, true)
  }

  addloan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addloan, data, true)
  }

  getloan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getloan, data, true)
  }

  updateLoan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateLoan, data, true)
  }


  updateEmpLoan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateEmpLoan, data, true)
  }


  deleteLoan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteLoan, data, true)
  }

  updateHoliday(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateHoliday, data, true)
  }

  getShift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getShift, data, true)
  }

  addShift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addShift, data, true)
  }

  updateShift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateShift, data, true)
  }

  getSalaryStructure(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getSalaryStructure, data, true)
  }

  addSalaryStructure(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addSalaryStructure, data, true)
  }

  updateSalaryStructure(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateSalaryStructure, data, true)
  }


  add_shift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.add_shift, data, true)
  }

  Edit_shift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.Edit_shift, data, true)
  }


  getSalaryComp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getSalaryComp, data, true)
  }

  addSalaryComp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addSalaryComp, data, true)
  }

  editSalaryComp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editSalaryComp, data, true)
  }


  // Salary Grade

  getSalaryGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getSalaryGrade, data, true)
  }
  addSalaryGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addSalaryGrade, data, true)
  }


  // delete function

  deleteGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteGrade, data, true)
  }

  deleteBranch(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteBranch, data, true)
  }

  deleteDepartment(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteDepartment, data, true)
  }

  deleteDesigbation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteDesigbation, data, true)
  }

  deleteLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteLeave, data, true)
  }

  deleteShift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteShift, data, true)
  }

  deleteHoliday(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteHoliday, data, true)
  }

  deleteSalaryComponent(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteSalaryComponent, data, true)
  }

  deleteSalaryStructure(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteSalaryStructure, data, true)
  }

  deleteSalaryGrade(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteSalaryGrade, data, true)
  }

  deleteEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteEmployee, data, true)
  }

  getPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getPackage, data, true)
  }

  deletePackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deletePackage, data, true)
  }

  getPackageForEmp() {
    return this.apiManager.sendPOSTRequest(RestEnds.getPackageForEmp, null, true)
  }

  getBasicSalaryComponent(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getBasicSalaryComponent, data, true)
  }

  assignPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.assignPackage, data, true)
  }

  login(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.login, data, false)
  }

  updateFirstSetup(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateFirstSetup, data, true)
  }

  updateSetup(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateSetup, data, true)
  }

  getSetup(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getSetup, data, true)
  }

  createUser(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.createUser, data, true)
  }

  addAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addAttendence, data, true)
  }

  saveRegularize(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.saveRegularize, data, true)
  }

  getAllAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAllAttendences, data, true)
  }

  getMonthlyAttendance(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getMonthlyAttendance, data, true)
  }
  dateDetails(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.dateDetails, data, true)
  }
  getMonthlyAttendanceEvent(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getMonthlyAttendance, data, true)
  }

  getLateMark(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLateMark, data, true)
  }


  editMarkAttendance(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editMarkAttendance, data, true)
  }

  // Manifest
  getRig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getRig, data, true)
  }

  addRig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addRig, data, true)
  }

  editRig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editRig, data, true)
  }
  deleteRig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteRig, data, true)
  }

  getPassenger(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getPassenger, data, true)
  }

  addPassenger(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addPassenger, data, true)
  }

  editPassenger(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editPassenger, data, true)
  }
  deletePassenger(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deletePassenger, data, true)
  }
  getPassengerById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getPassengerById, data, true)
  }
  removeComponentFromPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.removeComponentFromPackage, data, true)
  }

  addComponentToPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addComponentToPackage, data, true)
  }

  // addPackage(data: any) {
  //   return this.apiManager.sendPOSTRequest(RestEnds.addPackage, data, true)
  // }

  getOnePackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getOnePackage, data, true)
  }

  removeLeaveFromPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.removeLeaveFromPackage, data, true)
  }

  assignShift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.assignShift, data, true)
  }

  assignLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.assignLeave, data, true)
  }

  getBooking(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getBooking, data, true)
  }

  addBooking(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addBooking, data, true)
  }

  editBooking(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editBooking, data, true)
  }

  deleteBooking(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteBooking, data, true)
  }

  getLeaveofEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveofEmployee, data, true)
  }

  getEmployeePackages(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmployeePackages, data, true)
  }

  getShiftOfEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getShiftOfEmployee, data, true)
  }

  updatePackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updatePackage, data, true)
  }

  updateComponentToPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateComponentToPackage, data, true)
  }

  addLeaveToPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeaveToPackage, data, true)
  }

  clone(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.clone, data, true)
  }

  addAccess(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addAccess, data, true)
  }

  updateAccess(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateAccess, data, true)
  }
  getUserAccessById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getUserAccessById, data, true)
  }

  // loan
  getLoan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLoan, data, true)
  }

  // getRole(data: any) {
  //   return this.apiManager.sendPOSTRequest(RestEnds.getRole, data, true)
  // }

  // clone(data: any) {
  //   return this.apiManager.sendPOSTRequest(RestEnds.clone, data, true)
  // }

  addRole(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addRole, data, true)
  }

  editRole(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editRole, data, true)
  }

  getLoanID(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLoanID, data, true)
  }

  getEmp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmp, data, true)
  }

  getEmpID(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmpID, data, true)
  }

  getLoadData(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmployeeLoan, data, true)
  }

  addEmployeeloan(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAddLoanData, data, true)

  }

  deleteLoanEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getDeleteLoanData, data, true)
  }
  // leave Track

  leave_request(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.leave_request, data, true)
  }
  leave_track(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.leave_track, data, true)
  }


  getAllAvailableLeaves(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAvailableLeave, data, true)
  }

  getRoster(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getRoster, data, true)
  }

  addLeaveTrack(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeaveTrack, data, true)
  }

  getBalLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getBalLeave, data, true)
  }
  updateleavetrack(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateleavetrack, data, true)
  }

  getLeaveTrackId(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveTrackId, data, true)
  }

  deleteUser(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteUser, data, true)
  }

  deleteEmpUser(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteEmpUser, data, true)
  }

  deletebyuser(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteUser, data, true)
  }


  declineReqest(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.declineReqest, data, true)

  }
  approvedReqest(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.declineReqest, data, true)

  }
  deleteLeaveRecord(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteLeaveRecord, data, true)

  }

  editAccess(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editAccess, data, true)
  }

  getAccessByroleId(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAccessByroleId, data, true)
  }

  defaultAccess(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.defaultAccess, data, true)
  }

  addHolidayList(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addholidaylist, data, true)
  }

  getHolidayList(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getHolidayList, data, true)
  }

  getShiftList(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getShiftList, data, true)
  }


  getEmployeebyDepartment(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmployeebyDepartment, data, true)
  }
  deleteHolidaylist(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteHolidaylist, data, true)
  }
  getHolidayListdataByID(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getHolidayListdataByID, data, true)
  }

  updateHolidaylist(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateHolidaylist, data, true)
  }
  getLeaveTrackreq(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveTrackreq, data, true)
  }

  getLeaveTrackAllreq(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveTrackAllreq, data, true)
  }


  getAllReq(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAllReq, data, true)
  }

  addNotificationSetting(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addNotificationSetting, data, true)
  }

  getNotifySetting(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getNotifySetting, data, true)
  }

  // add always present
  addAlwaysPresentEmp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addAlwaysPresentEmp, data, true)
  }

  getAlwaysPresent(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAlwaysPresent, data, true)
  }

  editAlwaysPresentEmp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editAlwaysPresentEmp, data, true)
  }

  deleteAlwayspresentEmp(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteAlwaysPresentEmp, data, true)
  }

  // ===========================================================
  addAttandenceSetting(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addAttandenceSetting, data, true)
  }

  updateNotification(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateNotification, data, true)
  }

  getSetting(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getSetting, data, true)
  }

  editSetting(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editSetting, data, true)
  }

  deleteSetting(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteSetting, data, true)
  }

  addConfiguration(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addConfiguration, data, true)
  }

  getConfigurationById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getConfigurationById, data, true)
  }

  editConfiguration(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editConfiguration, data, true)
  }

  addLeaveConfig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeaveConfig, data, true)
  }

  getLeaveConfig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveConfig, data, true)
  }

  editLeaveConfig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateLeaveConfig, data, true)
  }

  getDepartmentById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getDepartmentById, data, true)
  }

  addLeaveType(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeaveType, data, true)
  }

  getLeaveType(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveType, data, true)
  }

  getById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getById, data, true)
  }

  editLeaveType(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editLeaveType, data, true)
  }

  addLeaveTypeConfig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeaveTypeConfig, data, true)
  }

  updateLeaveTypeConfig(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateLeaveTypeConfig, data, true)
  }

  getLeaveConfigById(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveConfigById, data, true)
  }

  updateRoleByEmpId(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateRole, data, true)
  }

  fullDay(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.fd, data, true)
  }

  haldDay(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.hd, data, true)
  }

  addAbsentNotification(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addAbsentNotification, data, true)
  }

  updateAbsentNotification(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateAbsentNotification, data, true)
  }

  addApproveNotification(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addApproveNotification, data, true)
  }

  updateApproveNotification(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateApproveNotification, data, true)
  }


  getApproveAttendance(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getApproveAttendance, data, true)
  }
  getAbsentAttendance(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAbsentAttendance, data, true)
  }

  deleteLeaveType(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteLeaveType, data, true)
  }
  deleteApproveAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteApprove, data, true)
  }

  deleteAbsentAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteAbsent, data, true)
  }

  getMissingAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getMissingAttendence, data, true)
  }

  addMissingAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addMissingAttendence, data, true)
  }

  updateMissingAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateMissingAttendence, data, true)
  }

  deleteMissingAttendence(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteMissingAttendence, data, true)
  }

  getLeaveApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getLeaveApproval, data, true)
  }

  addLeaveApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addLeaveApproval, data, true)
  }

  updateLeaveApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateLeaveApproval, data, true)
  }

  deleteLeaveApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteLeaveApproval, data, true)
  }

  getEncashApplication(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEncashApplication, data, true)
  }

  addEncashApplication(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addEncashApplication, data, true)
  }

  updateEncashApplication(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateEncashApplication, data, true)
  }

  deleteEncashApplication(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteEncashApplication, data, true)
  }

  getEncashApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEncashApproval, data, true)
  }

  addEncashApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addEncashApproval, data, true)
  }

  updateEncashApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateEncashApproval, data, true)
  }

  deleteEncashApproval(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteEncashApproval, data, true)
  }

  getAppNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAppNoti, data, true)
  }

  addAppNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addAppNoti, data, true)
  }

  updateAppNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateAppNoti, data, true)
  }

  deleteAppNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteAppNoti, data, true)
  }

  getApprovalNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getApprovalNoti, data, true)
  }

  addApprovalNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addApprovalNoti, data, true)
  }

  updateApprovalNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateApprovalNoti, data, true)
  }

  deleteApprovalNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteApprovalNoti, data, true)
  }

  getPendingNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getPendingNoti, data, true)
  }

  addPendingNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addPendingNoti, data, true)
  }

  updatePendingNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updatePendingNoti, data, true)
  }

  deletePendingNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deletePendingNoti, data, true)
  }

  getEncashNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEncashNoti, data, true)
  }

  addEncashNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addEncashNoti, data, true)
  }

  updateEncashNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateEncashNoti, data, true)
  }

  deleteEncashNoti(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteEncashNoti, data, true)
  }

  showLateMarkData(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.showLateMarkData, data, true)
  }

  getAllPresent(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getAllPresent, data, true)
  }

  deleteAsignLeave(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteAsignLeave, data, true)

  }

  getEmpCode(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmpCode, data, true)

  }

  getDepCode(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getDepCode, data, true)

  }

  attendanceConfiguration(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.attendanceConfiguration, data, true)

  }

  getRegularization(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getRegularization, data, true)
  }

  addCandiate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addCandiate, data, true)
  }

  getCandadit(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getCandadit, data, true)
  }

  editCandadit(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.updateCandadit, data, true)
  }

  deleteCandiate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteCandadit, data, true)
  }

  addCandidateAsEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addCandidateAsEmployee, data, true)
  }

  addTemplate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addTemplate, data, true)
  }

  getTemplate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getTemplate, data, true)
  }

  deleteTemplate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteTemplate, data, true)
  }

  editTemplate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editTemplate, data, true)
  }

  // ===========================================================================
  addExitDetails(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addExitDetails, data, true)
  }

  getExitDetails(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getExitDetails, data, true)
  }

  editExitDetails(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.editExitDetails, data, true)
  }

  deleteExitdetails(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.deleteExitdetails, data, true)
  }

  getFields(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getTemplateField, data, true)
  }

  addCrew(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.addCrew, data, true)
  }

  getCrew(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getCrew, data, true)
  }

  getSingleCrew(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getSingleCrew, data, true)
  }

  getEmpByDesignation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.getEmpByDesignation, data, true)
  }

  searchEmployee(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchEmployee, data, true)
  }

  searchDepartment(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchDepartment, data, true)
  }

  searchDesignation(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchDesignation, data, true)
  }

  searchPackage(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchPackage, data, true)
  }

  searchHoliday(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchHoliday, data, true)
  }

  searchLeaveType(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchLeaveType, data, true)
  }

  searchShift(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchShift, data, true)
  }

  searchBranch(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchBranch, data, true)
  }

  searchRole(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchRole, data, true)
  }

  searchCandidate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchCandidate, data, true)
  }

  searchCompany(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchCompany, data, true)
  }

  searchSalaryComponent(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchSalaryComponent, data, true)
  }

  searchTemplate(data: any) {
    return this.apiManager.sendPOSTRequest(RestEnds.searchTemplate, data, true)
  }
}
