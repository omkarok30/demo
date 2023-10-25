import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Divider, Table, Typography } from 'antd';
import { useSportsDetails } from '@/store/admissions/ExtraCurricularActivities/useSportsDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelSportsEventDetails from '@/models/admissions/studentRecords/ExtraCurricularActivities/extraCurricularSports';
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
  country: (value: string) => (
    <OptionAsText value={value} fieldName="country" />
  ),
  sportType: (value: string) => (
    <OptionAsText value={value} fieldName="sportType" />
  ),
  considerForAccredation: (value: string) => (
    <OptionAsText value={value} fieldName="considerForAccredation" />
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

const SportActivitiesList = () => {
  const { id } = useParams();
  const { Title } = Typography;

  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const storeSportsEventDetails = useSportsDetails((state: any) => ({
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
      storeSportsEventDetails.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    storeSportsEventDetails.getRecords(id);
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelSportsEventDetails.columns();

    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  return (
    <>
      <Divider orientation="left">
        <Title level={5}>Sports Details</Title>
      </Divider>
      <Table
        bordered
        columns={columns}
        dataSource={storeSportsEventDetails.allRecords}
        scroll={{ x: 300 }}
      />
    </>
  );
};

export default SportActivitiesList;
