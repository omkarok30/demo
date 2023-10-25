import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import moment from 'moment';
import { isEmptyValue } from '@/utils/object';

export const tableName = 'studentInfo';

// id|version|created_at|created_by|updated_at|updated_by|deleted_at|deleted_by|props|type|degree_name|degree_code|start_year|end_year|is_disabled|level_of_education|faculty_of_study|
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
  studId: { type: 'string', db: 'stud_id' },
  firstName: { type: 'string', db: 'first_name' },
  middleName: { type: 'string', db: 'middle_name' },
  lastName: { type: 'string', db: 'last_name' },
  scholarNumber: { type: 'string', db: 'scholar_number' },
  enrolmentNumber: { type: 'string', db: 'enrolment_number' },
  registrationYear: { type: 'integer', db: 'registration_year' },
  programId: { type: 'string', db: 'program_id' },
  gender: { type: 'string', db: 'gender' },
  email: { type: 'string', db: 'email' },
  className: { type: 'string', db: 'class_name' },
  dateOfAdmission: { type: 'date', db: 'date_of_admission' },
  dateOfBirth: { type: 'date', db: 'date_of_birth' },
  fatherName: { type: 'string', db: 'father_name' },
  motherName: { type: 'string', db: 'mother_name' },
  guardianName: { type: 'string', db: 'guardian_name' },
  responsiblePerson: { type: 'string', db: 'responsible_person' },
  bloodGroup: { type: 'string', db: 'blood_group' },
  maritalStatus: { type: 'string', db: 'marital_status' },
  motherTongue: { type: 'string', db: 'mother_tongue' },
  birthPlace: { type: 'string', db: 'birth_place' },
  isStudentNri: { type: 'string', db: 'is_student_nri' },
  grandfatherName: { type: 'string', db: 'grandfather_name' },
  parentEmail: { type: 'string', db: 'parent_email' },
  religion: { type: 'string', db: 'religion' },
  cast: { type: 'string', db: 'cast' },
  subcast: { type: 'string', db: 'subcast' },
  aadhar: { type: 'string', db: 'aadhar' },
  isHandicap: { type: 'string', db: 'is_handicap' },
  guardianDob: { type: 'date', db: 'guardian_dob' },
  relationToStudent: { type: 'string', db: 'relation_to_student' },
  generalExcludingMinority: {
    type: 'string',
    db: 'general_excluding_minority',
  },
  minority: { type: 'string', db: 'minority' },
  pioGender: { type: 'string', db: 'pio_gender' },
  mobileNo: { type: 'string', db: 'mobile_no' },
  parentMobileNo: { type: 'string', db: 'parent_mobile_no' },
  direct: { type: 'string', db: 'direct' },
  subcasteCategory: { type: 'string', db: 'subcaste_category' },
  cancelStatus: { type: 'string', db: 'cancel_status' },
  cancelYear: { type: 'string', db: 'cancel_year' },
  generalRegesterNumber: { type: 'string', db: 'general_regester_number' },
  collegeTransfer: { type: 'string', db: 'college_transfer' },
  leavingNationality: { type: 'string', db: 'leaving_nationality' },
  isMailSent: { type: 'string', db: 'is_mail_sent' },
  freezeBasicDetails: { type: 'string', db: 'freeze_basic_details' },
  freezePersonalInfo: { type: 'string', db: 'freeze_personal_info' },
  freezeStudentCode: { type: 'string', db: 'freeze_student_code' },
  freeze: { type: 'string', db: 'freeze' },
  changedName: { type: 'string', db: 'changed_name' },
  dateOfNameChange: { type: 'date', db: 'date_of_name_change' },
  degreeName: { type: 'string', db: 'degree_name' },
};

export const searchColumns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'scholarNumber', title: 'Student Code' },
    { dataIndex: 'enrolmentNumber', title: 'PRN.No' },
    { dataIndex: 'registrationYear', title: 'Admission Year' },
    { dataIndex: 'programId', title: 'Program' },
  ];
  return cols;
};
export const schemaRules = yup.object().shape({
  programId: yup.string().required('required'),
  firstName: yup
    .string()
    .required('required')
    .matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.'),
  middleName: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.middleName)) {
        return schema.matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.');
      }
      return schema.notRequired();
    }),
  lastName: yup
    .string()
    .required('required')
    .matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.'),
  gender: yup.string().required('required'),
  email: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.email)) {
        return schema.matches(
          /\S+@\S+\.\S+/,
          'Please enter valid email address',
        );
      }
      return schema.notRequired();
    }),
  mobileNo: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.mobileNo)) {
        return schema
          .matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.')
          .max(10, 'Please enter valid mobile number')
          .min(10, 'Please enter valid mobile number ');
      }
      return schema.notRequired();
    }),
  parentEmail: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.parentEmail)) {
        return schema.matches(
          /\S+@\S+\.\S+/,
          'Please enter valid email address',
        );
      }
      return schema.notRequired();
    }),
  parentMobileNo: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.parentMobileNo)) {
        return schema
          .matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.')
          .max(10, 'Please enter valid mobile number')
          .min(10, 'Please enter valid mobile number ');
      }
      return schema.notRequired();
    }),
  className: yup.string().required('required'),
  registrationYear: yup.string(),
  dateOfAdmission: yup.string().required('required'),
  dateOfBirth: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (moment()) {
        return schema.test(
          'Should be less Current Date',
          // eslint-disable-next-line no-empty-pattern
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
    }),
  birthPlace: yup.string(),
  fatherName: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.fatherName)) {
        return schema.matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.');
      }
      return schema.notRequired();
    }),
  motherName: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.motherName)) {
        return schema.matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.');
      }
      return schema.notRequired();
    }),
  grandfatherName: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.grandfatherName)) {
        return schema.matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.');
      }
      return schema.notRequired();
    }),
  maritalStatus: yup.string(),
  bloodGroup: yup.string(),
  leavingNationality: yup.string(),
  religion: yup.string(),
  cast: yup.string(),
  subcast: yup.string(),
  aadhar: yup.string(),
  isStudentNri: yup.string(),
  guardianName: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.motherName)) {
        return schema.matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.');
      }
      return schema.notRequired();
    }),
  guardianDob: yup.string(),
  relationToStudent: yup.string(),
  responsiblePerson: yup
    .string()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (!isEmptyValue(formValues.motherName)) {
        return schema.matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.');
      }
      return schema.notRequired();
    }),
  isHandicap: yup.string(),
  generalExcludingMinority: yup.string(),
  pioGender: yup.string(),
  motherTongue: yup.string(),
  changedName: yup.string(),
  dateOfNameChange: yup.string(),
});
export const submitJSON = (values: any, modelOnly = true) => {
  const data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  return JSON.stringify(data);
};
