import React, { useState } from 'react';
import { Button, Card, Modal, Space, Tag } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import { MoreOutlined } from '@ant-design/icons';
import AdharForm from '../form';
import * as modal from '@/models/admissions/studentRecords/IdentityDocs/adhaarDetails';
import { useAdhaarDocument } from '@/store/admissions/IdentityDocument/useAdhaarDetails';

import { useSettings } from '@/store/settings/useSettings';

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
}

const AdharDocumentList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRecordId, setOpenRecordDetails] = useState('');

  const store = useAdhaarDocument((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleActionClick = ({ action }: ActionProps) => {
    if (action === 'edit') {
      setOpenRecordDetails(store.allRecords[0].id);
      showModal();
    }
  };

  const handleButtonClick = () => {
    setOpenRecordDetails('new');
    showModal();
  };

  React.useEffect(() => {
    fetchSettings();
    store.getRecords();
  }, []);

  const displayNewButton = store.allRecords.length > 0;

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modal.columns();
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return [
          <Button
            type="link"
            onClick={() =>
              handleActionClick({
                action: 'edit',
                record,
              })
            }
          >
            Edit
          </Button>,
        ];
      },
    });

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      {!displayNewButton && (
        <Card
          bordered
          title="Passport Details"
          extra={<Tag color="orange">Mandetory</Tag>}
        >
          <Button onClick={handleButtonClick}>Add Adhar Card Details</Button>
        </Card>
      )}
      {displayNewButton && (
        <Card
          bordered
          title="Adhaar Details"
          extra={<><Tag color="green">Verified</Tag><MoreOutlined title='view/update' onClick={() =>
            handleActionClick({ action: 'edit' })}></MoreOutlined></>}
        >
          <Space size={70} >
    <Space.Compact direction="vertical">
      <div><label style={{ fontSize: '10px' }}>AADHAAR NUMBER</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].adhaarNumber}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">
    <div><label style={{ fontSize: '10px' }} >DATE OF BIRTH</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].adhaarDob}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">
    <div><label style={{ fontSize: '10px' }} >NAME</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].adhaarName}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">

      <div><label style={{ fontSize: '10px' }} >FATHER'S NAME / HUSBAND'S NAME</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].adhaarFatherName}</div>
    </Space.Compact>
  </Space>

  <Space size={70} style={{ marginTop: '20px' }} >
    <Space.Compact direction="vertical">
      <div><label style={{ fontSize: '10px' }}>ADDRESS</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].adhaarAddress}</div>
    </Space.Compact>
    </Space>
{
/* <Table
 bordered={false}

 columns={columns}
 dataSource={store.allRecords}
 scroll={{ x: 300 }}
 pagination={false}
/> */
}

        </Card>
      )}
      <Modal
        title="Adhaar Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <AdharForm recordId={openRecordId} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default AdharDocumentList;
