import React from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { useAdmin } from '@/store/settings/useAdmin';

import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { BluNodeCoordinatorCategoryAsText } from '@/components/Lookups/renderers/BluNodeCoordinatorCategoryAsText';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
const renderers = {
  category: (value: string) => (
    <BluNodeCoordinatorCategoryAsText value={value} />
  ),
};
const bluNodeCoordinator = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAdmin = useAdmin((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    updateRecord: state.updateRecord,
    deleteRecord: state.deleteRecord,
  }));

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      storeAdmin.updateRecord(`${record.id}`);
    }
  };
  const { confirm } = Modal;

  const showConfirm = (record) => {
    confirm({
      title: 'Do you want to delete these record?',
      content: '',
      async onOk() {
        try {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            storeAdmin.deleteRecord();
          });
        }
        catch (e) {
          return console.log('error!');
        }
      },
      onCancel() {},
    });
  };

  React.useEffect(() => {
    fetchSettings();
    storeAdmin.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = [{}];

    cols.push({
      title: 'Name',
      key: 'name',
      render: (_, record) => [
        <span>
          {`${record.firstName} ${record.middleName} ${record.lastName}`}
        </span>,
      ],
    });

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        [
          <>
            <Button
              type="link"
              style={{ color: 'red' }}
              onClick={() =>
                handleActionClick({
                  action: 'edit',
                  record,
                })
              }
            >
              InActivate
            </Button>
            <Button type="link" onClick={() => showConfirm({ record })}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </>,
        ],
      ],
    });
    cols.shift();
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Admin(s)">
        <Row justify="end" key="blunodecoordinator">
          <Col>
            <Button
              type="primary"
              onClick={navigateToNewForm}
              style={{ borderRadius: '5px' }}
            >
              Add Admin          </Button>
          </Col>
        </Row>

        <div style={{ marginTop: '10px' }}>
        </div>
        <Table
          bordered
          columns={columns}
          dataSource={storeAdmin.allRecords}
        />

      </Card>
    </div>
  );
};

export default bluNodeCoordinator;
