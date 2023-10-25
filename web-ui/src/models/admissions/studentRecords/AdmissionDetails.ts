import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import { convertForSubmit } from '@/utils/cast';

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
  studentId: { type: 'string', db: 'student_id' },
  className: { type: 'string', db: 'class_name' },
  generalRegisterNumber: { type: 'string', db: 'general_register_number' },
  prn: { type: 'string', db: 'prn' },
  registrationYear: { type: 'integer', db: 'registration_year' },
  dateOfRegistration: { type: 'date', db: 'date_of_registration' },
  admissionCategory: { type: 'string', db: 'admission_category' },
  admissionProcess: { type: 'string', db: 'admission_process' },
 // admissionProcessBy: { type: 'string', db: 'admission_process_by' },
  leavingReligion: { type: 'string', db: 'leaving_religion' },
  leavingCast: { type: 'string', db: 'leaving_cast' },
  leavingSubcast: { type: 'string', db: 'leaving_subcast' },
  lastInstitute: { type: 'string', db: 'last_institute' },


};

export const schemaRules = yup.object().shape({
  generalRegisterNumber: yup.string(),
  prn: yup.string(),
  dateOfRegistration: yup.string(),
  admissionCategory: yup.string(),
  admissionProcess: yup.string(),
  admissionProcessBy: yup.string(),
  leavingReligion: yup.string(),
  leavingCast: yup.string(),
  leavingSubcast: yup.string(),
  lastInstitute: yup.string(),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'generalRegisterNumber', title: 'General Register No.' },
    { dataIndex: 'degreeCode', title: 'PRN No' },
    { dataIndex: 'className', title: 'Registered In' },
    { dataIndex: 'registrationYear', title: 'Registration Year    ' },
    { dataIndex: 'dateOfRegistration', title: 'Date of Registration:' },
    { dataIndex: 'admissionCategory', title: 'Admission Category' },
    { dataIndex: 'admissionProcess', title: 'Admission Process ' },
    { dataIndex: 'admissionProcessBy', title: 'Admission Process By' },
    { dataIndex: 'leavingReligion', title: 'Religion as per the LC/TC:' },
    { dataIndex: 'leavingCast', title: 'Caste as per the LC/TC' },
    { dataIndex: 'leavingSubcast', title: 'Sub-Caste as per the LC/TC' },
    { dataIndex: 'lastInstitute', title: 'Institute Last Attended' },


  ];
  return cols;
};

export const submitJSON = (values: any, modelOnly = true) => {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ admissionDetails: { ...data } });
};
