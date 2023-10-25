import React from 'react';
import { Button, Card, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDashboardoverall } from '@/store/employee/useemployeedashOverall';
import * as modelEmployeeDashboard from '@/models/Employee/EmployeeDashboard';

const overallList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeOverall = useEmployeeDashboardoverall((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeOverall.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelEmployeeDashboard.overallcolumns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          View staff
        </Button>,
      ],
    });

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Overall Staff">
        <Table
          bordered
          columns={columns}
          dataSource={storeEmployeeOverall.allRecords}
        />
      </Card>
    </div>
  );
};

export default overallList;
