import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useCollegeFeeStructure } from '@/store/settings/useCollegeFeeStructure';
import * as modelCollegeFeeStructure from '@/models/settings/CollegeFeeStructure';

const feestructures = () => {
  const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { feestructuredata, getfeestructuresdata, getfeestructure, deletefeestructure } = useCollegeFeeStructure(
    (state: any) => ({
      feestructuredata: state.feestructuredata,
      deletefeestructure: state.deletefeestructure,
      getfeestructuresdata: state.getfeestructuresdata,
      getfeestructure: state.getfeestructure,
      updatefeestructure: state.updatefeestructure,
      addfeestructure: state.addfeestructure,
    }),
  );

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getfeestructure(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deletefeestructure(value?.id);
    }
  };

  React.useEffect(() => {
    getfeestructuresdata();
  }, [getfeestructuresdata]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="College Fee Structure"
      >
        <Row key="bank-header" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add
            </Button>
          </Col>
        </Row>

        <TableContainer
          data={feestructuredata}
          columns={modelCollegeFeeStructure.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default feestructures;
