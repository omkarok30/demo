import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'antd';
import Workshopdetails from '@/pages/studentcenter/studentprofile/CoCurricularDetails/workshopDetails/list';
import IndustrialTrainingDetails from '@/pages/studentcenter/studentprofile/CoCurricularDetails/industrialTrainingDetails/list';
import AddOnCertificateDetails from '@/pages/studentcenter/studentprofile/CoCurricularDetails/AddoncerticateDetails/list';
import PublicationDetails from '@/pages/studentcenter/studentprofile/CoCurricularDetails/publicationEvent/list';
import TechnicalDetails from '@/pages/studentcenter/studentprofile/CoCurricularDetails/Technicaldetails/form';
import { todoLookUps } from '@/store/todoLookUps';

const CoCurricularActivity = () => {
  const optionsTypeOfEvent = todoLookUps.getState().typeOfActivity;
  const navigate = useNavigate();
  const { id } = useParams();

  const [activity, setActivity] = useState('');
  const [urlParam, setUrlParam] = useState('');

  const navigateToNewForm = () => {
    navigate(`../co-curricular/${urlParam}/new/${id}`);
  };
  React.useEffect(() => {
    setActivity('Technical Event');
    setUrlParam('technical_details');
  }, []);

  const onActivityChange = (value: any) => {
    value && setActivity(value.label);
    value && setUrlParam(value.key);
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false} title="Co-Curricuar Activities">
        <TechnicalDetails />
        <PublicationDetails />
        <AddOnCertificateDetails />
        <Workshopdetails />
        <IndustrialTrainingDetails />
      </Card>
    </div>
  );
};

export default CoCurricularActivity;
