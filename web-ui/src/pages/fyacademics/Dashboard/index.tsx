import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tabs } from 'antd';

import Common from './common/list';
import Divisionwise from './divisionwise/list';
import Programwise from './programwise/list';
import Workloaddistributionwise from './workloaddistribution/list';

import { usecommon } from '@/store/fyacademics/dashboad/usecommon';
import { useSettings } from '@/store/settings/useSettings';

const tabPages = [
  {
    label: 'Common',
    key: 'Common',
    children: <Common />,
  },
  {
    label: 'Division-wise',
    key: 'Division-wise',
    children: <Divisionwise />,
  },
  {
    label: 'Program-wise',
    key: 'program-wise',
    children: <Programwise />,
  },
  {
    label: 'Workload Distribution',
    key: 'Workload-Distribution',
    children: <Workloaddistributionwise />,
  },
];

const FyacademicsTabs = () => {
  const { id } = useParams();
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeBasicDetails = usecommon((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }));
  React.useEffect(() => {
    fetchSettings();
    storeBasicDetails.getRecord(id);
  }, []);

  return (
    <div className="layout-main-content">
      <Card>
        <Tabs items={tabPages} tabPosition="top" />
      </Card>
    </div>
  );
};

export default FyacademicsTabs;