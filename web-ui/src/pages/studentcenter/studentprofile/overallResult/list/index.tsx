import React from 'react';
import { Card, Table } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import * as modal from '@/models/admissions/studentRecords/overallResultDetails';
import { useOverallResult } from '@/store/admissions/useOverallResultDetails';

import { useSettings } from '@/store/settings/useSettings';

const OverallResultList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const store = useOverallResult((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  React.useEffect(() => {
    fetchSettings();
    store.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modal.columns();

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Overall Result">
        <Table
          bordered
          columns={columns}
          dataSource={store.allRecords}
          scroll={{ x: 300 }}
        />
      </Card>
    </div>
  );
};

export default OverallResultList;
