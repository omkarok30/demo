import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useStudentInsurance } from '@/store/settings/useStudentInsurance';
import * as modelStudentInsurance from '@/models/settings/StudentInsurance';

const StudentInsurance = () => {
  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const navigate = useNavigate();

  const { allInsuranceDetails, getInsuranceDetail, getInsuranceDetails, deleteInsuranceDetails } = useStudentInsurance(
    (state: any) => ({
      allInsuranceDetails: state.insuranceDetails,
      insuranceDetail: state.insuranceDetail,
      deleteInsuranceDetails: state.deleteInsuranceDetails,
      getInsuranceDetail: state.getInsuranceDetail,
      getInsuranceDetails: state.getInsuranceDetails,
    }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getInsuranceDetail(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deleteInsuranceDetails(value?.id);
    }
  };

  React.useEffect(() => {
    getInsuranceDetails();
  }, [getInsuranceDetails]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Student Insurance"
      >
        <Row key="insurance-header" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Student Insurance
            </Button>
          </Col>
        </Row>

        <TableContainer
          data={allInsuranceDetails}
          columns={modelStudentInsurance.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};

export default StudentInsurance;
