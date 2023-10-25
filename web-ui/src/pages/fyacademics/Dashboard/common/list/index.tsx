import React, { useState } from 'react';
import { Card, Divider, Form, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import _ from 'lodash';
import ActivityList from '..';
import { useSettings } from '@/store/settings/useSettings';
import { usecommon } from '@/store/fyacademics/dashboad/usecommon';
import * as common from '@/models/fyacademics/dashboard/common';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const classwiseList = () => {
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
  const [selectYear, setYear] = useState();
  const storecommon = usecommon((state: any) => ({
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
    storecommon.getRecords(event);
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
    storecommon.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = common.common(settings);
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
              style={{ width: 400 }}
              value={selectYear}
              options={optionsAcademicYear}
              onChange={(event) => {
                handleActionChange(event);
              }}
            />
          </Space>

          <Divider type="vertical" />

          
        </Form.Item>
        <ActivityList />
        <h2>Work Status</h2>
        <Form.Item>
          <Table
            bordered
            columns={columns}
            dataSource={storecommon.allRecords}
          />
        </Form.Item>
      </Card>
    </div>
  );
};

export default classwiseList;