import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import { useGeneralSessions } from '@/store/Academics/timeTable/useGeneralSessions';
import * as modelGeneralSessions from '@/models/Academics/timeTable/generalSessions/GeneralSessions';

const GeneralSessionsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeGeneralSessions = useGeneralSessions((state: any) => ({
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
    storeGeneralSessions.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelGeneralSessions.columns(settings);
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
        title="General Sessions"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add General Sessions
            </Button>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={storeGeneralSessions.allRecords} />
      </Card>
    </div>
  );
};

export default GeneralSessionsList;
