import React from 'react';
import { Card, Col, Form, Row, Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import TableContainer from '@/components/Table';
import { useUniStudInsurance } from '@/store/settings/useUniStudInsurance';
import * as modelUniStudInsurance from '@/models/settings/UniStudInsurance';

const unistudinsurance = () => {
  // const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const {
    unistudinsurancedata,
    getunistudInsuranceData,
    getApplicableDegreeLevels,
    applicabledegreelevel,
    academicyear,
    getacademicyear,
    unistudInsuranceYearwise,
    deleteunistudinsurances,
  } = useUniStudInsurance((state: any) => ({
    unistudinsurancedata: state.unistudinsurancedata,
    getunistudInsuranceData: state.getunistudInsuranceData,
    getApplicableDegreeLevels: state.getApplicableDegreeLevels,
    applicabledegreelevel: state.applicabledegreelevel,
    academicyear: state.academicyear,
    getacademicyear: state.getacademicyear,
    unistudInsuranceYearwise: state.unistudInsuranceYearwise,
    deleteunistudinsurances: state.deleteunistudinsurances,
  }));

  const handleActionClick = (value: any) => {
    if (value?.action === 'delete') {
      deleteunistudinsurances(value?.id);
    }
  };
  const yearoptions = [{ value: '', label: '' }];

  academicyear.map((item: any) => {
    const feeheadname = {
      value: item.aYear,
      label: item.aYear,
    };
    yearoptions.push(feeheadname);
  });
  yearoptions.splice(0, 1);

  React.useEffect(() => {
    getunistudInsuranceData();
    getApplicableDegreeLevels();
    getacademicyear();
  }, [
    getunistudInsuranceData,
    getApplicableDegreeLevels,
    getacademicyear,

  ]);

  const onOptionChange = (event: any) => {
    unistudInsuranceYearwise(event);
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="University Fee and Student Insurance Structure"
      >
        <Row>
          <Col>
            <Form>
              <Form.Item name="academic_year" label="Academic Year">
                <Select id="academic_year" options={yearoptions} onChange={event => onOptionChange(event)}></Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {applicabledegreelevel.map((item: any) => {
          return (
            <>
              <Row key="bank-header">
                <Col>
                  <Title level={5}>{item.title}</Title>
                </Col>
              </Row>
              <TableContainer
                data={unistudinsurancedata.filter(
                  (insurancedetails: any) => insurancedetails.degree_level === item.degree_level,
                )}
                columns={modelUniStudInsurance.columns}
                pagination={pagination}
                handleActionClick={handleActionClick}
                allowSearch={false}
              />
            </>
          );
        })}
      </Card>
    </div>
  );
};
export default unistudinsurance;
