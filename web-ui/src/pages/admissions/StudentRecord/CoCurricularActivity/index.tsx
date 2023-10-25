import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Divider, Row, Select } from 'antd';
import { When } from 'react-if';
import TechnicalDetails from './TechnicalDetails/list';
import PublicationDetails from './PublicationDetails/list';
import AddOnCertificateDetails from './AddOnCertificateDetails/list';
import Workshopdetails from './WorkshopDetails/list';
import IndustrialTrainingDetails from './IndustrialTrainingDetails/list';
import TechnicalDetailsForm from './TechnicalDetails/form';
import PublicationDetailsForm from './PublicationDetails/form';
import AddOnCertificateForm from './AddOnCertificateDetails/form';
import WorkshopDetailsForm from './WorkshopDetails/form';
import IndustrialTrainingDetailsForm from './IndustrialTrainingDetails/form';
import { todoLookUps } from '@/store/todoLookUps';

const CoCurricularActivity = () => {
  const optionsTypeOfEvent = todoLookUps.getState().coCurricularActivity;
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

  const [technicalprops, setTechnicalprops] = React.useState({
    open: false,
    id: '',
    studentId: '',
    event: '',
  });
  const technicalOk = (studentId: string, _values: any) => {
    setTechnicalprops({
      ...technicalprops,
      open: false,
      id: '',
      studentId: '',
      event: '',
    });
  };
  const technicalCancel = () => {
    setTechnicalprops({
      ...technicalprops,
      open: false,
      id: '',
      studentId: '',
      event: '',
    });
  };
  const onActivityChange = (value: any) => {
    value && setActivity(value.label);
    value && setUrlParam(value.key);
  };
  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Row>
          <Col>
            Type of Activity:
            <Select
              labelInValue
              style={{ width: 400 }}
              options={optionsTypeOfEvent}
              onChange={onActivityChange}
              defaultValue={{
                value: 'techincal_details',
                label: 'Technical Event',
              }}
            />
          </Col>
        </Row>
        <Divider></Divider>
        {activity && (
          <Row justify="space-evenly" key="extra-curricular-header">
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  setTechnicalprops({
                    ...technicalprops,
                    open: true,
                    studentId: `${id}`,
                    id: 'new',
                    event: `${urlParam}`,
                  });
                }}
              >
                Add {activity} Details
              </Button>
            </Col>
          </Row>
        )}

        <When
          condition={
            technicalprops.open === true
            && technicalprops.event === 'technical_details'
          }
        >
          {() => (
            <TechnicalDetailsForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>

        <When
          condition={
            technicalprops.open === true && urlParam === 'workshop_details'
          }
        >
          {() => (
            <WorkshopDetailsForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>

        <When
          condition={
            technicalprops.open === true
            && urlParam === 'industrial_training_details'
          }
        >
          {() => (
            <IndustrialTrainingDetailsForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>

        <When
          condition={
            technicalprops.open === true && urlParam === 'publication_details'
          }
        >
          {() => (
            <PublicationDetailsForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>

        <When
          condition={
            technicalprops.open === true
            && urlParam === 'addoncertificate_details'
          }
        >
          {() => (
            <AddOnCertificateForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>
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
