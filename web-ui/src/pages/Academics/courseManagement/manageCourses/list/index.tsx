import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Tabs, Form, Input, Space, Divider, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import { useManageCoursesDetails } from '@/store/Academics/courseManagement/manageCourses/useManageCoursesDetails';
import * as modelManageCourses from '@/models/Academics/courseManagement/manageCourses/ManageCourses';
import _ from 'lodash';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

const ManageCoursesList = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));
  const storeManageCourses = useManageCoursesDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    activeCourseRecord: state.activeCourseRecord,
    inactiveCourseRecord: state.inactiveCourseRecord,
    inActivateCourse: state.inActivateCourse
  }),
  );
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
    else if (action === 'inactivate') {
      const data = { inactive: 1 };
      storeManageCourses.inActivateCourse(record?.id, data);
    }
    else if (action === 'activate') {
      const data = { inactive: 2 };
      storeManageCourses.inActivateCourse(record?.id, data);
    }
  };

  React.useEffect(() => {
    settings.fetchSettings();
    storeManageCourses.getRecords();
    storeProgramDetails.getRecords();
  }, []);
  const [selectDegreeLevel, setDegreeLevel] = useState();
  const [selectProgramDetails, setProgramDetails] = useState();

  const optionsLevelOfEducation = React.useMemo(() => settings.asSelect('level_of_education') || [], [settings.byKeys]);
  const optionsProgramDetailss = _.map(storeProgramDetails.allRecords, record => ({ value: record.id, label: `${record.programmeName} (${record.programCode})` }));

  React.useEffect(() => {
    storeManageCourses.getRecords(selectDegreeLevel, selectProgramDetails);
  }, [selectDegreeLevel, selectProgramDetails]);

  const setDegreeLevelEvent = (event) => {
    setDegreeLevel(event);
  };
  const setsetProgramDetailsEvent = (event) => {
    setProgramDetails(event);
  };
  const onSearchSubmit = (values) => {
    console.log("Values received:", values.searchCourse)
    const serachResult = storeManageCourses.allRecords?.filter((record: any) => record.name === values.searchCourse);
    console.log(serachResult);
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelManageCourses.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<span><Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>, <Button type="link" onClick={() => handleActionClick({ action: 'inactivate', record })} style={{ color: 'red' }}>Deactivate</Button></span>],
    });
    return cols;
  }, [settings]);

  const inactiveColumns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelManageCourses.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<span><Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>, <Button type="link" onClick={() => handleActionClick({ action: 'activate', record })} >Activate</Button></span>],
    });
    return cols;
  }, [settings]);

  const tabPages = [
    { label: 'Active Courses', key: 'active-courses', children: <Table bordered columns={columns} dataSource={storeManageCourses.activeCourseRecord} /> },
    { label: 'Inactive Courses', key: 'inactive-courses', children: <Table bordered columns={inactiveColumns} dataSource={storeManageCourses.inactiveCourseRecord} /> },
  ];

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Manage Courses"
      >
        <Row>
          <Col>
            <Space>
              Degree Level:
              <Select
                style={{ width: 400 }}
                value={selectDegreeLevel}
                options={optionsLevelOfEducation}
                onChange={event => setDegreeLevelEvent(event)}
              />
            </Space>
          </Col>
          <Col>
            <Space>
              Program:
              <Select
                style={{ width: 400 }}
                value={selectProgramDetails}
                options={optionsProgramDetailss}
                onChange={event => setsetProgramDetailsEvent(event)}
              />
            </Space>
          </Col>
        </Row>
        <Divider></Divider>
        <div className='w-md'>
          <Form
            onFinish={onSearchSubmit}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              name="searchCourse"
              label="Search Course"
              style={{ fontWeight: 'bold' }}
              rules={[{ required: true, message: "Your search cannot be empty!" }]}
            >
              <Input placeholder="Enter Course Name" />
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
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Course
            </Button>
          </Col>
        </Row>
        <Tabs items={tabPages} tabPosition="top" />
      </Card>
    </div>
  );
};

export default ManageCoursesList;
