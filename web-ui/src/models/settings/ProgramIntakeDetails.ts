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
  programmeId: { type: 'string', db: 'programme_id' },
  intake: { type: 'integer', db: 'intake' },
  batchFromYear: { type: 'integer', db: 'batch_from_year' },
  batchToYear: { type: 'integer', db: 'batch_to_year' },
  lateralIntake: { type: 'integer', db: 'lateral_intake' },
  additionalDivision: { type: 'bool', db: 'additional_division' },
  additionalIntake: { type: 'integer', db: 'additional_intake' },
};
export const schemaRules = yup.object().shape({
  intake: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
  batchFromYear: yup.string().required('required'),
  batchToYear: yup.string().required('required'),
  lateralIntake: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
  additionalDivision: yup.string().required('required'),
  additionalIntake: yup.string().required('required').matches(/^[0-9]+$/, 'please enter numbers only.'),
});

export const columns = (settings: any) => {
  // const levelOfEducation = settings.get('level_of_education') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'intake', title: 'Registration Year Batch Intake' },
    { dataIndex: 'lateralIntake', title: 'Lateral Entry Intake' },
    { dataIndex: 'additionalIntake', title: 'Additional Division Intake' },
    { dataIndex: 'batchFromYear', title: 'Batch Starting Year From' },
    { dataIndex: 'batchToYear', title: 'Batch Starting Year To' },
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
  return JSON.stringify({ programIntake: { ...data } });
};
