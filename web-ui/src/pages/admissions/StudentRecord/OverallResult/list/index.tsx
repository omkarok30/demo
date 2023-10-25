import React, { useState } from 'react';
import { Button, Card, Modal, Table } from 'antd';

import { ColumnsType } from 'antd/lib/table';
import OverallResultForm from '../form';
import * as modal from '@/models/admissions/studentRecords/overallResultDetails';
import { useOverallResult } from '@/store/admissions/useOverallResultDetails';

import { useSettings } from '@/store/settings/useSettings';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { attachRenderer } from '@/utils/tableExtras';

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
  showAllFeilds?: boolean;
}

const renderers = {
  sem1Status: (value: string) => (
    <OptionAsText value={value} fieldName="sem1Status" />
  ),
  sem2Status: (value: string) => (
    <OptionAsText value={value} fieldName="sem2Status" />
  ),
  className: (value: string) => (
    <OptionAsText value={value} fieldName="className" />
  ),
  overallResult: (value: string) => (
    <OptionAsText value={value} fieldName="sem2Status" />
  ),
};

const OverallResultList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openRecordId, setOpenRecordDetails] = useState('');
  const [recordType, setRecordType] = useState(false);

  const store = useOverallResult((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleActionClick = ({
    action,
    record,
    showAllFeilds,
  }: ActionProps) => {
    if (action === 'edit') {
      setOpenRecordDetails(record.id);
      setRecordType(showAllFeilds!);
      showModal();
    }
  };

  React.useEffect(() => {
    fetchSettings();
    store.getRecords();
  }, []);

  const freezeRecord = (id: string) => {
    // eslint-disable-next-line no-console
    console.log('freezing record', id);
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modal.columns();
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        if (record.freezed === 'false') {
          return [
            <Button type="primary" onClick={() => freezeRecord(record.id)}>
              Freeze
            </Button>,
            <Button
              type="link"
              onClick={() =>
                handleActionClick({
                  action: 'edit',
                  record,
                  showAllFeilds: false,
                })
              }
            >
              Sem1
            </Button>,
            <Button
              type="link"
              onClick={() =>
                handleActionClick({
                  action: 'edit',
                  record,
                  showAllFeilds: true,
                })
              }
            >
              Overall
            </Button>,
          ];
        }
        else {
          return [
            <Button type="primary" disabled={true}>
              Freezed
            </Button>,
          ];
        }
      },
    });

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Overall Result">
        <Table
          bordered
          columns={columns}
          dataSource={store.allRecords}
          scroll={{ x: 300 }}
        />
      </Card>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <OverallResultForm
          showAllFeilds={recordType}
          recordId={openRecordId}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default OverallResultList;
