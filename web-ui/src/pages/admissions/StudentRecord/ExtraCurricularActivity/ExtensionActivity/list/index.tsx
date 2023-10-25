import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Divider, Table, Typography } from 'antd';
import { useExtensionActivities } from '@/store/admissions/ExtraCurricularActivities/useExtensionActivities';
import * as modelExtensionActivity from '@/models/admissions/studentRecords/ExtraCurricularActivities/extensionActivity';
import { useSettings } from '@/store/settings/useSettings';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
import { EditIcon } from '@/components/Icons/EditIcon';
import ExtensionActivityForm from '../form';
import { When } from 'react-if';

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
  organizingCollaboratingAgency: (value: string) => (
    <OptionAsText value={value} fieldName="organizingCollaboratingAgency" />
  ),
  achievementAwardDetails: (value: string) => (
    <OptionAsText value={value} fieldName="achievementAwardDetails" />
  ),
  activityName: (value: string) => (
    <OptionAsText value={value} fieldName="activityName" />
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

const ExtensionActivityList = () => {
  const { id } = useParams();
  const { Title } = Typography;

  const navigate = useNavigate();

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const store = useExtensionActivities((state: any) => ({
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
      store.deleteRecord(record.id);
    }
  };

  React.useEffect(() => {
    fetchSettings();
    store.getRecords();
  }, []);
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
  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelExtensionActivity.columns();

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
                activityName: 'cultural',
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
        <Title level={5}>Extention Activity Details</Title>
      </Divider>
      <Table
        bordered
        columns={columns}
        dataSource={store.allRecords}
        scroll={{ x: 300 }}
      />
       <When condition={technicalprops.open === true}>
        {() => (
          <ExtensionActivityForm
            {...technicalprops}
            handleOk={technicalOk}
            handleCancel={technicalCancel}
          />
        )}
      </When>
    </>
  );
};

export default ExtensionActivityList;
