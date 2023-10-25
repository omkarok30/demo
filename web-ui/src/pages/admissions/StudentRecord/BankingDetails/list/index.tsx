import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelBankingDetails from '@/models/admissions/studentRecords/bankingDetails';
import { useBankingDetails } from '@/store/admissions/useBankingDetails';

import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';

const renderers = {
  linkToSalary: (value: string) => <OptionAsText value={value} fieldName="yesNo" />,
};

const BankDetails = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeBankDetails = useBankingDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const navigateToNewForm = () => {
    navigate('../banking-details/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../banking-details/${record?.id}`, {
        state: { id: record?.id },
      });
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeBankDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelBankingDetails.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <Button
          type="link"
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          Edit
        </Button>,
      ],
    });
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Bank Details">
        <Row justify="end" key="bankDetails-header">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Bank Details
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={storeBankDetails.allRecords}
          scroll={{ x: 300 }}
        />
      </Card>
    </div>
  );
};

export default BankDetails;
