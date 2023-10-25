import React, { useState } from 'react';
import { Button, Card, Modal, Space, Tag } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import VoterForm from '../form';
import * as modal from '@/models/admissions/studentRecords/IdentityDocs/voterIdDetails';
import { useVoterIdDocuments } from '@/store/admissions/IdentityDocument/useVoterIdDetails';

import { useSettings } from '@/store/settings/useSettings';
import { MoreOutlined } from '@ant-design/icons';

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
}

const VoterIdList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRecordId, setOpenRecordDetails] = useState('');

  const store = useVoterIdDocuments((state: any) => ({
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

  React.useEffect(() => {
    fetchSettings();
    store.getRecords();
  }, []);

  const displayNewButton = store.allRecords.length > 0;

  const handleButtonClick = () => {
    setOpenRecordDetails('new');
    showModal();
  };

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
          <Button onClick={handleButtonClick}>Add Voter ID Details</Button>
        </Card>
      )}
      {displayNewButton && (
        <Card
          bordered
          title="Voter Id Details"
          extra={<><Tag color="green">Verified</Tag><MoreOutlined title='view/update' onClick={() =>
            handleActionClick({
              action: 'edit',
            })
          } ></MoreOutlined></>}
        >

<Space size={80} >
    <Space.Compact direction="vertical">
      <div><label style={{ fontSize: '10px' }}>VOTER ID NUMBER</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].voterIdNumber}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">
    <div><label style={{ fontSize: '10px' }} >NAME</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].voterIdName}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">
    <div><label style={{ fontSize: '10px' }} >DATE OF BIRTH</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].voterIdDob}</div>
    </Space.Compact>

    <Space.Compact direction="vertical">

      <div><label style={{ fontSize: '10px' }} >PARENT'S / HUSBAND'S NAME

</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].voterIdFatherName}</div>
    </Space.Compact>
  </Space>

        { /* <Table
            bordered={false}
            columns={columns}
            dataSource={store.allRecords}
            scroll={{ x: 300 }}
            pagination={false}
      /> */}
        </Card>
      )}
      <Modal
        title="Voter Id Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <VoterForm recordId={openRecordId} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default VoterIdList;
