import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Tabs, notification } from 'antd';
import BasicDetails from '../../BasicDetails/form/edit';
import PersonalDetails from '../../PersonalDetails/form/edit';
import AddressDetails from '../../Address/form/edit';
import EmployeePositionsList from '../../EmployeePositions/list/index';
import EmployeeJobHistoryList from '../../EmployeeJobHistory/list';
import QualificationDetailsList from '../../QualificationDetails/list';
import EmployeeTechnicalSkillsList from '../../TechnicalSkils/list';
import AchievementList from '../../EmployeeAchievement/list';
import ExperienceList from '../../EmployeeExperience/list';
import EmployeeDetailsActivity from '../../DetailsOfActivity/index';
import EmployeeRelievingDetailsList from '../../EmployeeRelievingDetails/list';
import MainHeader from '../../MainHeader';
import EmployeeDeputationList from '../../Deputation/list';
import GuideshipDetails from '../../EmployeeGuideship/form/edit';
import EmployeeDocument from '@/pages/Employee/EmployeeDocument/list';
import Emergency from '@/pages/Employee/Emergency/list';
import Paymentmode from '@/pages/Employee/PaymentMode/list'; 
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';
import { useGlobalState } from '@/store/global';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import * as modelEmployeeDetails from '@/models/Employee/EmployeeDetails';
import TODO from '@/pages/TODO';
import MainProgram from '../../EmployeeMainProgram/list';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;

const EmployeeDetailsFormEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const { state } = useLocation();
  const { activeTab } = state;
  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const [isactiveTab, setActiveTab] = React.useState('basic_details');
  const storeEmployeeDetails = useEmployeeDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (activeTab) {
      setActiveTab(activeTab);
    }
    else {
      setActiveTab('basic_details');
    }
    storeEmployeeDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeDetails.current);
  }, [storeEmployeeDetails.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeEmployeeDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.firstName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Add Employee Details' : 'Edit Employee Details';

  const tabPages = [
    { label: 'Basic Details', key: 'basic_details', children: <BasicDetails /> },
    { label: 'Personal Details', key: 'personal_details', children: <PersonalDetails /> },
    { label: 'Address', key: 'address', children: <AddressDetails /> },
    { label: 'Positions', key: 'positions', children: <EmployeePositionsList /> },
    { label: 'Job History', key: 'job_history', children: <EmployeeJobHistoryList /> },
    { label: 'Main Program', key: 'main_program', children: <MainProgram /> },
    { label: 'Qualification Details', key: 'qualification_details', children: <QualificationDetailsList /> },
    { label: 'Technical Skills', key: 'technical_skills', children: <EmployeeTechnicalSkillsList /> },
    { label: 'Achievement', key: 'achievement', children: <AchievementList /> },
    { label: 'Experience', key: 'experience', children: <ExperienceList /> },
    { label: 'Details Of Activities', key: 'details_of_activities', children: <EmployeeDetailsActivity /> },
    { label: 'Relieving Details', key: 'relieving_details', children: <EmployeeRelievingDetailsList /> },
    { label: 'Deputation', key: 'deputation', children: <EmployeeDeputationList /> },
    { label: 'Guideship', key: 'guideship', children: <GuideshipDetails /> },
    { label: 'Employee Document ', key: 'Employeedocument', children: <EmployeeDocument /> },
    { label: 'Emergency ', key: 'Emergency', children: <Emergency /> },
    { label: 'Payment Mode ', key: 'Paymentmode', children: <Paymentmode /> },
  ];

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className='layout-main-content'>
      <Row justify="end" style={{ paddingBottom: 10, backgroundColor: 'white' }}>
        <Col>
          <Button type="text" style={{ color: 'red', fontSize: 16 }}>Note : * Indicates Mandatory Fields</Button>
        </Col>
      </Row>
      <MainHeader />
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}>
          <Tabs items={tabPages} tabPosition={'left'} onChange={onChange} activeKey={isactiveTab} />
        </Card>
      </Form>
    </div>);
};

export default EmployeeDetailsFormEdit;
