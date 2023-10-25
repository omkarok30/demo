import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tabs } from 'antd';

import Active from '@/pages/Employee/EmployeeDashboard/list/index';
import Academicyearwise from '@/pages/Employee/EmployeeDashboard/Academicyearwise/list';

import { useEmployeeDashboard } from '@/store/employee/useemployeeDashboard';
import { useSettings } from '@/store/settings/useSettings';

const tabPages = [
  { label: 'Active', key: 'active', children: <Active /> },
  {
    label: 'AacdemicYear-wise',
    key: 'academicyear-wise',
    children: <Academicyearwise />,
  },
];

const EmployeeDashboardTabs = () => {
  const { id } = useParams();
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeEmployeeDashboard = useEmployeeDashboard((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }));
  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDashboard.getRecord(id);
  }, []);

  return (
    <div className="layout-main-content">
     <Card bordered={false} title="Dashboard">
        <Tabs items={tabPages} tabPosition="top" />
      </Card>
    </div>
  );
};

export default EmployeeDashboardTabs;
