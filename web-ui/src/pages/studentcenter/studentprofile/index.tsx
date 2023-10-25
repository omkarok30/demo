import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Tabs } from 'antd';

import PersonalDetails from '@/pages/studentcenter/studentprofile/PersonalDetails/form';
import CoCurricularActivity from '@/pages/studentcenter/studentprofile/CoCurricularDetails/index';
import ExtracurricularActivity from '@/pages/studentcenter/studentprofile/Extracurricularactivities/index';
import IssuedDocuments from '@/pages/studentcenter/studentprofile/IssuedDocuments/list';
import ClassDetails from '@/pages/studentcenter/studentprofile/ClassDetails/list';

import TODO from '@/pages/TODO';
import { useBasicDetails } from '@/store/admissions/useBasicDetails';
import { useSettings } from '@/store/settings/useSettings';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';

const tabPages = [
  {
    label: 'Personal Details',
    key: 'personal-details',
    children: <PersonalDetails />,
  },
  {
    label: 'Class Details',
    key: 'class-details',
    children: <ClassDetails />,
  },
  {
    label: 'Attendance Insight',
    key: 'attendance-insight',
    children: <TODO />,
  },

  { label: 'Academics Insight', key: 'academics-insight', children: <TODO /> },
  {
    label: 'Co-curricular Activity',
    key: 'co-curricular-activity',
    children: <CoCurricularActivity />,
  },
  {
    label: 'Extra Aurricular Activity',
    key: 'extra-curricular-activity',
    children: <ExtracurricularActivity />,
  },
  {
    label: 'Issued Documents',
    key: 'issued-documents',
    children: <IssuedDocuments />,
  },
];

const StudentRecordTabs = () => {
  const { id } = useParams();
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }));
  React.useEffect(() => {
    fetchSettings();
    storeBasicDetails.getRecord(id);
  }, []);

  return (
    <div className="layout-main-content">
      <Card>
        <Descriptions title="Student Information" layout="vertical">
          <Descriptions.Item label="Student Name">
            {storeBasicDetails.current.lastName}{' '}
            {storeBasicDetails.current.firstName}{' '}
            {storeBasicDetails.current.middleName}
          </Descriptions.Item>
          <Descriptions.Item label="Program">
            <ProgramAsText value={storeBasicDetails.current.programId} />
            {}
          </Descriptions.Item>
          <Descriptions.Item label="User Id">
            {storeBasicDetails.current.scholarNumber}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <br />
      <Card>
        <Tabs items={tabPages} tabPosition="left" />
      </Card>
    </div>
  );
};

export default StudentRecordTabs;
