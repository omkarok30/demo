import { Button, Card, Divider, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined, EditFilled, ReloadOutlined } from '@ant-design/icons';
import { useCustomeAreaHook } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import * as modelCriteria623 from '@/models/NAAC/criteria6/criteria6_2_3';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const NaacCriteria623Areagovernace = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { areaRecords, getAllAreaGovernance } = useCustomeAreaHook(yearId);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const startRefresh = () => {
    getAllAreaGovernance(yearId);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria623.columns(settings);
    cols.push({
      title: 'Action',
      dataIndex: 'link',
      key: 'activity',
      render: (_, record) => {
        return <Button type='link' icon={<EditFilled />} onClick={() => navigate(`../editdetails/?year=${yearId}&id=${record.id}`)} title='Edit' />;
      },
    });
    return cols;
  }, [settings]);

  const hasSelected = useMemo(() => {
    return selectedRowKeys.length > 0;
  }, [selectedRowKeys]);

  return (
    <div className='layout-main-content'>

      <Card
        bordered={false}
        actions={[
          <Button onClick={() => navigate('../list')}>Back</Button>,
        ]}
      >
        <h3 style={{ margin: 0 }}>6.2.3. Implementation of e-governance in areas of operation</h3>
        <ol style={{ paddingLeft: '14px', fontWeight: 'bold' }}>
          <li>Administration</li>
          <li>Finance and Accounts</li>
          <li>Student Admission and Support</li>
          <li>Examination</li>
        </ol>
        <Divider />

        <h4 style={{ display: 'flex', width: '160px', justifyContent: 'space-between' }}>Academic Year: <YearAsText value={Number(yearId)} /></h4>

        {<div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
          <Button type="primary" icon={<DownloadOutlined />} shape="round" >Download Report</Button>
        </div>}

        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button type="primary" icon={<ReloadOutlined />} onClick={startRefresh} title='reload' />
            <Button type="primary" title='Edit' onClick={() => navigate(`../editdetails/?year=${yearId}&id=${selectedRowKeys}`)} icon={<EditFilled />} disabled={!hasSelected} />
          </Space>
        </div>

        <div style={{ marginBottom: 16 }}>

        </div>

        <Table rowSelection={rowSelection} rowKey={record => record.id} columns={columns} dataSource={areaRecords} />

      </Card>
    </div >
  );
};

export default NaacCriteria623Areagovernace;
