import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useMiscCharges } from '@/store/settings/useMiscCharges';
import * as modelMiscCharges from '@/models/settings/MiscCharges';

const misccharges = () => {
  const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { miscchargedata, getmisccharges, getmisccharge, deletemisccharge } = useMiscCharges(
    (state: any) => ({
      miscchargedata: state.miscchargedata,
      deletemisccharge: state.deletemisccharge,
      getmisccharges: state.getmisccharges,
      getmisccharge: state.getmisccharge,
      updatemisccharge: state.updatemisccharge,
      addmisccharge: state.addmisccharge,
    }),
  );

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getmisccharge(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deletemisccharge(value?.id);
    }
  };

  React.useEffect(() => {
    getmisccharges();
  }, [getmisccharges]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Miscellaneous Charges"
      >
        <Row key="misc-charges" justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add
            </Button>
          </Col>
        </Row>

        <TableContainer
          data={miscchargedata}
          columns={modelMiscCharges.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default misccharges;
