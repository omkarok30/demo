import React, { useState } from 'react';
import { Button, Card, Modal, Space, Tag } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import { MoreOutlined } from '@ant-design/icons';
import PassportDetailsForm from '../form';
import * as modal from '@/models/admissions/studentRecords/IdentityDocs/passportDetails';
import { usePassportDocuments } from '@/store/admissions/IdentityDocument/usePassportDetails';

import { useSettings } from '@/store/settings/useSettings';

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
}

const PassportDetailsList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRecordId, setOpenRecordDetails] = useState('');

  const store = usePassportDocuments((state: any) => ({
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
          bordered={true}
          title="Passport Details"
          extra={<Tag color="orange">Mandetory</Tag>}
        >
          <Button type="primary" onClick={handleButtonClick}>
            Add Passport Details
          </Button>
        </Card>
      )}
      {displayNewButton && (
        <Card
          bordered={true}
          title="Passport Details"
          extra={
            <>
              <Tag color="green">Verified</Tag>
              <MoreOutlined title='view/update'
                onClick={() =>
                  handleActionClick({
                    action: 'edit',
                  })
                }
              ></MoreOutlined>
            </>
          }
        >
          {/* <Table
            bordered={false}
            columns={columns}
            dataSource={store.allRecords}
            scroll={{ x: 300 }}
            pagination={false}
      /> */}

          <Space size={80}>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>PASSPORT NUMBER</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportNumber}
              </div>
            </Space.Compact>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>DATE OF BIRTH</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportDob}
              </div>
            </Space.Compact>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>FULL NAME</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportFullName}
              </div>
            </Space.Compact>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>FATHER'S NAME</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportFatherName}
              </div>
            </Space.Compact>
          </Space>
          <br></br>
          <Space size={90} style={{ marginTop: '20px' }}>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>DATE OF ISSUE</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportIssueDate}
              </div>
            </Space.Compact>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>PLACE OF ISSUE</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportIssuePlace}
              </div>
            </Space.Compact>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>PLACE OF BIRTH</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportPlaceOfBirth}
              </div>
            </Space.Compact>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>EXPIRES ON</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportExpiryDate}
              </div>
            </Space.Compact>
          </Space>
          <br></br>
          <Space size={70} style={{ marginTop: '20px' }}>
            <Space.Compact direction="vertical">
              <div>
                <label style={{ fontSize: '10px' }}>ADDRESS</label>
              </div>
              <div style={{ color: 'black' }}>
                {' '}
                {store.allRecords[0].passportAddress}
              </div>
            </Space.Compact>
          </Space>
        </Card>
      )}
      <Modal
        title="Passport Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <PassportDetailsForm
          recordId={openRecordId}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default PassportDetailsList;
