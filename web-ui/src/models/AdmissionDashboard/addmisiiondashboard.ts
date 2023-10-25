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

  program: { type: 'string', db: 'program' },
  caste: { type: 'string', db: 'caste' },

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  program: yup.string(),
  caste: yup.string(),

});

export const overviewcolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'program', title: 'Program' },
  ];
  cols.push({
    title: 'First Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Second Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Third Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Fourth Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Total',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  return cols;
};
export const Admissioncategorywisecolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'caste', title: 'Caste', responsive: ['md'] },
  ];
  cols.push({
    title: 'First Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Second Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Third Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Fourth Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Total',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  return cols;
};

export const FeeCategorywisecolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'caste', title: 'Caste', responsive: ['md'] },
  ];
  cols.push({
    title: 'First Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Second Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Third Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Fourth Year',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  cols.push({
    title: 'Total',
    children: [
      { dataIndex: 'male', title: 'Male' },
      { dataIndex: 'female', title: 'Female' },
      { dataIndex: 'total', title: 'Total' },

    ],
  });
  return cols;
};
export const Newlyadmittedstudentcolumns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'program', title: 'Program', responsive: ['md'] },
    { dataIndex: 'firstyear', title: 'First Year', responsive: ['md'] },
    { dataIndex: 'secondyear', title: 'second Year', responsive: ['md'] },
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
