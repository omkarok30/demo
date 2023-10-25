import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useUniversityFee } from '@/store/settings/useUniversityFee';
import * as modelUniversityFee from '@/models/settings/UniversityFee';

const universityfeeheads = () => {
  const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { universityfeeheaddata, getuniversityfeeheads, getuniversityfeehead, deleteuniversityfeehead }
    = useUniversityFee(
      (state: any) => ({
        universityfeeheaddata: state.universityfeeheaddata,
        deleteuniversityfeehead: state.deleteuniversityfeehead,
        getuniversityfeeheads: state.getuniversityfeeheads,
        getuniversityfeehead: state.getuniversityfeehead,
        updateuniversityfeehead: state.updateuniversityfeehead,
        adduniversityfeehead: state.adduniversityfeehead,
      }),
    );

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getuniversityfeehead(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deleteuniversityfeehead(value?.id);
    }
  };

  React.useEffect(() => {
    getuniversityfeeheads();
  }, [getuniversityfeeheads]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="University Fees"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add
            </Button>
          </Col>
        </Row>
        <TableContainer
          data={universityfeeheaddata}
          columns={modelUniversityFee.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default universityfeeheads;
