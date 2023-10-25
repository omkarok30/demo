import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';
import moment from 'moment';
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
  programDetails: { type: 'string', db: 'program_details' },
  startDate: { type: 'date', db: 'start_date' },
  endDate: { type: 'date', db: 'end_date' },
  duration: { type: 'string', db: 'duration' },
  location: { type: 'string', db: 'location' },
  otherOrganisingBody: { type: 'string', db: 'other_organising_body' },
  certificateDocument: { type: 'string', db: 'certificate_document' },
  organisingBody: { type: 'string', db: 'organising_body' },
  organisingInstitute: { type: 'string', db: 'organising_institute' },
  otherOrganisingInstitute: { type: 'string', db: 'other_organising_institute' },
  relevantPo: { type: 'string', db: 'relevant_po' },
  program: { type: 'string', db: 'program' },
  financialSupport: { type: 'string', db: 'financial_support' },
  amount: { type: 'string', db: 'amount' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  designation: yup.string().required('required'),
  academicYear: yup.string().required('required'),
  programDetails: yup.string().required('required'),

  startDate: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      return schema.required();
    }),

  endDate: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (moment(formValues.startDate).isAfter(formValues.endDate)) {
        return schema.test(
          'failed',
          'should be greater than start date',
          // eslint-disable-next-line no-empty-pattern
          (_value: any, { }: any) => {
            return false;
          },
        );
      }
    }),

  duration: yup.string().required('required'),
  location: yup.string().required('required'),
  otherOrganisingBody: yup.string().required('required'),
  certificateDocument: yup.string(),
  organisingBody: yup.string().required('required'),
  organisingInstitute: yup.string().required('required'),
  otherOrganisingInstitute: yup.string().required('required'),
  relevantPo: yup.string().required('required'),
  program: yup.string().required('required'),
  financialSupport: yup.string().required('required'),
  amount: yup.string().required('required'),
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No', responsive: ['md'] },
    { dataIndex: 'programDetails', title: 'Program/Training Details', responsive: ['md'], },
    { dataIndex: 'startDate', title: 'Start Date', responsive: ['md'], },
    { dataIndex: 'endDate', title: 'End Date', responsive: ['md'], },
    { dataIndex: 'duration', title: 'Duration (Days)', responsive: ['md'], },
    { dataIndex: 'location', title: 'Location', responsive: ['md'], },
    { dataIndex: 'organisingBody', title: 'Organising Body', responsive: ['md'], },
    { dataIndex: 'organisingInstitute', title: 'Organising Institute', responsive: ['md'], },
    {
      dataIndex: 'relevantPo', title: 'Relevant PO', render(value, record, index) {
        return value ? value : '-'
      },
    },
    { dataIndex: 'certificateDocument', title: 'Document', responsive: ['md'], },
    { dataIndex: 'financialSupport', title: 'Is financial support provided by college', responsive: ['md'], },
    { dataIndex: 'amount', title: 'Amount (INR)', responsive: ['md'], },

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
