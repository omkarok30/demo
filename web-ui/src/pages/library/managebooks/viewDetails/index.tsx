import { Button, Card, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'rc-table/lib/interface';

import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/store/settings/useSettings';
import { useManageLibrary } from '@/store/library/useManageLibrary';

const ViewDetails = () => {
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const storeManageBooks = useManageLibrary((state: any) => ({
    current: state.current,
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    getRecord: state.getRecord,
  }));
  const [data, setData] = useState([]);
  useEffect(() => {
    const data: any = [];
    data.push(storeManageBooks.current);
    setData(data);
  }, [storeManageBooks.current]);

  const navigate = useNavigate();
  const handleActionClick = ({ action, record }) => {
    storeManageBooks.getRecord(record.id);
    if (action === 'update') {
      navigate('/library/manageBooks/showBook');
    }
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      dataIndex: 'id',
      title: 'Sr.No',
    });
    cols.push({
      dataIndex: 'accessionNo',
      title: 'Accession Number',
    });
    cols.push({
      dataIndex: 'title',
      title: 'Title',
    });
    cols.push({
      dataIndex: 'author',
      title: 'Author',
    });
    cols.push({
      dataIndex: 'edition',
      title: 'Edition',
    });
    cols.push({
      dataIndex: 'location',
      title: 'Location',
    });

    cols.push({
      dataIndex: '',
      title: 'Action',
      render: (_, record) => [

          <Button
            type="primary"
            onClick={() => handleActionClick({ action: 'update', record })}>
            View/Update
          </Button>,
      ],
    });

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card title="Book Information">
        <Table
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  );
};

export default ViewDetails;
