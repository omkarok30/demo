import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Divider, Table, Typography } from 'antd';
import { useCulturalActivities } from '@/store/admissions/ExtraCurricularActivities/useCulturalActivities';
import { useSettings } from '@/store/settings/useSettings';
import * as modelCulturalEventDetails from '@/models/admissions/studentRecords/ExtraCurricularActivities/culturalEvent';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';

const renderers = {
  academicYear: (value: string) => (
    <OptionAsText value={value} fieldName="academicYear" />
  ),
  eventLevel: (value: string) => (
    <OptionAsText value={value} fieldName="eventLevel" />
  ),
  participationType: (value: string) => (
    <OptionAsText value={value} fieldName="participationType" />
  ),
  achievement: (value: string) => (
    <OptionAsText value={value} fieldName="achievement" />
  ),
};

interface ActionProps {
  action: string;
  record: {
    id: string;
  };
  activityName: string;
}

const CulturalActivitiesList = () => {
  const { id } = useParams();
  const { Title } = Typography;
  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeCulturalDetails = useCulturalActivities((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    deleteRecord: state.deleteRecord,
  }));

  const handleActionClick = ({ action, record, activityName }: ActionProps) => {
    if (action === 'edit') {
      navigate(`../extra-curricular/${activityName}/${record?.id}/${id}`, {
        state: { id: record?.id },
      });
    }
    else if (action === 'delete') {
      storeCulturalDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeCulturalDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelCulturalEventDetails.columns();

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <>
      <Divider orientation="left">
        <Title level={5}>Cultural Details</Title>
      </Divider>
      <Table
        bordered
        columns={columns}
        dataSource={storeCulturalDetails.allRecords}
        scroll={{ x: 300 }}
      />
    </>
  );
};

export default CulturalActivitiesList;
