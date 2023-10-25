import React from 'react';
import { Button, Card, Col, Row, Table, Form, Input, Space, Descriptions } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelEmployeeDetails from '@/models/Employee/EmployeeDetails';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';

import { useSettings } from '@/store/settings/useSettings';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
import { attachRenderer } from '@/utils/tableExtras';
const renderers = {
  departmentId: (value: string) => <DepartmentAsText value={value} />
};
const MainHeader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeDetails = useEmployeeDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );
  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDetails.getRecord(id);
  }, []);


  return (
    <div>
      <Form >
        <Card>
          <Descriptions title="Employee Information" layout='vertical' column={4} colon={false}>
            <Descriptions.Item label="Employee Name" labelStyle={{ fontWeight: 'bold' }} contentStyle={{ fontStyle: 'italic', fontWeight: 500 }}>{storeEmployeeDetails.current.firstName} {storeEmployeeDetails.current.middleName} {storeEmployeeDetails.current.lastName}</Descriptions.Item>
            <Descriptions.Item label="Employee Designation" labelStyle={{ fontWeight: 'bold' }} contentStyle={{ fontStyle: 'italic', fontWeight: 500 }}>{storeEmployeeDetails.current.designation}</Descriptions.Item>
            <Descriptions.Item label="Employee Code" labelStyle={{ fontWeight: 'bold' }} contentStyle={{ fontStyle: 'italic', fontWeight: 500 }}>{storeEmployeeDetails.current.empCode}</Descriptions.Item>
            <Descriptions.Item label="Employee Status" labelStyle={{ fontWeight: 'bold' }} contentStyle={{ fontStyle: 'italic', fontWeight: 500 }}>{storeEmployeeDetails.current.employeeStatus}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Form>
    </div>
  );
};

export default MainHeader;
