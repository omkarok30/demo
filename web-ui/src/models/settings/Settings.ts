import { ColumnsType } from 'antd/lib/table';
import * as yup from 'yup';

export const columns = (): ColumnsType<any> => {
  return [
    // { dataIndex: 'id', title: 'Id'},
    { dataIndex: 'name', title: 'Name', sorter: (a, b) => a.name.localeCompare(b.name), defaultSortOrder: 'ascend' },
    { dataIndex: 'value', title: 'Value' },
    { dataIndex: 'key', title: 'Key' },
  ];
};

export const schema = yup.object().shape({
  key: yup.string().required(),
  value: yup.string(),
  name: yup.string(),
});
