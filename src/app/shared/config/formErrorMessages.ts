export const VALIDATION_MESSAGES = {
  designationForm: {
    job_title: [
      {
        type: 'required',
        message: 'Please enter a designation',
      },
      {
        type: 'pattern',
        message: 'Please enter a text Only',
      },
    ],
    description: [
      {
        type: 'required',
        message: 'Please enter a description',
      },
      {
        type: 'pattern',
        message: 'Please enter a text Only',
      },
    ],
  },

  roleMasterForm: {
    roll_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter a designation',
      },
    ],
  },

  addCandidate: {
    employeee_name: [
      {
        type: 'required',
        message: 'Please Enter A Employee NAme',
      }
    ],

    separation_date: [
      {
        type: 'required',
        message: 'Please Enter A Separation Date',
      }
    ],

    interviewer: [
      {
        type: 'required',
        message: 'Please Enter A Interviewer',
      }
    ]
  },

  shiftForm: {
    shift_name: [
      {
        type: 'required|maxlength',
        message: 'Please Enter a Shift Name',
      },
    ],
    description: [
      {
        type: 'required',
        message: 'Please Enter a Description',
      },
    ],
    start_time: [
      {
        type: 'required',
        message: 'Please Enter a Start Time',
      },
    ],
    end_time: [
      {
        type: 'required',
        message: 'Please Enter a End Time',
      },
    ],
    half_day_time: [
      {
        type: 'required',
        message: 'Please Enter a Half Day Time',
      },
    ],
    working_hrs_LT_half_day: [
      {
        type: 'required',
        message: 'Please Enter a Working Hours Less Than Half Day',
      },
    ],
    full_day_working_hrs: [
      {
        type: 'required',
        message: 'Please Enter a Full Day Working Hours',
      },
    ],
    late_mark_time: [
      {
        type: 'required',
        message: 'Please Enter a Late Mark Time',
      },
    ],
    break_time: [
      {
        type: 'required',
        message: 'Please Enter a Break Time',
      },
    ],
  },

  alwaysPresentEmpForm: {
    employee_id: [
      {
        type: 'required',
        messages: 'Please Enter Employee Name',
      },
    ],
    minimum_start_time: [
      {
        type: 'required',
        messages: 'Please Enter Minimum Start Time',
      },
    ],
    maximum_start_time: [
      {
        type: 'required',
        messages: 'Please Enter Maximum Start Time',
      },
    ],
    minimum_end_time: [
      {
        type: 'required',
        messages: 'Please Enter Minimum End Time',
      },
    ],
    maximum_end_time: [
      {
        type: 'required',
        messages: 'Please Enter Maximum End Time',
      },
    ],
  },

  yearlyCrewForm: {
    startDate: [
      {
        type: 'required',
        message: 'Please select from date ',
      },
    ],
    endDate: [
      {
        type: 'required',
        message: 'Please select from date and select days cycle ',
      },
    ],
    on_crew_id: [
      {
        type: 'required',
        message: 'Please select the main crew',
      },
    ],
    off_crew_id: [
      {
        type: 'required',
        message: 'Please select the replacement crew',
      },
    ],
    gap: [
      {
        type: 'required',
        message: 'Please select the days cycle',
      },
    ],
  },

  generalPackageForm: {
    package_name: [
      {
        type: 'required',
        message: 'Please enter a package name',
      },
    ],
    annual_ctc: [
      {
        type: 'required|maxLength',
        message: 'Please enter a annual ctc',
      },
    ],
    overtime_daily_rate: [
      {
        type: 'required|maxLength',
        message: 'Please enter overtime daily rate',
      },
    ],
    overtime_hourly_rate: [
      {
        type: 'required|maxLength',
        message: 'Please enter overtime hourly rate',
      },
    ],
  },
  departmentForm: {
    department_code: [
      {
        type: 'required',
        message: 'Please enter a department code',
      },
    ],
    department_name: [
      {
        type: 'required',
        message: 'Please enter department name',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    parent_department: [
      {
        type: 'required',
        message: 'Please enter parent department name',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    phone_number: [
      {
        type: 'required|maxlength|pattern',
        message: 'please enter valid phone number',
      },
    ],
    manager_name: [
      {
        type: 'required',
        message: 'please select manager name',
      },
    ],
  },
  branchForm: {
    branch_name: [
      {
        type: 'required',
        message: 'Please enter a valid branch name',
      },
    ],
    branch_mobile: [
      {
        type: 'pattern',
        message: 'Please enter valid mobile number',
      }
    ],
    branch_code: [
      {
        type: 'required',
        message: 'Please enter a valid branch code',
      },
    ],
    company_name: [
      {
        type: 'required',
        message: 'Please select company name',
      },
    ],
    branch_email: [
      {
        type: 'required|maxlength|pattern',
        message: 'Please enter valid email',
      },
    ],
    pan_no: [

      {
        type: 'maxlength',
        message: 'Maximum 10 length is required',
      },
      {
        type: 'pattern',
        message: 'Your PAN card number is invalid',
      }]

  },
  // leavetypeForm: {
  //     leave_name: [
  //         {
  //             type: "required",
  //             message: "Please enter a leave type name",
  //         },
  //         {
  //             type: "pattern",
  //             message: "Please enter a text Only",
  //         },
  //     ],
  //     no_of_days: [
  //         {
  //             type: "required",
  //             message: "Please enter number of days",
  //         }
  //     ],
  //     leave_desc: [
  //         {
  //             type: "required",
  //             message: "Please enter leave description",
  //         }
  //     ],
  // },
  shifttypeForm: {
    shift_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter shift type name',
      },
    ],
    start_time: [
      {
        type: 'required',
        message: 'Please enter shift start time',
      },
    ],
    end_time: [
      {
        type: 'required',
        message: 'Please enter shift end time',
      },
    ],
    full_day_working_hrs: [
      {
        type: 'required',
        message: 'Please enter full day working hours',
      },
    ],
    half_day_working_hrs: [
      {
        type: 'required',
        message: 'Please enter half day working hours',
      },
    ],
    working_hours_ot_rate: [
      {
        type: 'required',
        message: 'Please enter working hours overtime rate',
      },
    ],
    half_day_time: [
      {
        type: 'required',
        message: 'Please enter halfday time',
      },
    ],
    week_days: [
      {
        type: 'required',
        message: 'Please enter week days',
      },
    ],
    off_days: [
      {
        type: 'required',
        message: 'Please enter off days',
      },
    ],
    working_hrs_LT_half_day: [
      {
        type: 'required',
        message: 'Please enter working hours less than half days',
      },
    ],
  },
  holidaylistForm: {
    holiday_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter holiday list name',
      },
    ],
    date: [
      {
        type: 'required',
        message: 'Please enter holiday list date',
      },
    ],
  },
  attendanceForm: {
    employee_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter employee name',
      },
    ],
    attendance_date: [
      {
        type: 'required',
        message: 'Please enter attendance date',
      },
    ],
    status: [
      {
        type: 'required',
        message: 'Please select status',
      },
    ],
    shift: [
      {
        type: 'required',
        message: 'Please select shift',
      },
    ],
    branch: [
      {
        type: 'required|maxlength',
        message: 'Please select branch name',
      },
    ],
    department: [
      {
        type: 'required|maxlength',
        message: 'Please select department name',
      },
    ],
  },
  salaryComponentForm: {
    component_name: [
      {
        type: 'required',
        message: 'Please enter salary component',
      },
    ],
    component_code: [
      {
        type: 'required',
        message: 'Please enter salary component code',
      },
    ],
    ledger: [
      {
        type: 'required',
        message: 'Please enter ledger',
      },
    ],
  },
  holidayListForms: {
    holiday_name: [
      {
        type: 'required',
        message: 'Please enter holiday list name',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    holiday_assign: [
      {
        type: 'required',
        message: 'Please select assign to option ',
      },
    ],
    holiday_date: [
      {
        type: 'required',
        message: 'Please select date ',
      },
    ],
  },
  salarystructForm: {
    salary_structure_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter salary structure name',
      },
    ],
    salarycomp_name: [
      {
        type: 'required',
        message: 'Please select salary component name',
      },
    ],
    grade: [
      {
        type: 'required|maxlength',
        message: 'Please select grade',
      },
    ],
  },
  salarygradeForm: {
    salary_grade: [
      {
        type: 'required',
        message: 'Please enter salary grade',
      },
    ],
    grade: [
      {
        type: 'required',
        message: 'Please select grade name',
      },
    ],
    component_name: [
      {
        type: 'required',
        message: 'Please select salary component name',
      },
    ],
  },
  rigForm: {
    name: [
      {
        type: 'required',
        message: 'Please enter rig name',
      },
    ],
    rigmanifest_date: [
      {
        type: 'required',
        message: 'Please enter rig date',
      },
    ],
  },
  passengerForm: {
    type: [
      {
        type: 'required',
        message: 'Please enter passenger type',
      },
    ],
    purchasing: [
      {
        type: 'required',
        message: 'Please enter purchasing code',
      },
    ],
    plant: [
      {
        type: 'required',
        message: 'Please enter plant code',
      },
    ],
    date: [
      {
        type: 'required',
        message: 'Please enter date',
      },
    ],
    vendor_code: [
      {
        type: 'required',
        message: 'Please enter vendor code',
      },
    ],
  },
  bookingForm: {
    booking_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter booking name',
      },
    ],
    description: [
      {
        type: 'required|maxlength',
        message: 'Please enter description',
      },
    ],
    code: [
      {
        type: 'required',
        message: 'Please enter code',
      },
    ],
    date: [
      {
        type: 'required',
        message: 'Please enter date',
      },
    ],
  },

  // employee form
  generalForm: {
    emp_role: [
      {
        type: 'required',
        message: 'Select role',
      },
    ],
    remark: [
      {
        type: 'pattern',
        message: ' Only text is required ',
      },
    ],
    title: [
      {
        type: 'required',
        message: 'Select title',
      },
    ],
    first_name: [
      {
        type: 'required',
        message: 'Enter first name',
      },
      {
        type: 'maxlength',
        message: 'Maximum 50 length is required',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    middle_name: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    last_name: [
      {
        type: 'required',
        message: 'Enter last name',
      },
      {
        type: 'maxlength',
        message: 'Maximum 50 length is required',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    emp_type: [
      {
        type: 'required',
        message: 'Select employee type',
      },
    ],
    manager_name: [
      {
        type: 'required',
        message: 'Enter manager name',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    employee_classification: [
      {
        type: 'required',
        message: 'Select employee classification',
      },
    ],
    company_id: [
      {
        type: 'required',
        message: 'Select company name',
      },
    ],
    working_location: [
      {
        type: 'required',
        message: 'Enter work location',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    work_emailId: [
      {
        type: 'required',
        message: 'Please Enter work email id',
      },
      {
        type: 'pattern',
        message: 'Please Enter official email id',
      },
    ],

    date_of_joining: [
      {
        type: 'required',
        message: 'Select date of joining',
      },
    ],
    department_id: [
      {
        type: 'required',
        message: 'Select department',
      },
    ],
  },
  personalForm: {
    nationality: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    religion: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    date_of_birth: [
      {
        type: 'required',
        message: 'Please enter date of birth',
      },
    ],
    gender: [
      {
        type: 'required',
        message: 'Please select gender',
      },
    ],
    personal_email: [
      {
        type: 'required',
        message: 'Please enter valid personal email',
      },
      {
        type: 'pattern',
        message: 'Please enter valid personal email',
      },
    ],
    mobile_no: [
      {
        type: 'required',
        message: 'Please enter mobile number',
      },
      {
        type: 'pattern',
        message: 'Please enter valid mobile number',
      },
    ],
    work_experience: [
      {
        type: 'required',
        message: 'Please select work experience',
      },
    ],
    comm_address: [
      {
        type: 'required|maxlength',
        message: 'Please enter address',
      },
    ],
    comm_country: [
      {
        type: 'required|',
        message: 'Please select country',
      },
    ],
    comm_state: [
      {
        type: 'required',
        message: 'Please enter state name',
      },
    ],
    comm_destrict: [
      {
        type: 'required',
        message: 'Please enter district name',
      },
    ],
    comm_city: [
      {
        type: 'required',
        message: 'Please enter city name',
      },
    ],
    permanent_address: [
      {
        type: 'required',
        message: 'Please enter permanent address',
      },
    ],
    temporary_address: [
      {
        type: 'required',
        message: 'Please enter temporary address',
      },
    ],
    country: [
      {
        type: 'required',
        message: 'Please select  country',
      },
    ],
    state: [
      {
        type: 'required',
        message: 'Please enter state name',
      },
    ],
    district: [
      {
        type: 'required',
        message: 'Please enter district name',
      },
    ],
    city: [
      {
        type: 'required',
        message: 'Please enter city name',
      },
    ],
    zipcode: [
      {
        type: 'required',
        message: 'Please enter correct pincode',
      },

    ],

    comm_zip: [
      {
        type: 'required',
        message: 'Please enter correct pincode',
      },

    ],
  },
  nomineeForm: {
    nominee_mobile_no: [
      {
        type: 'required',
        message: 'Please enter mobile number',
      },
      {
        type: 'pattern',
        message: 'Please enter valid mobile number',
      },
    ],
    nominee_email: [
      {
        type: 'required',
        message: 'Please enter valid email',
      },
      {
        type: 'pattern',
        message: 'Please enter valid email id',
      },
    ],
    nominee_name: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    emergency_name: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    emergency_Email: [
      {
        type: 'pattern',
        message: 'Please enter valid email id',
      },
    ],
  },
  bankDetailsInfoForm: {
    bank_name: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
  },
  otherInfoForm: {
    pan_no: [
      {
        type: 'required',
        message: 'Please enter PAN Card number',
      },
      {
        type: 'maxlength',
        message: 'Maximum 10 length is required',
      },
      {
        type: 'pattern',
        message: 'Your PAN card number is invalid',
      },
    ],
    passport_no: [
      {
        type: 'pattern',
        message: 'Your Passport number is invalid, Please Enter Eg : A21 90457',
      },
    ],
    aadhar_no: [
      {
        type: 'required',
        message: 'Please enter Aadhar Card number',
      },
      {
        type: 'pattern',

        message: 'Your Aadhar Card number is invalid',
      },
    ],
  },

  // candadit
  cdGeneralForm: {
    first_name: [
      {
        type: 'required',
        message: 'Enter first name',
      },
      {
        type: 'maxlength',
        message: 'Maximum 50 length is required',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    middle_name: [
      {
        type: 'pattern',
        message: 'Only text is required',
      },
      {
        type: 'maxlength',
        message: 'Maximum 50 length is required',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    last_name: [
      {
        type: 'required',
        message: 'Enter last name',
      },
      {
        type: 'maxlength',
        message: 'Maximum 50 length is required',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    company_name: [
      {
        type: 'required',
        message: 'Enter last name',
      },
    ],
    work_email_id: [
      {
        type: 'required|maxlength|pattern',
        message: 'Please Enter Official Email id',
      },
    ],
  },
  cdProfessionalForm: {
    tentative_joining_date: [
      {
        type: 'required',
        message: 'Enter tentative Joining Date',
      }
    ]
  },

  cdPersonalForm: {
    // email: [
    //   {
    //     type: 'required|maxlength|pattern',
    //     message: 'Please enter valid personal email',
    //   },
    // ],
    mobile_no: [
      {
        type: 'required',
        message: 'Please enter mobile number',
      },
      {
        type: 'pattern',
        message: 'Please enter valid mobile number',
      },
    ],
    date_of_birth: [
      {
        type: 'required',
        message: 'Please enter date of birth',
      },
    ],
    gender: [
      {
        type: 'required',
        message: 'Please select gender',
      },
    ],
    comm_address: [
      {
        type: 'required|maxlength',
        message: 'Please enter address',
      },
    ],
    comm_city: [
      {
        type: 'required',
        message: 'Please enter city name',
      },
    ],
    comm_district: [
      {
        type: 'required',
        message: 'please enter district',
      },
    ],
    comm_state: [
      {
        type: 'required',
        message: 'please enter state',
      },
    ],
    comm_pincode: [
      {
        type: 'required',
        message: 'please enter pincode',
      },
    ],
    comm_country: [
      {
        type: 'required',
        message: 'please enter country',
      },
    ],
    permanent_address: [
      {
        type: 'required',
        message: 'please enter address',
      },
    ],
    permanent_city: [
      {
        type: 'required',
        message: 'please enter city',
      },
    ],
    permanent_district: [
      {
        type: 'required',
        message: 'please enter district',
      },
    ],
    permanent_state: [
      {
        type: 'required',
        message: 'please enter state',
      },
    ],
    permanent_pincode: [
      {
        type: 'required',
        message: 'please enter pincode',
      },
    ],
    permanent_country: [
      {
        type: 'required',
        message: 'please enter country',
      },
    ],
  },

  // cdProfessionalForm: {},

  cdOtherForm: {
    pan_no: [
      {
        type: 'required',
        message: 'Please enter PAN Card number',
      },
      {
        type: 'maxlength',
        message: 'Maximum 10 length is required',
      },
      {
        type: 'pattern',
        message: 'Your PAN card number is invalid',
      },
    ],
    aadhar_no: [
      {
        type: 'required',
        message: 'Please enter Aadhar Card number',
      },
      {
        type: 'pattern',
        message: 'Your Aadhar Card number is invalid',
      },
    ],
  },

  signOnForm: {
    on_year: [
      {
        type: 'required',
        message: 'Please enter the year',
      },
    ],
    on_date: [
      {
        type: 'required',
        message: 'Please enter the date',
      },
    ],
    signOn_crew_name: [
      {
        type: 'required',
        message: 'Please enter crew name',
      },
    ],
    on_crew_name: [
      {
        type: 'required',
        message: 'Please enter on crew name',
      },
    ],
  },
  signOffForm: {
    off_year: [
      {
        type: 'required',
        message: 'Please enter year',
      },
    ],
    off_date: [
      {
        type: 'required',
        message: 'Please enter date',
      },
    ],
    signOff_crew_name: [
      {
        type: 'required',
        message: 'Please enter crew name',
      },
    ],
    off_crew_name: [
      {
        type: 'required',
        message: 'Please enter on crew name',
      },
    ],
  },
  bankForm: {
    bank_name: [
      {
        type: 'required',
        message: 'Please enter bank name',
      },
    ],
    account_no: [
      {
        type: 'required',
        message: 'Please enter account number',
      },
    ],
    ifsc_code: [
      {
        type: 'required',
        message: 'Please enter IFSC code',
      },
    ],
    branch: [
      {
        type: 'required',
        message: 'Please enter branch name',
      },
    ],
    country: [
      {
        type: 'required',
        message: 'Please select country',
      },
    ],
    state: [
      {
        type: 'required',
        message: 'Please select state',
      },
    ],
    district: [
      {
        type: 'required',
        message: 'Please enter district',
      },
    ],
    city: [
      {
        type: 'required',
        message: 'Please enter city',
      },
    ],
    address: [
      {
        type: 'required',
        message: 'Please enter address',
      },
    ],
  },
  companyForm: {
    company_state: [
      {
        type: 'required',
        message: 'Please Enter Company State',
      }
    ],
    company_country: [
      {
        type: 'required',
        message: 'Please Enter Company Country',
      }
    ],
    company_name: [
      {
        type: 'required|maxlength',
        message: 'Please enter company name',
      },
    ],
    company_code: [
      {
        type: 'required',
        message: 'Please enter company code',
      },
    ],
    type_of_orginization: [
      {
        type: 'required',
        message: 'Please enter type of organization',
      },
    ],
    company_phone: [
      {
        type: 'required|maxlength',
        message: 'Please enter company phone number.',
      },
    ],
    company_email: [
      {
        type: 'required|maxlength|pattern',
        message: 'Please enter company email.',
      },
    ],
    company_fax: [
      {
        type: 'pattern',
        message: 'Please enter company fax number.',
      },
    ],
    company_mobile: [
      {
        type: 'pattern',
        message: 'Please enter company mobile number.',
      },
    ],
    company_pan: [
      {
        type: 'maxlength',
        message: 'Maximum 10 length is required',
      },
      {
        type: 'pattern',
        message: 'Your PAN card number is invalid',
      },
    ],
  },
  myForm: {
    salary_component_name: [
      {
        type: 'required',
        message: 'Please select salary component name',
      },
    ],
    type: [
      {
        type: 'required',
        message: 'Please select type',
      },
    ],
    value: [
      {
        type: 'required',
        message: 'Please select value',
      },
    ],
  },

  EmpLoanForm: {
    loan_name: [
      {
        type: 'required',
        message: 'Please select loan name',
      },
    ],

    loan_employee_name: [
      {
        type: 'required',
        message: 'Please select employee name',
      },
    ],
    loan_amount: [
      {
        type: 'required',
        message: 'Please enter loan amount',
      },
    ],
    disbursment_date: [
      {
        type: 'required',
        message: 'Please select disbursment date',
      },
    ],

    loan_start_date: [
      {
        type: 'required',
        message: 'Please select loan start date',
      },
    ],
    instalment_amount: [
      {
        type: 'required',
        message: 'Please select instalment amount',
      },
    ],
  },

  loanForm: {
    duration: [
      {
        type: 'required',
        message: 'Only digit is required',
      },
      {
        type: 'pattern',
        message: 'Only digit is required',
      },
    ],
    duration_type: [
      {
        type: 'required',
        message: 'Please select months/years',
      },
    ],
    loan_name: [
      {
        type: 'required',
        message: 'Please enter loan name',
      },
      {
        type: 'pattern',
        message: 'Only letter are accepted',
      },
    ],
    rate_of_interest: [
      {
        type: 'required',
        message: 'Please enter rate of interest',
      },
    ],
    max_loan_amount: [
      {
        type: 'required',
        message: 'Only digit is required',
      },
      {
        type: 'pattern',
        message: 'Only digit is required',
      },
    ],
  },

  // leave track

  leaveTrackForm: {
    leave_type: [
      {
        type: 'required',
        message: 'Please select type of leave',
      },
    ],

    from_date: [
      {
        type: 'required',
        message: 'Please select from date',
      },
    ],
    to_date: [
      {
        type: 'required',
        message: 'Please select to date',
      },
    ],
    reason_leave: [
      {
        type: 'required',
        message: 'Please enter vaild reason for leave',
      },
    ],
  },

  leaveTypeForm: {
    leave_name: [
      {
        type: 'required',
        message: 'Enter Leave name',
      },
      {
        type: 'maxlength',
        message: 'Maximum 150 length is required',
      },
      {
        type: 'pattern',
        message: 'Only text is required',
      },
    ],
    no_of_days: [
      {
        type: 'required',
        message: 'Enter no. of days',
      },
    ],
  },
};
