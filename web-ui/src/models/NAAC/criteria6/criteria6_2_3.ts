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

  academicYear: { type: 'int', db: 'academic_year' },
  areasName: { type: 'string', db: 'areas_name' },
  implementationYear: { type: 'string', db: 'implementation_year' },
  venderName: { type: 'string', db: 'vender_name' },
  areasValue: { type: 'string', db: 'areas_value' },
};

export function columns(settings: any) {
  const naac_version = settings.get('naac_version') || [];
  const cols: ColumnsType<any> = [
    { dataIndex: 'id', key: 'id', title: 'Sr. No' },
    { dataIndex: 'areasName', key: 'areasName', title: 'Areas of e-governance' },
    { dataIndex: 'venderName', key: 'venderName', title: 'Name of the Vendor with contact details' },
    { dataIndex: 'implementationYear', key: 'implementationYear', title: 'Year of implementation' },
  ];
  return cols;
}

export const schemaRules = yup.object().shape({
  type: yup.string().required('required'),
  areasName: yup.string().required('required'),
  implementationYear: yup.string().required('Please enter year').matches(/^[0-9\s]+$/, 'Please Enter Numbers Only.').test('Date of Birth', 'Should be greather than 0', (value) => {
    return value > 0;
    // return dajs
  }),
  venderName: yup.string().required('Please enter name').matches(/^[aA-zZ\s]+$/, 'Please Enter alphabets Only.'),
});

export function submitJSON(values: any, modelOnly = true) {
  let data = {};
  _.each(values, (value, key) => {
    if (modelOnly && _.has(allColumns, key)) {
      _.set(data, [key], value);
    }
  });
  data = convertForSubmit(data, allColumns);
  return JSON.stringify({ NAACCriteria623: { ...data } });
}
