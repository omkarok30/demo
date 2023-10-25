import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';
import * as modelAcademicDept from '@/models/settings/AcademicDept';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  startYear: (value: string) => <YearAsText value={value} />,
  endYear: (value: string) => <YearAsText value={value} />,
};

const AcademicDepartmentList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
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
    let cols = modelAcademicDept.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [<Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Edit</Button>],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Academic Departments"
      >
        <Row justify="end">
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

export default AcademicDepartmentList;
