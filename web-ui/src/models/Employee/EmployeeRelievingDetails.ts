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
  resignationDate: { type: 'date', db: 'resignation_date' },
  leavingReason: { type: 'string', db: 'leaving_reason' },
  releavingDate: { type: 'date', db: 'releaving_date' },
  appointmentDate: { type: 'string', db: 'appointment_date' },
  joiningDate: { type: 'string', db: 'joining_date' },
  isFreezed: { type: 'boolean', db: 'is_freezed' },
  employmentStatus: { type: 'string', db: 'employment_status' },
  resignationLetterDocument: { type: 'string', db: 'resignation_letter_document' },
  relivingLetterDocument: { type: 'string', db: 'reliving_letter_document' },
  experienceLetterDocument: { type: 'string', db: 'experience_letter_document' },
  transferOrderDate: { type: 'date', db: 'transfer_order_date' },
  transferDescription: { type: 'string', db: 'transfer_description' },
  transferDocument: { type: 'string', db: 'transfer_document' },
  terminationDate: { type: 'date', db: 'termination_date' },
  terminationReason: { type: 'string', db: 'termination_reason' },
  terminationLetterDocument: { type: 'string', db: 'termination_letter_document' },
  retirementDate: { type: 'date', db: 'retirement_date' },
  retirementDocument: { type: 'string', db: 'retirement_document' },
};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empId: yup.string(),
  resignationDate: yup.string().required('required'),
  leavingReason: yup.string().required('required'),
  releavingDate: yup.string().required('required'),
  appointmentDate: yup.string().required('required'),
  joiningDate: yup.string().required('required'),
  isFreezed: yup.string().required('required'),
  employmentStatus: yup.string().required('required'),
  resignationLetterDocument: yup.string().required('required'),
  relivingLetterDocument: yup.string().required('required'),
  experienceLetterDocument: yup.string().required('required'),
  transferOrderDate: yup.string().required('required'),
  transferDescription: yup.string().required('required'),
  transferDocument: yup.string().required('required'),
  terminationDate: yup.string().required('required'),
  terminationReason: yup.string().required('required'),
  terminationLetterDocument: yup.string().required('required'),
  retirementDate: yup.string().required('required'),
  retirementDocument: yup.string().required('required'),

});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'resignationDate', title: 'Resignation Date', responsive: ['md'] },
    { dataIndex: 'releavingDate', title: 'Relieving Date', responsive: ['md'], },
    { dataIndex: 'leavingReason', title: 'Reason for Leaving', responsive: ['md'], },
    { dataIndex: 'resignationLetterDocument', title: 'Resignation Letter/Copy', responsive: ['md'], },
    { dataIndex: 'relivingLetterDocument', title: 'Relieving Letter', responsive: ['md'], },
    { dataIndex: 'experienceLetterDocument', title: 'Experience Letter', responsive: ['md'], },

  ];
  return cols;
};

export const columns1 = (settings: any) => {
  const cols: ColumnsType<any> = [
    {dataIndex: 'employmentStatus', title: 'Employment Status',responsive: ['md'],},
    { dataIndex: 'leavingReason', title: 'Reason for Deactivation',responsive: ['md'], },
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
  return JSON.stringify({ employeeRelievingDetails: { ...data } });
};
