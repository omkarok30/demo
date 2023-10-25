import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelContactDetails from '@/models/admissions/studentRecords/contactDetails';
import { useContactDetails } from '@/store/admissions/useContactDetails';
import { useSettings } from '@/store/settings/useSettings';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  numberType: (value: string) => <OptionAsText value={value} fieldName="numberType" />,
  belongsTo: (value: string) => <OptionAsText value={value} fieldName="belongsTo" />,
};

interface ScreenRoutingActionProps {
  action: string;
  record: {
    id: string;
  };
}

const ContactDetails = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeContactDetails = useContactDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../contact-details/new');
  };

  const handleActionClick = ({ action, record }: ScreenRoutingActionProps) => {
    if (action === 'edit') {
      navigate(`../contact-details/${record?.id}`, {
        state: { id: record?.id },
      });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeContactDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelContactDetails.columns();
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          View/Edit
        </Button>,
      ],
    });

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="">
        <Row justify="end" key="contact-details-header">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Contact Details
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={storeContactDetails.allRecords}
          scroll={{ x: 300 }}
        />
      </Card>
    </div>
  );
};

export default ContactDetails;
