import React from 'react';
import _ from 'lodash';

import {
  CheckSquareOutlined,
} from '@ant-design/icons';
import { isTrue } from '../../utils/cast';

export const renderCheckBox = (record: any | string, dataIndex: string) => {
  if (typeof record === 'string') {
    return isTrue(record) ? <CheckSquareOutlined style={{ fontSize: '22px', color: '#08c' }} /> : null;
  } else {
    return isTrue(_.get(record, [dataIndex])) ? <CheckSquareOutlined style={{ fontSize: '22px', color: '#08c' }} /> : null;
  }
};

const RNHoverCell = React.memo(({ text, record, index }) => {
  return <div className="cursor-pointer">{text}</div>;
});

export const HoverCell = (text, record, index) => {
  return <RNHoverCell text={text} record={record} index={index} />;
};
