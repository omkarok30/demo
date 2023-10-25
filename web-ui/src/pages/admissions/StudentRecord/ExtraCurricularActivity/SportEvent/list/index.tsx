import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Divider, Table, Typography } from 'antd';
import { When } from 'react-if';
import SportEventDetailsForm from '../form';
import { useSportsDetails } from '@/store/admissions/ExtraCurricularActivities/useSportsDetails';
import { useSettings } from '@/store/settings/useSettings';
import * as modelSportsEventDetails from '@/models/admissions/studentRecords/ExtraCurricularActivities/extraCurricularSports';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { EditIcon } from '@/components/Icons/EditIcon';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';

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
  const [technicalprops, setTechnicalprops] = React.useState({
    open: false,
    id: '',
    studentId: '',
  });
  const technicalOk = (studentId: string, _values: any) => {
    setTechnicalprops({ ...technicalprops, open: false, id: '', studentId: '' });
  };
  const technicalCancel = () => {
    setTechnicalprops({ ...technicalprops, open: false, id: '', studentId: '' });
  };

  const editdetails = (editid: any) => {
    setTechnicalprops({
      ...technicalprops,
      open: true,
      studentId: `${id}`,
      id: editid,
    });
  };

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

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <span>
          <Button
            type="link"
            onClick={() => editdetails(`${record?.id}`)}

          >
            <EditIcon/>
          </Button>
          <Button
            type="link"
            style={{ color: 'red' }}
            onClick={() =>
              handleActionClick({
                action: 'delete',
                record,
                activityName: 'sport',
              })
            }
          >
            <DeleteIcon/>
          </Button>
        </span>,
      ],
    });

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
        <When condition={technicalprops.open === true}>
        {() => (
          <SportEventDetailsForm
            {...technicalprops}
            handleOk={technicalOk}
            handleCancel={technicalCancel}
          />
        )}
      </When>
    </>
  );
};

export default SportActivitiesList;
