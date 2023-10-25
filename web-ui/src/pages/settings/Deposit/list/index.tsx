import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useDeposit } from '@/store/settings/useDeposit';
import * as modelDeposit from '@/models/settings/Deposit';

const Deposits = () => {
  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const navigate = useNavigate();

  const { allDepositDetails, getDepositDetail, getDepositDetails, deleteDepositDetails } = useDeposit(
    (state: any) => ({
      allDepositDetails: state.depositDetails,
      depositDetail: state.depositDetail,
      deleteDepositDetails: state.deleteDepositDetails,
      getDepositDetail: state.getDepositDetail,
      getDepositDetails: state.getDepositDetails,
    }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getDepositDetail(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deleteDepositDetails(value?.id);
    }
  };

  React.useEffect(() => {
    getDepositDetails();
  }, [getDepositDetails]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Deposits"
      >
        <Row key="deposits-header" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Deposits
            </Button>
          </Col>
        </Row>

        <TableContainer
          data={allDepositDetails}
          columns={modelDeposit.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};

export default Deposits;
