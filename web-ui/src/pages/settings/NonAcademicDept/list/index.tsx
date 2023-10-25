import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelNonAcademicDept from '@/models/settings/NonAcademicDept';
import { useNonAcademicDepartment } from '@/store/settings/useNonAcademicDepartment';

import { useSettings } from '@/store/settings/useSettings';

const NonAcademicDepartmentList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAcademicDepartment = useNonAcademicDepartment((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeAcademicDepartment.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelNonAcademicDept.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>],
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Non-Academic Departments"
      >
        <Row justify="end" key="academicDepartment-header">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Department
            </Button>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={storeAcademicDepartment.allRecords} />
      </Card>
    </div>
  );
};

export default NonAcademicDepartmentList;
