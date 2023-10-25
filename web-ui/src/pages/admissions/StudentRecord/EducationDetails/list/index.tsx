import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import * as modelEducationsDetails from '@/models/admissions/studentRecords/educationDetails';
import { useEducationDetails } from '@/store/admissions/useEducationDetails';
import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { EditIcon } from '@/components/Icons/EditIcon';

const renderers = {
  qualification: (value: string) => (
    <OptionAsText value={value} fieldName="qualification" />
  ),
};

const EducationsDetails = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeEducationDetails = useEducationDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../education-details/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../education-details/${record?.id}`, {
        state: { id: record?.id },
      });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeEducationDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelEducationsDetails.columns(settings);
    cols.push({
      title: 'Certificate',
      dataIndex: 'document',
      render: (_, record) => [
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
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          <EditIcon></EditIcon>
        </Button>,
      ],
    });

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="">
        <Row justify="end" key="bankDetails-header">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Education Details
            </Button>
          </Col>
        </Row>
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
