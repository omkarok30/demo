import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDocument } from '@/store/employee/useEmployeeDocument';
import * as modelEmployeeDocument from '@/models/Employee/Employeedocument';
import { isEmptyValue } from '@/utils/object';

const EmployeeDocumentList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEmployeeDocument = useEmployeeDocument((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
    else if (action === 'delete') {
      storeEmployeeDocument.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEmployeeDocument.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelEmployeeDocument.columns(settings);
    cols.push({
      title: 'Upload Document',
      dataIndex: 'uploaddocument',
      render: (_, record) =>
        isEmptyValue(record.uploaddocument)
          ? [
                <span>
                  <Button
                    type='link'
                    onClick={() => {
                      alert('Not provided');
                    }}
                  >
                    NA
                  </Button>
                </span>,
            ]
          : [
                <span>
                  <a href={record.uploaddocument}>
                    <DownloadOutlined />
                  </a>
                </span>,
            ],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
      <span>
        <Button type="link" onClick={() => handleActionClick({ action: 'edit', record })}>Update</Button>
        <Button
            type='link'
            style={{ color: 'red' }}
            onClick={() => handleActionClick({ action: 'delete', record })}
          >
            Delete
          </Button>
      </span>,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        title="Employee Document"
      >
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Employee Document
            </Button>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={storeEmployeeDocument.allRecords} />
      </Card>
    </div>
  );
};

export default EmployeeDocumentList;