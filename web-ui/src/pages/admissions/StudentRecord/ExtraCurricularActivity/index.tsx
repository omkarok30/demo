import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Row, Select } from 'antd';
import { When } from 'react-if';
import SportActivitiesList from './SportEvent/list';
import CulturalActivitiesList from './CulturalEvent/list';
import ExtendedSocialActivitiesList from './ExtendedSocialActivity/list';
import ExtensionActivityList from './ExtensionActivity/list';
import CulturalEventDetailsForm from './CulturalEvent/form';
import { todoLookUps } from '@/store/todoLookUps';
import SportEventDetailsForm from './SportEvent/form';
import ExtensionActivityForm from './ExtensionActivity/form';
import ExtendedSocialActivityForm from './ExtendedSocialActivity/form';

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

  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Row style={{ padding: '10px' }}>
          <Col>
            Type of Activity:
            <Select
              labelInValue
              style={{ width: 400 }}
              options={optionsTypeOfEvent}
              onChange={onActivityChange}
              defaultValue={{ value: 'sport', label: 'Sport' }}
            />
          </Col>
        </Row>
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
          condition={technicalprops.open === true && urlParam === 'cultural'}
        >
          {() => (
            <CulturalEventDetailsForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>
        <When
          condition={technicalprops.open === true && urlParam === 'sport'}
        >
          {() => (
            <SportEventDetailsForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>
        <When
          condition={technicalprops.open === true && urlParam === 'extended-social-activity'}
        >
          {() => (
            <ExtendedSocialActivityForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>
        <When
          condition={technicalprops.open === true && urlParam === 'extension-activity'}
        >
          {() => (
            <ExtensionActivityForm
              {...technicalprops}
              handleOk={technicalOk}
              handleCancel={technicalCancel}
            />
          )}
        </When>

        <SportActivitiesList />
        <CulturalActivitiesList />
        <ExtendedSocialActivitiesList />
        <ExtensionActivityList />
      </Card>
    </div>
  );
};

export default ExtraCurricularActivities;
