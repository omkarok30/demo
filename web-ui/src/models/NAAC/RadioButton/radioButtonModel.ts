import _ from 'lodash';
import * as yup from 'yup';
import { ColumnsType } from 'antd/lib/table';
import { convertForSubmit } from '@/utils/cast';

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
  // This record should be fetched from capacity_process_answer
  academicYear: { type: 'string', db: 'academic_year' },
  criteriaNumber: { type: 'string', db: 'criteria_number' },
  options: { type: 'string', db: 'options' },
};

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  year: yup.string().required('required'),
  options: yup.string().required('required'),
});

// coloumn  for innerTable criteri 5.1.3
export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'SrNo', title: 'Sr. No.', width: 100 },
    { dataIndex: 'programName', title: 'Name of the capacity development and skills enhancement program', width: 300 },
    { dataIndex: 'date', title: 'Date of implementation (DD-MM-YYYY)', width: 300 },
    { dataIndex: 'noOfStudents', title: 'Number of students enrolled', width: 300 },
    { dataIndex: 'agencyName', title: 'Name of the agencies/consultants involved with contact details (if any)', width: 300 },
    { dataIndex: 'document', title: 'Document', width: 300 },
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
  return JSON.stringify({ NAACRadioButton: { ...data } });
};
