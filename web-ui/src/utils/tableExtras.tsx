import _ from 'lodash';
import { ColumnGroupType, ColumnType, ColumnsType } from 'antd/lib/table';
import { isEmptyValue } from '@/utils/object';

// interface RenderColumn {
//   key[string]: (value: any, record: object, index: number) => any;
// };

export const columnRowNo = () => ({
  title: '#',
  key: 'row-no',
  width: '20px',
  render: (_text, _record, index) => index + 1,
});

export const attachRenderer = (columns: ColumnsType<any>, renderers: any) => {
  _.each(renderers, (ro, key) => {
    const column: ColumnGroupType<any> | ColumnType<any> | any = _.find(columns, { dataIndex: key });
    if (isEmptyValue(column)) {
      return;
    }
    column.render = ro;
  });
  return columns;
};
