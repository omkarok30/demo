import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import moment from 'moment';
import { isEmptyValue } from '@/utils/object';

// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
export const tableName = 'employee_info';
export const allColumns = {
  id: { type: 'string', db: 'id' },
  version: { type: 'integer', db: 'version' },
  createdAt: { type: 'date', db: 'created_at' },
  createdBy: { type: 'string', db: 'created_by' },
  updatedAt: { type: 'date', db: 'updated_at' },
  updatedBy: { type: 'string', db: 'updated_by' },
  deletedAt: { type: 'date', db: 'deleted_at' },
  deletedBy: { type: 'string', db: 'deleted_by' },
  props: { type: 'json', db: 'props' },
  empCode: { type: 'string', db: 'emp_code' },
  salutation: { type: 'string', db: 'salutation' },
  firstName: { type: 'string', db: 'first_name' },
  middleName: { type: 'string', db: 'middle_name' },
  lastName: { type: 'string', db: 'last_name' },
  designation: { type: 'string', db: 'designation' },
  departmentId: { type: 'string', db: 'department_id' },
  joiningDate: { type: 'date', db: 'joining_date' },
  confirmationDate: { type: 'date', db: 'confirmation_date' },
  resignationDate: { type: 'date', db: 'resignation_date' },
  location: { type: 'string', db: 'location' },
  gender: { type: 'string', db: 'gender' },
  dateOfBirth: { type: 'date', db: 'date_of_birth' },
  placeOfBirth: { type: 'string', db: 'place_of_birth' },
  anniversaryDate: { type: 'date', db: 'anniversary_date' },
  panNumber: { type: 'string', db: 'pan_number' },
  passportNumber: { type: 'string', db: 'passport_number' },
  aadhar: { type: 'string', db: 'aadhar' },
  nationality: { type: 'string', db: 'nationality' },
  religion: { type: 'string', db: 'religion' },
  height: { type: 'string', db: 'height' },
  fatherName: { type: 'string', db: 'father_name' },
  motherName: { type: 'string', db: 'mother_name' },
  husbandName: { type: 'string', db: 'husband_name' },
  maritalStatus: { type: 'string', db: 'marital_status' },
  spouseName: { type: 'string', db: 'spouse_name' },
  noOfDependents: { type: 'integer', db: 'no_of_dependents' },
  bloodGroup: { type: 'string', db: 'blood_group' },
  email: { type: 'string', db: 'email' },
  personalEmail: { type: 'string', db: 'personal_email' },
  emergencyContactName: { type: 'string', db: 'emergancy_contact_name' },
  emergencyContactNumber: { type: 'string', db: 'emergancy_contact_number' },
  employeeType: { type: 'string', db: 'employee_type' },
  employeeStatus: { type: 'string', db: 'employee_status' },
  recruitmentAgency: { type: 'string', db: 'recruitment_agency' },
  leavingReason: { type: 'string', db: 'leaving_reason' },
  remarks: { type: 'string', db: 'remarks' },
  relivingDate: { type: 'date', db: 'reliving_date' },
  nominee: { type: 'string', db: 'nominee' },
  nomineeEmail: { type: 'string', db: 'nominee_email' },
  nomineeMobile: { type: 'string', db: 'nominee_mobile' },
  category: { type: 'string', db: 'category' },
  cast: { type: 'string', db: 'cast' },
  subCast: { type: 'string', db: 'subcast' },
  handicap: { type: 'string', db: 'handicap' },
  motherTongue: { type: 'string', db: 'mother_tongue' },
  lastDateEmployment: { type: 'date', db: 'last_date_employment' },
  reasonInactivation: { type: 'string', db: 'reason_inactivation' },
  mobile: { type: 'string', db: 'mobile' },
  joiningYear: { type: 'string', db: 'joining_year' },
  appointmentDate: { type: 'date', db: 'appointment_date' },
  appointmentType: { type: 'string', db: 'appointment_type' },
  appointmentSubtype: { type: 'string', db: 'appsub_type' },
  altMobile: { type: 'string', db: 'alt_mobile_no' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  salutation: yup.string(),
  firstName: yup.string().required('required').matches(/^[A-Za-z ]*$/, 'Please Enter Valid First Name.'),
  middleName: yup.string().notRequired().matches(/^[A-Za-z ]*$/, 'Please Enter Valid Middle Name.'),
  lastName: yup.string().required('required').matches(/^[A-Za-z ]*$/, 'Please Enter Valid Last Name.'),
  designation: yup.string().required(),
  departmentId: yup.string().required('required'),
  confirmationDate: yup.string().required('required'),
  resignationDate: yup.string().required('required'),
  location: yup.string().required('required'),
  gender: yup.string().required('required'),
  dateOfBirth: yup.string().required('required'),
  placeOfBirth: yup.string().required('required'),
  anniversaryDate: yup.string().required('required'), 
  panNumber: yup.string().required('required'),
  passportNumber: yup.string().required('required'),
  aadhar: yup.string().required('required'),
  nationality: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.nationality)) {
      return schema.matches(/^[A-Za-z ]*$/, 'Please Enter Nationality.');
    }
    return schema.notRequired();
  }),
  religion: yup.string().required('required'),
  height: yup.string().required('required'),
  fatherName: yup.string().required('required').matches(/^[A-Za-z ]*$/, 'Please Enter Valid Father Name.'),
  motherName: yup.string().required('required').matches(/^[A-Za-z ]*$/, 'Please Enter Valid Mother Name.'),
  husbandName: yup.string().required('required').matches(/^[A-Za-z ]*$/, 'Please Enter Valid Husband Name.'),
  maritalStatus: yup.string().required('required'),
  spouseName: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.spouseName)) {
      return schema.matches(/^[A-Za-z ]*$/, 'Please Enter Valid Spouse Name.');
    }
    return schema.notRequired();
  }),
  noOfDependents: yup.string().required('required'),
  bloodGroup: yup.string().required('required'),
  email: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.email)) {
      return schema.matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please Enter Valid Email Id.');
    }
    return schema.notRequired();
  }),
  personalEmail: yup.string().required('required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please Enter Valid Email Id.'),
  emergencyContactName: yup.string().required('required'),
  emergencyContactNumber: yup.string().required('required'),
  employeeType: yup.string().required('required'),
  employeeStatus: yup.string().required('required'),
  recruitmentAgency: yup.string().required('required'),
  leavingReason: yup.string().required('required'),
  remarks: yup.string().required('required'),
  relivingDate: yup.string().required('required'),
  nominee: yup.string().required('required'),
  nomineeEmail: yup.string().required('required'),
  nomineeMobile: yup.string().required('required'),
  category: yup.string().required('required'),
  cast: yup.string().required('required'),
  subCast: yup.string().required('required'),
  handicap: yup.string().required('required'),
  motherTongue: yup.string().required('required'),
  lastDateEmployment: yup.string().required('required'),
  reasonInactivation: yup.string().required('required'),
  mobile: yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.').max(10, 'Maximum 10 Characters').min(10),
  joiningYear: yup.string().required('required'),
  appointmentDate: yup.string().required('required'),
  appointmentSubtype: yup.string().required('required'),
  appointmentType: yup.string().required('required'),
  altMobile: yup.string().when(['$formValues', '$settings'], (formValues, settings, schema) => {
    if (!isEmptyValue(formValues.altMobile)) {
      return schema
        .matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.')
        .max(10, 'Please enter valid mobile number').min(10, 'Please enter valid mobile number');
    }
    return schema.notRequired();
  }),
  joiningDate: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (moment(formValues.appointmentDate).isAfter(formValues.joiningDate)) {
        return schema.test(
          'failed',
          'should be greater than appointment date',
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
      else {
        return schema.required('required');
      }
    }),

    pg_registration_year:yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.'),
    pgregdate:yup.string().required('required'),
    phd_registration_year:yup.string().required('required').matches(/^[0-9]+$/, 'Please Enter Numbers Only.'),
    phdregdate:yup.string().required('required'),

});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    {
      dataIndex: 'firstName',
      title: 'Employee Name',
      render(value, record, index) {
        return `${record.firstName} ${record.middleName} ${record.lastName}`;
      },
    },
    { dataIndex: 'empCode', title: 'Employee Code' },
    { dataIndex: 'departmentId', title: 'Department' },
    { dataIndex: 'joiningDate', title: 'Date of Joining' },
  ];
  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify({ employeeDetails: { ...data } });
};
