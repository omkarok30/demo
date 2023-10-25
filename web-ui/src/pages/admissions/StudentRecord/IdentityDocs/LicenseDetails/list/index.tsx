import React, { useState } from 'react';
import { Button, Card, Modal, Space, Table, Tag } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import LicenseDetailsForm from '../form';
import * as modal from '@/models/admissions/studentRecords/IdentityDocs/licenseDetails';
import { useLicenseDocuments } from '@/store/admissions/IdentityDocument/useLicenseDocument';

import { useSettings } from '@/store/settings/useSettings';
import { MoreOutlined } from '@ant-design/icons';

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
}

const LicenseDetailsList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRecordId, setOpenRecordDetails] = useState('');

  const store = useLicenseDocuments((state: any) => ({
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
          <Button onClick={handleButtonClick}>
            Add Driving License Details
          </Button>
        </Card>
      )}
      {displayNewButton && (
        <Card
          bordered
          title="Driving License Details"
          extra={<><Tag color="green">Verified</Tag><MoreOutlined title='view/update' onClick={() =>
            handleActionClick({
              action: 'edit',
            })
          } ></MoreOutlined></>}
        >
       {  /* <Table
            bordered={false}
            columns={columns}
            dataSource={store.allRecords}
            scroll={{ x: 300 }}
            pagination={false}
      />*/}

<Space size={70} >
    <Space.Compact direction="vertical">
      <div><label style={{ fontSize: '10px' }}>LICENSE NUMBER	 </label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].dlNumber}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">
    <div><label style={{ fontSize: '10px' }} >DATE OF BIRTH</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].dlDob}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">
    <div><label style={{ fontSize: '10px' }} >NAME</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].dlName}</div>
    </Space.Compact>
    <Space.Compact direction="vertical">

      <div><label style={{ fontSize: '10px' }} >FATHER'S NAME / HUSBAND'S NAME

</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].dlFatherName}</div>
    </Space.Compact>
  </Space>
<br></br>

  <Space size={100} style={{ marginTop: '20px' }} >
    <Space.Compact direction="vertical">
      <div><label style={{ fontSize: '10px' }}>EXPIRES ON</label></div>
    <div style={{ color: 'black' }}>  {store.allRecords[0].dlExpiryDate}</div>
    </Space.Compact>
    </Space>


  

        </Card>
      )}

      <Modal
        title="Driving License Details"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <LicenseDetailsForm
          recordId={openRecordId}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default LicenseDetailsList;
