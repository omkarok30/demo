import React from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import * as modelStudentDocuments from '@/models/admissions/studentRecords/StudentDocuments';
import { useStudentDocuments } from '@/store/admissions/useStudentDocuments';

const StudentDocuments = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeStudentDocuments = useStudentDocuments((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecords: state.deleteRecords,
  }));

  const navigateToNewForm = () => {
    navigate(`../student_document/new/${id}`);
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../student_document/${record?.id}/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      storeStudentDocuments.deleteRecords(record?.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeStudentDocuments.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelStudentDocuments.columns(settings);
    cols.push({
      title: 'View',
      dataIndex: 'document',
      render: (_, record) => [<span><a href={record.document}><DownloadOutlined /></a></span>],
    });
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type='link'
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          Edit
        </Button>,
        <Button
          type='link'
          style={{ color: 'red' }}
          onClick={() => handleActionClick({ action: 'delete', record })}
        >
          Delete
        </Button>,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card bordered={false} title='Student Documents'>
        <Row justify='end' key='bankDetails-header'>
          <Col>
            <Button type='primary' onClick={navigateToNewForm}>
              Add Student Documents
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={storeStudentDocuments.allRecords}
        />
      </Card>
    </div>
  );
};

export default StudentDocuments;
