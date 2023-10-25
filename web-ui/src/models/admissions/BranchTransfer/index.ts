import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import moment from 'moment';
import * as yup from 'yup';
import * as student_info from '@/models/admissions/studentRecords/StudentInfo';

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
  studentId: { type: 'integer', db: 'student_id' },
  document: { type: 'integer', db: 'document' },
  previousStudentCode: { type: 'string', db: 'previous_student_code' },
  programId: { type: 'string', db: 'program_id' },
  previousProgramId: { type: 'string', db: 'previous_program_id' },
  transferDate: { type: 'date', db: 'transfer_date' },
  status: { type: 'integer', db: 'status' },
  studentName: { type: 'string', db: 'student_name' },


  [`${student_info.tableName}$firstName`]: student_info.allColumns.firstName,
  [`${student_info.tableName}$middleName`]: student_info.allColumns.middleName,
  [`${student_info.tableName}$lastName`]: student_info.allColumns.lastName,
  [`${student_info.tableName}$scholarNumber`]: student_info.allColumns.scholarNumber,
  [`${student_info.tableName}$registrationYear`]: student_info.allColumns.registrationYear,


};

export const schemaRules = yup.object().shape({
  studentId: yup.string().required('required'),
  studentName: yup.string().required('required'),
  studentCode: yup.string().required('required'),
  oldStudentCode: yup.string().required('required'),
  programName: yup.string().required('required'),
  oldProgramName: yup.string().required('required'),
  transferDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (formValues.transferDate.isAfter(moment())) {
        return schema.test(
          'failed',
          'should be less than todays date',
          // eslint-disable-next-line no-empty-pattern
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
      else {
        schema.required('required');
      }
    }),
  status: yup.string().required('required'),
});

export const columns = () => {
  const cols: ColumnsType<any> = [
    //{ dataIndex: 'studentId', title: 'Student Id' },
   // { dataIndex: 'studentName', title: 'Student Name' },
    { dataIndex: 'previousStudentCode', title: 'Old Student Code' },
    { dataIndex: 'previousProgramId', title: 'Old Program' },

    { dataIndex: 'student_info$scholarNumber', title: 'New Student Code' },

    { dataIndex: 'programId', title: 'New Program ' },
    { dataIndex: 'transferDate', title: 'Date of Branch Transfer' },
   // { dataIndex: 'document', title: 'Approved Application	' },
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
  return JSON.stringify(data);
};
