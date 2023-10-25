import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Divider, Table, Typography } from 'antd';
import { useExtendedSocialActivity } from '@/store/admissions/ExtraCurricularActivities/useExtendedSocialActivity';
import { useSettings } from '@/store/settings/useSettings';
import * as modelExtendedSocialActivity from '@/models/admissions/studentRecords/ExtraCurricularActivities/extendedSocialActivity';
import { attachRenderer } from '@/utils/tableExtras';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { DeleteIcon } from '@/components/Icons/DeleteIcon';
import { EditIcon } from '@/components/Icons/EditIcon';
import { When } from 'react-if';
import ExtendedSocialActivityForm from '../form';

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
  organizingCollaboratingAgency: (value: string) => (
    <OptionAsText value={value} fieldName="organizingCollaboratingAgency" />
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

const ExtendedSocialActivitiesList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Title } = Typography;

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const store = useExtendedSocialActivity((state: any) => ({
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
    store.getRecords(id);
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
    let cols = modelExtendedSocialActivity.columns();

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
    <div>
      <Divider orientation="left">
        <Title level={5}>Extended/Social Activities Details</Title>
      </Divider>
      <Table
        bordered
        columns={columns}
        dataSource={store.allRecords}
        scroll={{ x: 300 }}
      />
       <When condition={technicalprops.open === true}>
        {() => (
          <ExtendedSocialActivityForm
            {...technicalprops}
            handleOk={technicalOk}
            handleCancel={technicalCancel}
          />
        )}
      </When>
      </div>
    </>
  );
};

export default ExtendedSocialActivitiesList;
