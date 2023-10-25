import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@/components/Table';
import { useUniversityFeeStructure } from '@/store/settings/useUniversityFeeStructure';
import * as modelUniversityFeeStructure from '@/models/settings/UniversityFeeStructure';

const universityfeestructures = () => {
  const navigate = useNavigate();

  const pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  const { universityfeestructuredata, getuniversityfeestructures, getuniversityfeestructure, deleteuniversityfeestructure }
    = useUniversityFeeStructure(
      (state: any) => ({
        universityfeestructuredata: state.universityfeestructuredata,
        deleteuniversityfeestructure: state.deleteuniversityfeestructure,
        getuniversityfeestructures: state.getuniversityfeestructures,
        getuniversityfeestructure: state.getuniversityfeestructure,
        updateuniversityfeestructure: state.updateuniversityfeestructure,
        adduniversityfeestructure: state.adduniversityfeestructure,
      }),
    );

  const handleActionClick = (value: any) => {
    if (value?.action === 'edit') {
      getuniversityfeestructure(value?.id);
      navigate(`../edit/${value?.id}`, { state: { id: value?.id } });
    }
    if (value?.action === 'delete') {
      deleteuniversityfeestructure(value?.id);
    }
  };

  React.useEffect(() => {
    getuniversityfeestructures();
  }, [getuniversityfeestructures]);

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="University Fee Structure"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add
            </Button>
          </Col>
        </Row>
        <TableContainer
          data={universityfeestructuredata}
          columns={modelUniversityFeeStructure.columns}
          pagination={pagination}
          handleActionClick={handleActionClick}
          allowSearch={false}
        />
      </Card>
    </div>
  );
};
export default universityfeestructures;
