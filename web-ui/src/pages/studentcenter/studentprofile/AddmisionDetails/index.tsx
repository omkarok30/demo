import React from 'react';
import { Button, Card, Table } from 'antd';
import { useParams } from 'react-router-dom';

import { DownloadOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import * as modelAdmissionDetails from '@/models/admissions/studentRecords/AdmissionDetails';
import { useAdmissionDetails } from '@/store/admissions/useAdmissionDetails';

import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';

const AdmissionDetails = () => {
  const { id } = useParams();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeAdmissionDetails = useAdmissionDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeAdmissionDetails.getRecords(id);
    console.log(storeAdmissionDetails.getRecords);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelAdmissionDetails.columns(settings);
    cols.push({
      title: 'View',
      dataIndex: 'document',
      render: (_, record) =>
        isEmptyValue(record.document)
          ? [
              <span>
                <Button
                  type="link"
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
                <a href={record.document}>
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
          <Button type="link" style={{ color: 'red' }}>
            Delete
          </Button>
        </span>,
      ],
    });

    return cols;
  }, [settings]);

  return (
    <div>
      <>
        <Card bordered={false} title="Addmission Details" />
        <Table
          bordered
          columns={columns}
          dataSource={storeAdmissionDetails.allRecords}
          scroll={{ x: 300 }}
        />

        <Table
          bordered
          columns={columns}
          dataSource={storeAdmissionDetails.allRecords}
          scroll={{ x: 300 }}
        />
      </>
    </div>
  );
};

export default AdmissionDetails;
