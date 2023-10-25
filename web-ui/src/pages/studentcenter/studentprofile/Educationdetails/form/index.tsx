import React from 'react';
import { Card, Row, Table } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import * as modelEducationsDetails from '@/models/admissions/studentRecords/educationDetails';
import { useEducationDetails } from '@/store/admissions/useEducationDetails';
import { useSettings } from '@/store/settings/useSettings';

const EducationsDetails = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEducationDetails = useEducationDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeEducationDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelEducationsDetails.columns(settings);
    cols.push({
      title: 'View',
      dataIndex: 'document',
      render: (_, record) => [
        <span>
          <a href={record.document}>
            <DownloadOutlined />
          </a>
        </span>,
      ],
    });
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title=" Educational Details">
        <Row justify="end" key="bankDetails-header"></Row>
        <Table
          bordered
          columns={columns}
          dataSource={storeEducationDetails.allRecords}
          scroll={{ x: 300 }}
        />
      </Card>
    </div>
  );
};

export default EducationsDetails;
