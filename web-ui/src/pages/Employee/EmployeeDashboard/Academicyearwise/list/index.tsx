import React, { useState } from 'react';
import { Button, Card, Col, Row, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import AdministrativeList from '../../AdministrativeDept/list';
import OverallList from '@/pages/Employee/EmployeeDashboard/overall/list';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDashboardAcademicsyearwise } from '@/store/employee/useEmpAcademicyearwise';
import * as modelEmployeeDashboard from '@/models/Employee/EmployeeDashboard';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import _ from 'lodash';

const EmployeeDashboardList = () => {
  const navigate = useNavigate();
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;
 const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [active, setActive] = useState(false);
  const [yearValue, setyearValue] = useState('');
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');

  const storeEmpAcademicsyearwise = useEmployeeDashboardAcademicsyearwise((state: any) => ({
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
    
    storeAcademicYear.getAcademicYearDetails();
    setyearValue(yearFirstOption);
  }, []);
  React.useEffect(() => {
    fetchSettings();
    storeEmpAcademicsyearwise.getRecords();
  }, []);
  React.useEffect(() => {}, [yearValue]);
  const handleOnChange = (value: any, id: string) => {
    if (id === 'year') {
      setyearValue(value);
    }
  };
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
       <Row>
          <Col>
            <Space>
              Academic Year
              <Select
                style={{ width: 400 }}
                options={optionsAcademicYear}
                defaultValue={yearFirstOption}
                onChange={(value) => {
                  handleOnChange(value, 'year');
                }}
              />
            </Space>
          </Col>
          </Row>
      <Card bordered={false} title="Academic Departments">

      <Table
          bordered
          columns={columns}
          dataSource={storeEmpAcademicsyearwise.allRecords}
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
