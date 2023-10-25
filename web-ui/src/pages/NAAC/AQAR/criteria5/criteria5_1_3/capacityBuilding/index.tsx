import { useMemo } from 'react';

import { Button, Card, Divider, Table } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { DownloadOutlined } from '@ant-design/icons';
import { useCustomSkillsHook } from '../../../radioButtonHooks';
import * as modelCriteria513 from '@/models/NAAC/RadioButton/radioButtonModel';
import { useSettings } from '@/store/settings/useSettings';

const NaacCriteria513Capacity = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('academicYearId');
  const settings = useSettings((state: any) => state.byKeys);

  const { yearLabel } = useCustomSkillsHook(yearId, '5.1.3');

  const PageTitle = '5.1.3. Capacity building and skills enhancement initiatives taken by the institution include the following 1. Soft skills 2. Language and communication skills 3. Life skills (Yoga, physical fitness, health and hygiene) 4. ICT/computing skills';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria513.columns(settings);
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        actions={[
          <Button onClick={() => navigate('../list')}>
            Back
          </Button>,
        ]}
      >
        <h3>{PageTitle}</h3>

        <Divider />

        <h3>Academic Year <b>{yearLabel}</b></h3>

        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
          <Button type="primary" icon={<DownloadOutlined />} shape="round" >Download Report</Button>
        </div>
        <Table columns={columns} bordered />
      </Card>
    </div >
  );
};

export default NaacCriteria513Capacity;
