import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import _ from 'lodash';
import { useSettings } from '@/store/settings/useSettings';
import { useworkloaddistribution } from '@/store/fyacademics/dashboad/useworkloaddistribution';
import * as modelFyacademicdashboard from '@/models/fyacademics/dashboard/common';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const FyacademicsdashboardList = () => {
  const navigate = useNavigate();
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [active, setActive] = useState(false);

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionaprogram = todoLookUps.getState().program;
  const optionsemester = todoLookUps.getState().semester;
  const [selectYear, setYear] = useState();
  const storeworkloaddistributionwise = useworkloaddistribution((state: any) => ({
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
  const handleActionChange = (event) => {
    setYear(event);
    storeworkloaddistributionwise.getRecords(event);
  };

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      setYear(value);
    }
  }, [optionsAcademicYear]);

  React.useEffect(() => {
    fetchSettings();
    storeworkloaddistributionwise.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelFyacademicdashboard.workloaddistribution(settings);

    return cols;
  }, [settings]);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="">
        <Form.Item>
          <Space>
            Academic Year:
            <Select
              style={{ width: 200 }}
              value={selectYear}
              options={optionsAcademicYear}
              onChange={(event) => {
                handleActionChange(event);
              }}
            />
          </Space>
          <Divider type="vertical" />
         
          <Space>
            Semester
            <Select style={{ width: 200 }} options={optionsemester} />
          </Space>
        
          <Divider />
          <Row justify={'start'}>
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
        </Form.Item>
        <Table
          bordered
          columns={columns}
          dataSource={storeworkloaddistributionwise.allRecords}
        />
      </Card>
    </div>
  );
};

export default FyacademicsdashboardList;