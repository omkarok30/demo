import React from 'react';
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeDetails from '@/models/Employee/EmployeeDetails';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />,
};
const EmployeeDetailsList = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const navigateToNewForm = () => {
    navigate('../edit/new');
  };
  const navigateToAddForm = () => {
    navigate('../create');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEmployeeDetails.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          style={{ backgroundColor: '#2063B0', color: 'white' }}
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          View/Update
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (

    <div className="layout-main-content">
      <Card bordered={false} title="Search Employee">
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToAddForm}>
              Add Employee
            </Button>
          </Col>
        </Row>
        <div className="w-md">
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item
              name="Employee Name/Code"
              label="Employee Name/Code"
              style={{ fontWeight: 'bold' }}
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter Employee Name/Code" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        <Table
          bordered
          columns={columns}
          dataSource={storeEmployeeDetails.allRecords}
        />
      </Card>
    </div>
  );
};

export default EmployeeDetailsList;
