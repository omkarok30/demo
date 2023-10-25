import React, { useState } from 'react';
import { Button, Card, Descriptions, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDashboarddetails } from '@/store/employee/useemployeedashdetails';
import * as modelEmployeeDashboard from '@/models/Employee/EmployeeDashboard';
import { ProgramAsText } from '@/components/Renderers/ProgramAsText';

const EmployyeDetailsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeDetails = useEmployeeDashboarddetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [active, setActive] = useState(false);
  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelEmployeeDashboard.EmployeeDetailscolumn(settings);
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
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="List of Current Employees">
      <Card >   <Descriptions layout="vertical">
          <Descriptions.Item label="DEPARTMENT ">
         FIRST YEAR DEPARTMENT 
          </Descriptions.Item><br>
          <Descriptions.Item label="ACADEMIC YEAR">
      ACADEMIC YEAR: 2017-18
          </Descriptions.Item>
          </br>

         
        </Descriptions></Card>
        <Card >   <Descriptions layout="vertical">
        <Descriptions.Item label="Total Number of Teaching staff">
          10 
          </Descriptions.Item>
   
          <Descriptions.Item label="Total Number of Non-Teaching staff">
          1
          </Descriptions.Item>
          
        </Descriptions></Card>
      
        <Row justify="end" >
      <Button
            onClick={handleClick}
              style={{ backgroundColor: active ? 'green' : 'green' }}
              icon={<DownloadOutlined />}
              size={size}
            >
              Download Report
            </Button>
            </Row>
        <Table
          bordered
          columns={columns}
          dataSource={storeEmployeeDetails.allRecords}
        />
         <Row justify="center" >
      <Button
            onClick={handleClick}
              style={{ backgroundColor: active ? 'green' : 'green' }}
              icon={<DownloadOutlined />}
              size={size}
            >
              Download Report
            </Button>
            <Button type='primary' size={size} >
              Back
            </Button>
            </Row>
      </Card>
    </div>
  );
};

export default EmployyeDetailsList;
