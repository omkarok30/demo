import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import moment from 'moment';
import * as yup from 'yup';

export const optionsFyDeptType = [
  { value: 'typea', label: 'Type A' },
  { value: 'typeb', label: 'Type B' },
];

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
  yearAt: { type: 'integer', db: 'year_at' },
  year: { type: 'string', db: 'year' },
  isActive: { type: 'bool', db: 'is_active' },
  isActivated: { type: 'bool', db: 'is_activated' },
  commencementYear: { type: 'string', db: 'commencement_year' },
  ugFromDate: { type: 'date', db: 'ug_from_date' },
  ugToDate: { type: 'date', db: 'ug_to_date' },
  pgFromDate: { type: 'date', db: 'pg_from_date' },
  pgToDate: { type: 'date', db: 'pg_to_date' },
  phdFromDate: { type: 'date', db: 'phd_from_date' },
  phdToDate: { type: 'date', db: 'phd_to_date' },
  diplomaFromDate: { type: 'date', db: 'diploma_from_date' },
  diplomaToDate: { type: 'date', db: 'diploma_to_date' },
  assessmentType: { type: 'string', db: 'assessment_type' },
  fyDeptType: { type: 'string', db: 'fy_dept_type' },
};

export const columns = (settings: any) => {
  const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    // { dataIndex: 'id', title: 'Id' },
    // { dataIndex: 'yearAt', title: '' },
    { dataIndex: 'year', title: 'Academic Year' },
    // { dataIndex: 'isActive', title: 'Active', align: 'center', render: (_, record) => renderCheckBox(record, 'isActive') },
    // { dataIndex: 'isActivated', title: 'Activated', align: 'center', render: (_, record) => renderCheckBox(record, 'isActive') },
    // { dataIndex: 'commencementYear', title: 'Commencement Year' },
  ];
  if (_.includes(levelOfEducation, 'UG')) {
    cols.push({
      title: 'UG',
      children: [
        { dataIndex: 'ugFromDate', title: 'From' },
        { dataIndex: 'ugToDate', title: 'To' },
      ],
    });
  }
  if (_.includes(levelOfEducation, 'PG')) {
    cols.push({
      title: 'PG',
      children: [
        { dataIndex: 'pgFromDate', title: 'From' },
        { dataIndex: 'pgToDate', title: 'To' },
      ],
    });
  }
  if (_.includes(levelOfEducation, 'PHD')) {
    cols.push({
      title: 'PHD',
      children: [
        { dataIndex: 'phdFromDate', title: 'From' },
        { dataIndex: 'phdToDate', title: 'To' },
      ],
    });
  }
  if (_.includes(levelOfEducation, 'Diploma')) {
    cols.push({
      title: 'Diploma',
      children: [
        { dataIndex: 'diplomaFromDate', title: 'From' },
        { dataIndex: 'diplomaToDate', title: 'To' },
      ],
    });
  }
  return cols;
};

export const academicTypesColumns = () => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'year', title: 'Academic Year' },
  ];
  return cols;
};

export const schemaRules = yup.object().shape({
  yearAt: yup.string(),
  year: yup.string(),
  isActive: yup.string(),
  isActivated: yup.string(),
  commencementYear: yup.string(),
  ugFromDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'UG')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),

  ugToDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'UG')) {
        return schema.required('required');
      }
      if (!moment(formValues.ugToDate).isAfter(formValues.ugFromDate)) {
        return schema.test('failed', 'should be greater than from date', (value, { createError }) => {
          // return createError({ message:'some error' });
          return false;
        });
      }
      return schema.notRequired();
    }),

  pgFromDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'PG')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),

  pgToDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'PG')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),

  phdFromDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'PHD')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),
  phdToDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'PHD')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),
  diplomaFromDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'Diploma')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),
  diplomaToDate: yup.mixed()
    .when(['$formValues', '$settings'], (formValues, settings, schema) => {
      if (_.includes(settings.get('level_of_education'), 'Diploma')) {
        return schema.required('required');
      }
      return schema.notRequired();
    }),
  assessmentType: yup.string(),
  fyDeptType: yup.string(),
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

export const disabledDate = (year: number) => (current: moment.MomentInput) => {
  const date = new Date(year, 0);
  const start = moment(date).startOf('year');
  const end = moment(date).add(1, 'y').endOf('year');
  return !(start.isSameOrBefore(current) && end.isAfter(current));
};
