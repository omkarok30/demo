import { DeleteFilled, DownloadOutlined, EditFilled, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TableDataWithSelection = ({ columns, currRecord, getData, modal }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const startRefresh = () => {
    getData(yearId);
  };

  const hasSelected = useMemo(() => {
    return selectedRowKeys.length > 0;
  }, [selectedRowKeys]);
  return (
    <>
      {
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
          <Space>
            <Button type="primary" shape="round" title="Download Report" onClick={modal}>Import the details</Button>
            <Button type="primary" icon={<DownloadOutlined />} shape="round" title="Download Report">Download Report</Button>
            <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => navigate(`../addRecord/?year=${yearId}`)} shape="round" title="Add Record">Add Record</Button>
          </Space>
        </div>
      }

      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" icon={<ReloadOutlined />} onClick={startRefresh} title='reload' />

          <Button type="primary" title='Edit' onClick={() => navigate(`../editIndividual/?year=${yearId}&id=${selectedRowKeys}`)} icon={<EditFilled />} disabled={!hasSelected} />
          <Button danger title='Delete' icon={<DeleteFilled />} disabled={!hasSelected} />

        </Space>
      </div>
      <Table bordered rowSelection={rowSelection} rowKey={record => record.id} columns={columns} dataSource={currRecord} />
    </>
  );
};

export default TableDataWithSelection;
