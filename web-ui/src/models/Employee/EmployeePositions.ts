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
  position:{type: 'string', db: 'position'},
  status	:{type: 'string', db: 'status	'},
  fromDate: { type: 'date', db: 'from_date' },
  toDate: { type: 'date', db: 'to_date' },
  isFreezed: { type: 'bool', db: 'is_freezed' },
  document:{type: 'string', db: 'document'},

};

export const schemaRules = yup.object().shape({
  id: yup.string(),
  empCode: yup.string(),
  position:yup.string().required('required'),
  status:yup.string(),
  fromDate:yup.string().required('required'),
  toDate:yup.string(),
  isFreezed:yup.string(),
  document:yup.string(),
 
});

export const columns = (settings: any) => {
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', title: 'Sr.No'},
    {dataIndex: 'position', title: 'Position'},
    { dataIndex: 'fromDate', title: 'Form' },
    { dataIndex: 'toDate', title: 'To',render(value, record, index) {
      return value ? record.toDate : 'PRESENT'
    }, 
    },
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
