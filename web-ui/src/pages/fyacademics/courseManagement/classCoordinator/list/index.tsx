import React, { useState } from 'react';
import { Button, Card, Col, Row, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { useSettings } from '@/store/settings/useSettings';
import { useClassCoordinator } from '@/store/fyacademics/courseManagement/useClassCoordinator';
import * as modelClassCoordinator from '@/models/fyacademics/courseManagement/ClassCoordinator';
import { isEmptyValue } from '@/utils/object';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { EditIcon } from '@/components/Icons/EditIcon';
import { AddIcon } from '@/components/Icons/AddIcon';

const ClassCoordinatorList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeClassCoordinator = useClassCoordinator((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }),
  );

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  /* const optionsAcademicYear = React.useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  ); */
  const optionsAcademicYear = storeAcademicYear.comboByName;
  React.useEffect(() => {
    fetchSettings();
    storeAcademicYear.getAcademicYearDetails();
  }, [fetchSettings]);

  const [selectYear, setYear] = useState();
  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      setYear(value);
    }
  }, [optionsAcademicYear]);

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      return;
    }
    storeClassCoordinator.getRecords(selectYear);
  }, [selectYear]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}/${record?.academicYear}/${record?.semester}/${record?.division}`,
        {
          state: { id: record?.id },
        },
      );
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeClassCoordinator.getRecords();
  }, []);

  const handleActionChange = (event) => {
    setYear(event);
    storeClassCoordinator.getRecords(event);
  };
  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelClassCoordinator.columns(settings);
    cols.push({
      title: 'Semester 1 Class Coordinator',
      key: 'semeter',
      render: (_, record) => [<><div>{!isEmptyValue(record.semester1ccid) ? <div>{record.semester1ccName} <Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}><EditIcon /></Button></div> : <Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}><AddIcon /></Button>}</div></>],
    });
    cols.push({
      title: 'Semester 2 Class Coordinator',
      key: 'semeter',
      render: (_, record) => [<><div>{!isEmptyValue(record.semester2ccid) ? <div>{record.semester2ccName} <Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}><EditIcon /></Button></div> : <Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}><AddIcon /></Button>}</div></>],
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Class Coordinator"
      >
        <Row justify="center">
          <Col>
            <Space>
              Academic Year:
              <Select
                style={{ width: 400 }}
                value={selectYear}
                options={optionsAcademicYear}
                onChange={(event) => { handleActionChange(event); }}
              />
            </Space>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>

            </Button>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={storeClassCoordinator.allRecords} />
      </Card>
    </div>
  );
};

export default ClassCoordinatorList;
