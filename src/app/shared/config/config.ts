export const ACCESS_TOKEN_KEY: string = 'Authorization';
export enum CustomEvents {
  UNAUTHORISED,
}
export enum RestEnds {
  getEmployee = '/api/employee/getEmployee',

  getCountries = '/api/places/getCountries',

  getState = '/api/places/getStates',

  getCity = '/api/places/getCities',

  leaveConfig = '/api/leaveConfiguration/getById',

  leaveConfigs = '/api/leaveConfiguration/get',

  addEmployee = '/api/employee/addEmployee',

  editEmployee = '/api/employee/editEployee',

  getCrewData = '/api/crew/get',

  getonCrewData = '/api/crew/getSingle',

  addRoster = '/api/roster/addRoster',

  addYearlyRoster = '/api/roster/addYearlyRoster',

  getYearlyRosters = '/api/roster/getYearlyRoster',

  getCompany = '/api/company/getCompany',

  addCompany = '/api/company/addCompany',
  deleteUser = '/api/employee/deleteEmployee',

  deletebyuser = '/api/auth/deleteuser',

  editCompany = '/api/company/updateCompany',

  deleteCompany = '/api/company/deleteCompany',

  getBranch = '/api/branch/getBranch',

  getDepartment = '/api/department/getDepartment',

  addDepartment = '/api/department/addDepartment',

  editDepartment = '/api/department/eidtDepartment',

  getDesignation = '/api/designation/getDesignation',

  addDesignation = '/api/designation/addDesignation',

  editDesignation = '/api/designation/editDesignation',

  getGrade = '/api/grade/getGrade',

  addGrade = '/api/grade/addGrade',

  editGrade = '/api/grade/updateGrade',

  addBranch = '/api/branch/addBranch',

  editBranch = '/api/branch/updateBranch',

  deleteDesignation = '/api/designation/deleteDesignation',

  getSalaryComp = '/api/salaryComponent/getSalaryComponent',

  addSalaryComp = '/api/salaryComponent/addSalaryComponent',

  editSalaryComp = '/api/salaryComponent/updateSalaryComponent',

  getSalaryGrade = '/api/salaryGrade/getSalaryGrade',

  addSalaryGrade = '/api/salaryGrade/addSalaryGrade',

  getLeave = '/api/employee/getLeaveofEmployee',

  getLeaves = '/api/leaveType/get',

  getLeaveById = '/api/leave/getLeaveById',

  addLeave = '/api/leave/addLeave',

  updateLeave = '/api/leave/updateLeave',

  getHoliday = '/api/holiday/getHoliday',

  addHoliday = '/api/holiday/addHoliday',

  addloan = '/api/loan/addLoan',

  getloan = '/api/loan/getLoan',

  updateLoan = '/api/loan/editLoan',

  updateEmpLoan = '/api/employeeLoan/editEmpLoan',

  deleteLoan = '/api/loan/deleteLoan',

  updateHoliday = '/api/holiday/updateHoliday',

  getShift = '/api/shift/getShift',

  addShift = '/api/shift/addShift',

  updateShift = '/api/shift/updateShift',

  getSalaryStructure = '/api/salaryStructure/getSalaryStructure',

  addSalaryStructure = '/api/salaryStructure/addSalaryStructure',

  updateSalaryStructure = '/api/salaryStructure/updateSalaryStructure',

  add_shift = '/api/shift/addShift',

  Edit_shift = '/api/shift/updateShift',

  deleteGrade = '/api/grade/deleteGrade',

  deleteBranch = '/api/branch/deleteBranch',

  deleteDepartment = '/api/department/deletedepartment',

  deleteDesigbation = '/api/designation/deleteDesigbation',

  deleteLeave = '/api/leave/deleteLeave',

  deleteShift = '/api/shift/deleteShift',

  deleteHoliday = '/api/holiday/deleteHoliday',

  deleteSalaryComponent = '/api/salaryComponent/deleteSalaryComponent',

  deleteSalaryStructure = '/api/salaryStructure/deleteSalaryStructure',

  deleteSalaryGrade = '/api/salaryGrade/deleteSalaryGrade',

  deleteEmployee = '/api/employee/deleteEmployee',

  getPackage = '/api/package/getPackage',

  deletePackage = '/api/package/deletePackage',

  getBasicSalaryComponent = "/api/salaryComponent/getBasic",

  getPackageForEmp = '/api/package/getPackageForEmp',

  assignPackage = '/api/employee/assignPackage',

  assignShift = '/api/employee/assignShift',

  assignLeave = '/api/employee/assignLeave',

  login = '/api/auth/login',

  updateFirstSetup = '/api/auth/updateFirstSetup',

  updateSetup = '/api/auth/updateSetup',

  getSetup = '/api/auth/getSetup',

  createUser = '/api/auth/createUSer',

  addAttendence = '/api/attendence/addAttendence',

  saveRegularize = '/api/regularizeAttendance/addRegularizeAttendance',

  getAllAttendence = '/api/attendence/getMonthlyAttendance',

  getAllAttendences = '/api/attendence/getAttendence',

  getMonthlyAttendance = '/api/attendence/getMonthlyAttendance',

  dateDetails = '/api/attendence/getEmpAttendenceByDate',

  getLateMark = '/api/config/showLateMarkData',

  editMarkAttendance = '/api/attendence/editAttendence',

  addPackage = '/api/package/addPackage',

  getPackageInfo = '/api/package/getPackageInfo',

  getOnePackage = '/api/package/getOnePackage',

  removeLeaveFromPackage = '/api/package/removeLeaveFromPackage',

  removeComponentFromPackage = '/api/package/removeComponentFromPackage',

  addComponentToPackage = '/api/package/addComponentToPackage',

  getRig = '/api/rigManifest/getRigManifest',

  addRig = '/api/rigManifest/addRigManifest',

  editRig = '/api/rigManifest/updateRigManifest',

  deleteRig = '/api/rigManifest/deleteRigManifest',

  getPassenger = '/api/pessengerManifest/getPassengerManifest',

  addPassenger = '/api/pessengerManifest/addPassengerManifest',

  editPassenger = '/api/pessengerManifest/update',

  deletePassenger = '/api/pessengerManifest/deletePassengerManifest',

  getPassengerById = '/api/pessengerManifest/getPassengerManifestById',

  getBooking = '/api/booking/getBooking',

  addBooking = '/api/booking/addBooking',

  editBooking = '/api/booking/updatBooking',

  deleteBooking = '/api/booking/deleteBooking',

  getLeaveofEmployee = '/api/employee/getLeaveofEmployee',

  getEmployeePackages = '/api/employee/getEmployeePackages',

  getShiftOfEmployee = '/api/employee/getShiftOfEmployee',

  updatePackage = '/api/package/updatePackage',

  updateComponentToPackage = '/api/package/updateComponentToPackage',

  addLeaveToPackage = '/api/package/addLeaveToPackage',

  getRole = '/api/role/getRole',

  deleteRole = '/api/role/deleteRole',

  addRole = '/api/role/addRole',

  editRole = '/api/role/editRole',

  addAccess = '/api/access/addAccess',

  updateAccess = '/api/access/updateAccess',

  getUserAccessById = '/api/access/getUserAccessById',

  editAccess = '/api/role/editAccess',

  clone = '/api/role/clone',

  getdefaultAccess = '/api/access/getdefaultAccess',

  // getLoan="/api/loan/getLoan",

  // getLoanID="/api/employeeLoan/getLoneByID",

  // getEmp="/api/employee/getEmployee",

  getLoan = '/api/loan/getLoan',

  getLoanID = '/api/employeeLoan/getLoanByID',

  getEmp = '/api/employee/getEmployee',

  getEmpID = '/api/employee/getEmployeeById',

  getAddLoanData = '/api/employeeLoan/addEmpLoan',

  getEmployeeLoan = '/api/employeeLoan/getEmployeeLoan',

  getDeleteLoanData = '/api/employeeLoan/deleteEmpLoan',

  deleteEmpUser = '/api/auth/deleteuser',
  // leave track
  leave_request = '/api/leaveRequest/leave_request',

  leave_track = '/api/leaveRequest/leave_track',

  getAvailableLeave = '/api/leaveRequest/getAllAvailableLeaves',

  getRoster = '/api/roster/getRoster',

  getLeaveTrackId = '/api/leaveRequest/getRequestsById',

  addLeaveTrack = '/api/leaveRequest/send',

  getBalLeave = '/api/leaveRequest/getAvailableLeaves',

  updateleavetrack = '/api/leaveRequest/update',

  declineReqest = '/api/leaveRequest/request',

  // approvedReqest="/api/leaveRequest/approveRequest",
  approvedReqest = '/api/leaveRequest/approveRequest',

  deleteLeaveRecord = '/api/leaveRequest/deleteRequest',

  defaultAccess = '/api/access/getdefaultAccess',

  getAccessByroleId = '/api/role/getAccessByroleId',

  // add holiday list
  addholidaylist = '/api/holiday/addHoliday',
  getHolidayList = '/api/holiday/getHoliday',

  // deleteholidatlist=""
  getEmployeebyDepartment = '/api/employee/getEmployeebyDepartment',

  deleteHolidaylist = '/api/holiday/deleteHoliday',
  getHolidayListdataByID = '/api/holiday/getHolidayById',
  updateHolidaylist = '/api/holiday/updateHoliday',

  getLeaveTrackreq = '/api/leaveRequest/getRequests',
  getLeaveTrackAllreq = '/api/leaveRequest/getAllRequests',

  getAllReq = '/api/leaveRequest/getAllReq',

  addNotificationSetting = '/api/attendenceNotification/add',

  getNotifySetting = '/api/attendenceNotification/get',

  updateNotification = '/api/attendenceNotification/update',

  // absent notification
  addAbsentNotification = '/api/attendenceNotification/addAbsent',
  updateAbsentNotification = '/api/attendenceNotification/updateAbsent',

  addApproveNotification = '/api/attendenceNotification/addApprove',

  updateApproveNotification = '/api/attendenceNotification/updateApprove',

  // always present employee
  addAlwaysPresentEmp = '/api/alwaysPresent/add',

  getAlwaysPresent = '/api/alwaysPresent/get',

  editAlwaysPresentEmp = '/api/alwaysPresent/edit',

  deleteAlwaysPresentEmp = '/api/alwaysPresent/delete',

  // ================================================================

  addAttandenceSetting = '/api/AttendenceSetting/addAttandenceSetting',

  getSetting = '/api/AttendenceSetting/getSetting',

  editSetting = '/api/AttendenceSetting/editSetting',

  deleteSetting = '/api/AttendenceSetting/deleteSetting',

  addConfiguration = '/api/attendanceConfiguration/addConfiguration',

  getConfigurationById = '/api/attendanceConfiguration/getConfiguration',

  editConfiguration = '/api/attendanceConfiguration/editConfiguration',

  addLeaveConfig = '/api/leaveConfiguration/add',

  getLeaveConfig = '/api/leaveConfiguration/get',

  updateLeaveConfig = '/api/leaveConfiguration/edit',

  getDepartmentById = '/api/department/departmentGetById',

  addLeaveType = '/api/leaveType/add',

  getById = '/api/leaveType/getById',

  editLeaveType = '/api/leaveType/edit',

  addLeaveTypeConfig = '/api/leaveTypeConfiguration/add',

  updateLeaveTypeConfig = '/api/leaveTypeConfiguration/edit',

  getLeaveConfigById = '/api/leaveTypeConfiguration/getById',
  getdepartmentGetById = '/api/department/departmentGetById',

  updateRole = '/api/auth/updateRole',

  fd = '/api/shift/fd',

  hd = '/api/shift/hd',

  getShiftList = '/api/shift/getShift',

  getApproveAttendance = '/api/attendenceNotification/getApprove',

  getAbsentAttendance = '/api/attendenceNotification/getAbsent',

  getLeaveType = '/api/leaveType/get',

  deleteLeaveType = '/api/leaveType/delete',
  deleteApprove = '/api/attendenceNotification/deleteApprove',

  deleteAbsent = '/api/attendenceNotification/deleteApbsent',

  getMissingAttendence = '/api/attendenceNotification/getMissing',

  addMissingAttendence = '/api/attendenceNotification/addMissing',

  updateMissingAttendence = '/api/attendenceNotification/updateMissing',

  deleteMissingAttendence = '/api/attendenceNotification/deleteMissing',

  getLeaveApproval = '/api/leaveApproval/getLeaveApproval',

  addLeaveApproval = '/api/leaveApproval/addLeaveApproval',

  updateLeaveApproval = '/api/leaveApproval/updateLeaveApproval',

  deleteLeaveApproval = '/api/leaveApproval/deleteLeaveApproval',

  getEncashApplication = '/api/leaveApproval/getLeaveEncashApplication',

  addEncashApplication = '/api/leaveApproval/addLeaveEncashApplication',

  updateEncashApplication = '/api/leaveApproval/updateLeaveEncashApplication',

  deleteEncashApplication = '/api/leaveApproval/deleteLeaveEncashApplication',

  getEncashApproval = '/api/leaveApproval/getLeaveEncashApproval',

  addEncashApproval = '/api/leaveApproval/addLeaveEncashApproval',

  updateEncashApproval = '/api/leaveApproval/updateLeaveEncashApproval',

  deleteEncashApproval = '/api/leaveApproval/deleteLeaveEncashApproval',

  getAppNoti = '/api/leaveApproval/getLeaveApplicationNotification',

  addAppNoti = '/api/leaveApproval/addLeaveApplicationNotification',

  updateAppNoti = '/api/leaveApproval/updateLeaveApplicationNotification',

  deleteAppNoti = '/api/leaveApproval/deleteLeaveApplicationNotification',

  getApprovalNoti = '/api/leaveApproval/getleaveApprovalNotification',

  addApprovalNoti = '/api/leaveApproval/addleaveApprovalNotification',

  updateApprovalNoti = '/api/leaveApproval/updateleaveApprovalNotification',

  deleteApprovalNoti = '/api/leaveApproval/deleteleaveApprovalNotification',

  getPendingNoti = '/api/leaveApproval/getLeavePendingNotification',

  addPendingNoti = '/api/leaveApproval/addLeavePendingNotification',

  updatePendingNoti = '/api/leaveApproval/updateLeavePendingNotification',

  deletePendingNoti = '/api/leaveApproval/deleteLeavePendingNotification',

  getEncashNoti = '/api/leaveApproval/getLeaveEncashAppovalNotification',

  addEncashNoti = '/api/leaveApproval/addLeaveEncashAppovalNotification',

  updateEncashNoti = '/api/leaveApproval/updateLeaveEncashAppovalNotification',

  deleteEncashNoti = '/api/leaveApproval/deleteLeaveEncashAppovalNotification',

  showLateMarkData = '/api/config/showLateMarkData',

  getAllPresent = '/api/config/getAllPresent',

  deleteAsignLeave = '/api/employee/deleteLeve',

  getEmpCode = "/api/employee/getEmpID",

  getDepCode = "/api/department/getDepartmentCode",

  attendanceConfiguration = "/api/attendanceConfiguration/getConfiguration",

  getRegularization = '/api/regularizeAttendance/getRegularizeAttendance',

  addCandiate = "/api/candiate/addCandiate",

  getCandadit = "/api/candiate/getCandiate",

  updateCandadit = "/api/candiate/editCandiate",

  deleteCandadit = "/api/candiate/deleteCandiate",


  //   // DMS
  //   upload = 'documents/upload',

  //   createFolder = 'documents/folder',

  //   getFolder = 'documents/folder/get',

  addCandidateAsEmployee = "/api/candiate/addCandidateAsEmployee",

  addTemplate = "/api/template/addTemplate",

  getTemplate = "/api/template/getTemplate",

  deleteTemplate = "/api/template/deleteTemplate",

  editTemplate = "/api/template/editTemplate",

  // ============================================================

  addExitDetails = "/api/exitDetail/addExitDetails",

  getExitDetails = "/api/exitDetail/getExitDetails",

  editExitDetails = "/api/exitDetail/editExitDetails",

  deleteExitdetails = "/api/exitDetail/deleteExitdetails",

  getTemplateField = "/api/template/getTemplateByformName",

  addCrew = "/api/crew/add",

  getCrew = "/api/crew/get",

  getSingleCrew = "/api/crew/getSingle",

  getEmpByDesignation = "/api/employee/getEmpByDesignation",

  searchEmployee = "/api/employee/searchEmployee",

  searchDepartment = "/api/department/searchDepartment",

  searchDesignation = "/api/designation/searchDesignation",

  searchPackage = "/api/package/searchPackage",

  searchHoliday = "/api/holiday/searchHoliday",

  searchLeaveType = "/api/leaveType/searchLeaveType",

  searchShift = "/api/shift/searchShift",

  searchBranch = "/api/branch/searchBranch",

  searchRole = "/api/role/searchRole",

  searchCandidate = "/api/candiate/searchCandidate",

  searchCompany = "/api/company/searchCompany",

  searchSalaryComponent = "/api/salaryComponent/searchSalaryComponent",

  searchTemplate = "/api/template/searchTemplate"


  //   // DMS
  //   upload = 'documents/upload',

  //   createFolder = 'documents/folder',

  //   getFolder = 'documents/folder/get',
  // }

  // export const FILE_UPLOAD_LIMIT = 10000000 //10mb
  // export const supportedFileTypes = [
  //   "application/msword",
  //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //   "image/jpeg",
  //   "image/png",
  //   "application/pdf",
  //   "application/vnd.ms-excel",
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  // ]

  // export const FOLDERS = {
  //   EMPLOYEE: "Test Folder 2",
  //   RIG: "Test Folder 2",
  //   COMPANY: "Test Folder 2"
}
