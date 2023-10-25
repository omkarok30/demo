import React from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import { useSettings } from '@/store/settings/useSettings';
import * as modalIssuedDocuments from '@/models/admissions/studentRecords/issuedDocuments';
import { useIssuedDocument } from '@/store/admissions/useIssuedDocuments';

const IssuedDocuments = () => {
  const { id } = useParams();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeIssuedDocuments = useIssuedDocument((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecords: state.deleteRecords,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeIssuedDocuments.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modalIssuedDocuments.columns(settings);
    cols.push({
      title: 'View Document',
      dataIndex: 'viewDocument',
      render: (_, record) => [
        <span>
          <a href={record.viewDocument}>
            <DownloadOutlined />
          </a>
        </span>,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Issued Documents">
        <Table
          bordered
          columns={columns}
          dataSource={storeIssuedDocuments.allRecords}
        />
      </Card>
    </div>
  );
};

export default IssuedDocuments;
