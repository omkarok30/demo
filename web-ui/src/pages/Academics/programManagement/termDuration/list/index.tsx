import { Card, Col, Form, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';
import AnnualPattern from './annualPattern';
import SemesterPattern from './semesterPattern';
import TrimesterPattern from './trimesterPattern';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';

const TermDurationList = () => {
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionPattern = todoLookUps.getState().examinationPattern;
  const first = _.first(optionPattern);
  const patternFirstOption = _.get(first, ['value'], '');
  const [patternValue, setpatternValue] = useState(patternFirstOption);
  const [yearValue, setyearValue] = useState('');
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');
  React.useEffect(() => {
    setpatternValue(patternFirstOption);
    storeAcademicYear.getAcademicYearDetails();
    setyearValue(yearFirstOption);
  }, []);
  React.useEffect(() => {}, [yearValue]);
  React.useEffect(() => {}, [patternValue]);
  const handleOnChange = (value: any, id: string) => {
    if (id === 'year') {
      setyearValue(value);
      setpatternValue('');
    }
    else if (id === 'pattern') {
      setpatternValue(value);
    }
  };
  const [form] = Form.useForm();
 
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Term Duration">
      <Form form={form} layout="horizontal">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Academic Year">
                <Select
                style={{ width: "100%" }}
                options={optionsAcademicYear}
                defaultValue={yearFirstOption}
                onChange={(value) => {
                  handleOnChange(value, 'year');
                }}
              />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Examination Pattern">
              <Select
                style={{ width: "100%" }}
                options={optionPattern}
                defaultValue={patternValue}
                onChange={(value) => {
                  handleOnChange(value, 'pattern');
                }}
              />
                </Form.Item>
              </Col>
            </Row>
          </Form>

        {patternValue === 'annual'
          ? (
          <AnnualPattern year={yearValue}></AnnualPattern>
            )
          : (
              ''
            )}
        {patternValue === 'semester'
          ? (
          <SemesterPattern year={yearValue}></SemesterPattern>
            )
          : (
              ''
            )}
        {patternValue === 'trimester'
          ? (
          <TrimesterPattern year={yearValue}></TrimesterPattern>
            )
          : (
              ''
            )}
      </Card>
    </div>
  );
};

export default TermDurationList;
