import React from 'react';
import { Card, Table } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import * as modelContactDetails from '@/models/admissions/studentRecords/contactDetails';
import { useContactDetails } from '@/store/admissions/useContactDetails';
import { useSettings } from '@/store/settings/useSettings';
const ContactDetails = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeContactDetails = useContactDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeContactDetails.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modelContactDetails.columns();
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Contact Details ">
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
