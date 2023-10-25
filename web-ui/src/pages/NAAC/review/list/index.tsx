import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

import { When } from 'react-if';
import style from '@/pages/NAAC/index.module.less';
import ReviewEdit from '@/pages/NAAC/review/form';
import { useReview } from '@/store/NAAC/Review/useReview';
import * as modelReview from '@/models/NAAC/review/review';
import { useSettings } from '@/store/settings/useSettings';
import { UserNameAsText } from '@/components/Renderers/UserNameAsText';
import { attachRenderer } from '@/utils/tableExtras';

export interface IReviewType {
  criteria: any;
  reviewType: string;
  title: string;
  year: any;
}

const renderers = {
  reviewerId: (value: string) => <UserNameAsText value={value} />,
};

const Review = ({ criteria, reviewType, title, year }: IReviewType) => {
  const { allRecords, externalData, internalData, getRecords } = useReview((state: any) => ({
    allRecords: state.allRecords,
    externalData: state.externalData,
    internalData: state.internalData,
    getRecords: state.getRecords,
  }));
  const settings = useSettings((state: any) => state.byKeys);

  const modalTitle
    = reviewType.toLocaleLowerCase() === 'internal'
      ? 'Internal Review Details'
      : 'External Review Details';
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [selectedRecord, setRecordId] = useState('');

  const addReview = () => {
    setAddEditModalOpen(true);
    setRecordId('new');
  };

  const handleOk = () => {
    getRecords();
    setAddEditModalOpen(false);
    setRecordId('');
  };
  const handleCancel = () => {
    setAddEditModalOpen(false);
    setRecordId('');
  };

  React.useEffect(() => {
    if (year) {
      getRecords(year, '1.1.1', 'aqar');
    }
  }, [year]);

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      setAddEditModalOpen(true);
      setRecordId(record.id);
    }
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelReview.columns(settings);
    let statusCol = { ...cols[cols.length - 1] };
    statusCol = {
      ...statusCol,
      render: (_, record) => [
        <Button
          type="primary"
          ghost
          size='small'
          onClick={() => handleActionClick({ action: 'edit', record })}
        >
          {record.status}
        </Button>,
      ],
    };
    cols[cols.length - 1] = statusCol;
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <>
      <div style={{ marginBottom: '10px', marginTop: '15px' }}>
        <span className={style.text} style={{ marginRight: '10px' }}>
          {modalTitle}
        </span>
        {
          (reviewType.toLocaleLowerCase() === 'internal' && internalData.length === 0) && <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => addReview()}
          >
            Add Review
          </Button>
        }
        {
          (reviewType.toLocaleLowerCase() === 'external' && externalData.length === 0) && <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => addReview()}
          >
            Add Review
          </Button>
        }

      </div>
      {allRecords && <Table
        bordered
        columns={columns}
        dataSource={reviewType.toLocaleLowerCase() === 'internal' ? internalData : externalData}
      />}
      <When condition={isAddEditModalOpen === true}>
        {() => (
          <ReviewEdit
            recordId={selectedRecord}
            open={isAddEditModalOpen}
            criteria={criteria}
            reviewType={reviewType}
            handleOk={handleOk}
            handleCancel={handleCancel}
            title={title}
            year={year}
          />
        )}
      </When>
    </>
  );
};

export default Review;
