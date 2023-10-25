import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import AdministrativeList from '../AdministrativeDept/list';
import OverallList from '../overall/list';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDashboard } from '@/store/employee/useemployeeDashboard';
import * as modelEmployeeDashboard from '@/models/Employee/EmployeeDashboard';

const EmployeeDashboardList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [active, setActive] = useState(false);
  const storeEmployeeDashboard = useEmployeeDashboard((state: any) => ({
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
    storeEmployeeDashboard.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelEmployeeDashboard.Academiccolumns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          View Staff
        </Button>,
      ],
    });

    
    return cols;
  }, [settings]);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Academic Departments">
      <Table
          bordered
          columns={columns}
          dataSource={storeEmployeeDashboard.allRecords}
        />
        <Row>
        <AdministrativeList />
        </Row>
        <Row>
        <OverallList />
        </Row>
        <Row justify={'center'}>
          <Col>
            <Button
            onClick={handleClick}
              style={{ backgroundColor: active ? 'green' : 'green' }}
              icon={<DownloadOutlined />}
              size={size}
            >
              Download Report
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EmployeeDashboardList;
