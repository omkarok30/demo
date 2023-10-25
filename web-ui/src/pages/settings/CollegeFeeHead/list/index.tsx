import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useCollegeFeeHead } from '@/store/settings/useCollegeFeeHead';
import * as modelCollegeFeeHead from '@/models/settings/CollegeFeeHead';

const feeHeads = () => {
  const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { feeheaddata, getfeeheads, getfeehead, deletefeehead } = useCollegeFeeHead(
    (state: any) => ({
      feeheaddata: state.feeheaddata,
      deletefeehead: state.deletefeehead,
      getfeeheads: state.getfeeheads,
      getfeehead: state.getfeehead,
      updatefeehead: state.updatefeehead,
      addfeehead: state.addfeehead,
    }),
  );

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getfeehead(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deletefeehead(value?.id);
    }
  };

  React.useEffect(() => {
    getfeeheads();
  }, [getfeeheads]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="College Fee Head"
      >
        <Row key="bank-header" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add
            </Button>
          </Col>
        </Row>
        <TableContainer
          data={feeheaddata}
          columns={modelCollegeFeeHead.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default feeHeads;
