import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import Table, { ColumnsType } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import { useSettings } from '@/store/settings/useSettings';
import { usecommon } from '@/store/fyacademics/dashboad/usecommon';
import * as modelFyacademicdashboard from '@/models/fyacademics/dashboard/common';

const ActivityList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeActivity = usecommon((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    activeRecord: state.activeRecord,
    AcademicsRecord: state.AcademicsRecord,
    inActivate: state.inActivate,
  }));

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeActivity.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelFyacademicdashboard.Activty(settings);
    cols.push({
      title: 'Division Creation',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
          shape="circle"
          icon={<SearchOutlined />}
        ></Button>,
      ],
    });
    cols.push({
      title: 'Student Division Enrollment',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
          shape="circle"
          icon={<SearchOutlined />}
        >
          edit
        </Button>,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="">
        <h2>Activity</h2>
        <Table bordered columns={columns} />
      </Card>
    </div>
  );
};

export default ActivityList;