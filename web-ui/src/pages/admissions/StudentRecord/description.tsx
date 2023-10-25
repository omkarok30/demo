import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Tabs } from 'antd';

import { useBasicDetails } from '@/store/admissions/useBasicDetails';
import { useSettings } from '@/store/settings/useSettings';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';


const StudentDescription = () => {
  const { studentId } = useParams();
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }),
  );
  React.useEffect(() => {
    fetchSettings();
    storeBasicDetails.getRecord(studentId);
  }, []);

  return (
    <div className="layout-main-content">
        <Descriptions layout="vertical">
          <Descriptions.Item label="Student Name">{storeBasicDetails.current.lastName} {storeBasicDetails.current.firstName} {storeBasicDetails.current.middleName}</Descriptions.Item>
          <Descriptions.Item label="Program"><ProgramAsText value={storeBasicDetails.current.programId} />{ }</Descriptions.Item>
          <Descriptions.Item label="User Id">{storeBasicDetails.current.scholarNumber}</Descriptions.Item>
        </Descriptions>
      <br />
    </div>
  );
};

export default StudentDescription;
