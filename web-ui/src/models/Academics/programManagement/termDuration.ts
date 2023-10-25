import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import * as yup from 'yup';

import moment from 'moment';
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

  year: { type: 'integer', db: 'year' },
  programId: { type: 'string', db: 'program_id' },
  className: { type: 'string', db: 'class_name' },
  term: { type: 'string', db: 'term' },
  semester: { type: 'json', db: 'semester' },
};

export const schemaRules = yup.object().shape({
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
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
    }),
  startDate1: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      return schema.required();
    }),

  endDate1: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (moment(formValues.startDate).isAfter(formValues.endDate)) {
        return schema.test(
          'failed',
          'should be greater than start date',
          // eslint-disable-next-line no-empty-pattern
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
    }),
  startDate2: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      return schema.required();
    }),

  endDate2: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (moment(formValues.startDate).isAfter(formValues.endDate)) {
        return schema.test(
          'failed',
          'should be greater than start date',
          // eslint-disable-next-line no-empty-pattern
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
    }),
  startDate3: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      return schema.required();
    }),

  endDate3: yup
    .mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (moment(formValues.startDate).isAfter(formValues.endDate)) {
        return schema.test(
          'failed',
          'should be greater than start date',
          // eslint-disable-next-line no-empty-pattern
          (_value: any, {}: any) => {
            return false;
          },
        );
      }
    }),
});

export const AnnualPatterncolumns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'className', title: 'Class' },
    { dataIndex: 'startDate', title: 'Start Date' },
    { dataIndex: 'endDate', title: 'End Date' },
  ];
  return cols;
};
export const SemesterPatterncolumns = () => {
  const cols: ColumnsType<any> = [{ dataIndex: 'className', title: 'Class' }];
  cols.push({
    title: 'Sem 1',
    children: [
      { dataIndex: 'startDate1', title: 'Start Date' },
      { dataIndex: 'endDate1', title: 'End Date' },
    ],
  });
  cols.push({
    title: 'Sem 2',
    children: [
      { dataIndex: 'startDate2', title: 'Start Date' },
      { dataIndex: 'endDate2', title: 'End Date' },
    ],
  });
  return cols;
};
export const TrimesterPatterncolumns = () => {
  const cols: ColumnsType<any> = [{ dataIndex: 'className', title: 'Class' }];

  cols.push({
    title: 'Term 1',
    children: [
      { dataIndex: 'startDate1', title: 'Start Date' },
      { dataIndex: 'endDate1', title: 'End Date' },
    ],
  });
  cols.push({
    title: 'Term 2',
    children: [
      { dataIndex: 'startDate2', title: 'Start Date' },
      { dataIndex: 'endDate2', title: 'End Date' },
    ],
  });
  cols.push({
    title: 'Term 3',
    children: [
      { dataIndex: 'startDate3', title: 'Start Date' },
      { dataIndex: 'endDate3', title: 'End Date' },
    ],
  });
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
  return JSON.stringify({ termDuration: { ...data } });
};
