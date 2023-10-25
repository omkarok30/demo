import React from 'react';
import { Button, Card, Col, Row, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import * as modelBankDetails from '@/models/settings/BankDetails';
import { useBankDetails } from '@/store/settings/useBankDetails';

import { useSettings } from '@/store/settings/useSettings';

const BankDetailsList = () => {
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeBankDetails = useBankDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

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
    storeBankDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelBankDetails.columns(settings);
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
        title="Bank Details"
      >
        <Row justify="end" key="bankDetails-header">
          <Col>
            <Button type="primary" onClick={navigateToNewForm}>
              Add Bank Details
            </Button>
          </Col>
        </Row>
        <Table bordered columns={columns} dataSource={storeBankDetails.allRecords} />
      </Card>
    </div>
  );
};

export default BankDetailsList;
