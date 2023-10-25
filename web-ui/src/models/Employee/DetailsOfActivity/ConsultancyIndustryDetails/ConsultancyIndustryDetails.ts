import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import * as consultacnyDetailsEmployee from '@/models/Employee/DetailsOfActivity/ConsultancyIndustryDetails/ConsultancyDetailsEmployee';

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
  academicYear: { type: 'string', db: 'academic_year' },
  projectTitle: { type: 'string', db: 'project_title' },
  fundingAgency: { type: 'string', db: 'funding_agency' },
  amount: { type: 'string', db: 'amount' },
  duration: { type: 'string', db: 'duration' },
  considerForAccreditation: { type: 'string', db: 'consider_for_accreditation' },
  complitionOfAssignment: { type: 'string', db: 'complition_of_assignment' },
  dateOfCompletion: { type: 'date', db: 'date_of_completion' },
  consultancyDocument: { type: 'string', db: 'consultancy_document' },
  consulatancyMainId: { type: 'string', db: 'consulatancy_main_id' },

  // foreign key data at the end
  [`${consultacnyDetailsEmployee.tableName}$empIds`]: consultacnyDetailsEmployee.allColumns.empIds,


};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empId: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  projectTitle: yup.string().required('required'),
  fundingAgency: yup.string().required('required'),
  amount: yup.string().required('required'),
  duration: yup.string().required('required'),
  considerForAccreditation: yup.string().required('required'),
  complitionOfAssignment: yup.string().required('required'),
  dateOfCompletion: yup.string().required('required'),
  consultancyDocument: yup.string().notRequired(),
  consulatancyMainId: yup.string().required('required'),
  consultacnyDetailsEmployee$empIds: yup.mixed().notRequired(),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No' },
    { dataIndex: 'academicYear', title: 'Academic Year' },
    { dataIndex: 'projectTitle', title: 'Project Title' },
    { dataIndex: 'fundingAgency', title: 'Funding Agency/Type of Agency' },

    { dataIndex: 'amount', title: 'Amount (INR)' },
    { dataIndex: 'duration', title: 'Duration (Months)' },
    { dataIndex: 'complitionOfAssignment', title: 'Completion of Consultancy Assignment?' },
    {
      dataIndex: 'dateOfCompletion',
      title: 'Date of Completion',
      render(value, record, index) {
        return record.dateOfCompletion === '' ? '-' : record.dateOfCompletion;
      },
    },
    { dataIndex: 'considerForAccreditation', title: 'Consider for Accreditation?' },

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
  return JSON.stringify({ employeeConsultancyIndustryDetails: { ...data } });
};
