import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useTermDuration } from '@/store/settings/useTermDuration';
import * as modelTermDuration from '@/models/settings/TermDuration';

const TermDuration = () => {
  const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { termdurationsdata, gettermdurations, gettermduration, deletetermdurationdetails } = useTermDuration(
    (state: any) => ({
      termdurationsdata: state.termdurationsdata,
      deletetermdurationdetails: state.deletetermdurationdetails,
      gettermdurations: state.gettermdurations,
      gettermduration: state.gettermduration,
    }),
  );

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      gettermduration(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deletetermdurationdetails(value?.id);
    }
  };

  React.useEffect(() => {
    gettermdurations();
  }, [gettermdurations]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Term Duration"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Term
            </Button>
          </Col>
        </Row>

        <TableContainer
          data={termdurationsdata}
          columns={modelTermDuration.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default TermDuration;
