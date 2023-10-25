import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

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
  empId: { type: 'string', db: 'emp_id' },
  application_no: { type: 'string', db: 'application_no' },
  dateOfFilling:{ type: 'date', db: 'date_of_filling' },
  applicantName: { type: 'string', db: 'applicant_name' },
  inventionTitle: { type: 'string', db: 'invention_title' },
  applicationStatus:{ type: 'string', db: 'application_status' },
  grantDate: { type: 'date', db: 'grant_date' },
  considerForAccreditation: { type: 'string', db: 'consider_for_accreditation' },

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  application_no:yup.string().required('required'),
  dateOfFilling:yup.string().required('required'),
  applicantName: yup.string().required('required'),
  inventionTitle:yup.string().required('required'),
  applicationStatus:yup.string().required('required'),
  grantDate: yup.string(),
  considerForAccreditation:yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No',responsive: ['md']},
    { dataIndex: 'application_no', title: 'Application No',responsive: ['md'],},
    { dataIndex: 'dateOfFilling', title: 'Date of Filling',responsive: ['md'], },
    { dataIndex: 'applicantName', title: 'Applicant Name',responsive: ['md'],},
    { dataIndex: 'inventionTitle', title: 'Title of Invention',responsive: ['md'],},
    { dataIndex: 'applicationStatus', title: 'Application Status',responsive: ['md'],},
    { dataIndex: 'grantDate', title: 'Date of Grant',responsive: ['md'],},
    { dataIndex: 'considerForAccreditation', title: 'Consider for Accreditation?',responsive: ['md'],},
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
