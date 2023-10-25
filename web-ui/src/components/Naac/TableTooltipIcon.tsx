import { Tooltip } from 'antd';
import React from 'react';

interface IToolTip {
  columnTitle: string;
  textContent: string;
  children: React.ReactNode;
}

const TableTooltipIcon = (props: IToolTip) => {
  const { columnTitle, textContent, children } = props;
  return (
    <>{columnTitle} <Tooltip placement="top" title={textContent}>
      {children}
    </Tooltip >
    </>
  );
};

export default TableTooltipIcon;
