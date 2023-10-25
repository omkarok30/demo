import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useStudentInsuranceStructure } from '@/store/settings/useStudentInsuranceStructure';
import * as modelStudentInsuranceStructure from '@/models/settings/StudentInsuranceStructure';

const StudentInsuranceStructure = () => {
  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const navigate = useNavigate();

  const { allstudInsStruDetails, getStudInsStructureDetail, getStudInsStructureDetails, deletestudInsStruDetails } = useStudentInsuranceStructure(
    (state: any) => ({
      allstudInsStruDetails: state.studInsStruDetails,
      studInsStruDetail: state.studInsStruDetail,
      deletestudInsStruDetails: state.deletestudInsStruDetails,
      getStudInsStructureDetail: state.getStudInsStructureDetail,
      getStudInsStructureDetails: state.getStudInsStructureDetails,
    }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getStudInsStructureDetail(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deletestudInsStruDetails(value?.id);
    }
  };

  React.useEffect(() => {
    getStudInsStructureDetails();
  }, [getStudInsStructureDetails]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Student Insurance Structure"
      >
        <Row key="studinsurance-header" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Student Insurance
            </Button>
          </Col>
        </Row>

        <TableContainer
          data={allstudInsStruDetails}
          columns={modelStudentInsuranceStructure.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};

export default StudentInsuranceStructure;
