import React, { useState } from 'react';
import { Card, Col, Collapse, Divider, Row, Select, Space } from 'antd';

import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import Overview from '@/pages/AdmissionDashboard/overview';
import Admissioncategories from '@/pages/AdmissionDashboard/AdmissionCategories';
import Feescategory from '@/pages/AdmissionDashboard/Fees-Category';
import NewlyAdmittedstudent from '@/pages/AdmissionDashboard/NewlyAdmittedstudent';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

import { isEmptyValue } from '@/utils/object';
const AcademicDepartmentList = () => {
  const { Panel } = Collapse;
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsAllPrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
  }));
  const [selectYear, setYear] = useState();
  const [selectProgram, setprogram] = useState();
  const [academicYearLabel, setacademicYearLabel] = useState();
  const [programLabel, setprogramLabel] = useState();
  const optionsPrograms = storeProgramDetails.optionsAllPrograms;

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const [yearValue, setyearValue] = useState('');
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    setyearValue(yearFirstOption);
  }, []);
  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      const label = _.get(first, ['label'], '');
      setYear(value);
      setacademicYearLabel(label);
    }
    if (isEmptyValue(selectProgram)) {
      const firstProgram = _.first(optionsPrograms);
      const valueProgram = _.get(firstProgram, ['value'], '');
      const labelProgram = _.get(firstProgram, ['label'], '');

      setprogram(valueProgram);
      setprogramLabel(labelProgram);
    }
  }, [optionsAcademicYear]);
  const setAcademicYear = (event) => {
    setYear(event);
    const value = event;
    const yearOptions = _.find(optionsAcademicYear, { value });
    const label = _.get(yearOptions, ['label'], '');
    setacademicYearLabel(label);
  };
  const setPrograms = (event) => {
    setprogram(event);
    const value = event;
    const programOptions = _.find(optionsPrograms, { value });
    const label = _.get(programOptions, ['label'], '');
    setprogramLabel(label);
  };

  return (
    <div className="layout-main-content">
      <Card bordered={false} title=" Dashboard">
        <div style={{ border: '1px solid blue' }}>
          <Collapse
            defaultActiveKey={['1']}
            onChange={onChange}
            expandIcon={({ isActive }) =>
              !isActive ? <PlusCircleOutlined /> : <MinusCircleOutlined />
            }
          >
            <Panel header="Overview" key="1">
              <Row>
                <Col span={12}>
                  <Space>
                    Academic Year
                    <Select
                      style={{ width: 400 }}
                      value={selectYear}
                      options={optionsAcademicYear}
                      onChange={event => setAcademicYear(event)}
                    />
                  </Space>
                </Col>
                <Overview />
              </Row>
            </Panel>
          </Collapse>
        </div>
        <Divider />
        <div style={{ border: '1px solid blue' }}>
          <Collapse
            defaultActiveKey={['1']}
            ghost
            onChange={onChange}
            expandIcon={({ isActive }) =>
              !isActive ? <PlusCircleOutlined /> : <MinusCircleOutlined />
            }
          >
            <Panel header="Admission-Category Wise" key="2">
              <Row justify={'space-evenly'}>
                <Col span={12}>
                  <Space>
                    Academic Year
                    <Select
                      style={{ width: 200 }}
                      value={selectYear}
                      options={optionsAcademicYear}
                      onChange={event => setAcademicYear(event)}
                    />
                  </Space>
                </Col>

                <Col span={12}>
                  Program
                  <Select
                    style={{ width: '300px' }}
                    value={selectProgram}
                    options={storeProgramDetails.optionsAllPrograms}
                    onChange={event => setPrograms(event)}
                  />
                </Col>
                <Admissioncategories />
              </Row>
            </Panel>
          </Collapse>
        </div>
        <Divider />
        <div style={{ border: '1px solid blue' }}>
          <Collapse
            defaultActiveKey={['1']}
            ghost
            onChange={onChange}
            expandIcon={({ isActive }) =>
              !isActive ? <PlusCircleOutlined /> : <MinusCircleOutlined />
            }
          >
            <Panel header="Fees-Category Wise" key="3">
              <Row>
                <Col span={12}>
                  <Space>
                    Academic Year
                    <Select
                      style={{ width: 200 }}
                      value={selectYear}
                      options={optionsAcademicYear}
                      onChange={event => setAcademicYear(event)}
                    />
                  </Space>
                </Col>

                <Col span={12}>
                  Program
                  <Select
                    style={{ width: '300px' }}
                    value={selectProgram}
                    options={storeProgramDetails.optionsAllPrograms}
                    onChange={event => setPrograms(event)}
                  />
                </Col>
                <Feescategory />
              </Row>
            </Panel>
          </Collapse>
        </div>
        <Divider />
        <div style={{ border: '1px solid blue' }}>
          <Collapse
            defaultActiveKey={['1']}
            ghost
            onChange={onChange}
            expandIcon={({ isActive }) =>
              !isActive ? <PlusCircleOutlined /> : <MinusCircleOutlined />
            }
          >
            <Panel header="Newly Admitted Students" key="4">
              <Row justify="center">
                <Col>
                  Academic Year
                  <Select
                    style={{ width: 400 }}
                    value={selectYear}
                    options={optionsAcademicYear}
                    onChange={event => setAcademicYear(event)}
                  />
                </Col>
                <NewlyAdmittedstudent />
              </Row>
            </Panel>
          </Collapse>
        </div>
      </Card>
    </div>
  );
};

export default AcademicDepartmentList;
