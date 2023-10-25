import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'antd';
import CulturalActivitiesList from '@/pages/studentcenter/studentprofile/Extracurricularactivities/culturalEvent/list';
import ExtendedSocialActivitiesList from '@/pages/studentcenter/studentprofile/Extracurricularactivities/extendedactivities/list';
import ExtensionActivityList from '@/pages/studentcenter/studentprofile/Extracurricularactivities/ExtensionActivities/form';
import SportActivitiesList from '@/pages/studentcenter/studentprofile/Extracurricularactivities/sportsEvent/list';
import { todoLookUps } from '@/store/todoLookUps';

const ExtraCurricularActivities = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const optionsTypeOfEvent = todoLookUps.getState().typeOfEvent;

  const [activity, setActivity] = useState('');
  const [urlParam, setUrlParam] = useState('');

  const navigateToNewForm = () => {
    navigate(`../extra-curricular/${urlParam}/new/${id}`);
  };

  React.useEffect(() => {
    setActivity('Sport');
    setUrlParam('sport');
  }, []);

  const onActivityChange = (value: any) => {
    value && setActivity(value.label);
    value && setUrlParam(value.key);
  };

  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Extra-Curricuar Activities">
        <SportActivitiesList />
        <CulturalActivitiesList />
        <ExtendedSocialActivitiesList />
        <ExtensionActivityList />
      </Card>
    </div>
  );
};

export default ExtraCurricularActivities;
