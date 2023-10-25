import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, DatePicker, Radio, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelEmployeeAchievement from '@/models/Employee/EmployeeAchievement';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeAchievement } from '@/store/employee/useAchievement';
import { UploadOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
const yesNo = todoLookUps.getState().yesNo;
const gender = todoLookUps.getState().gender;
const salutation = todoLookUps.getState().salutation;
import BasicDetails from '../../BasicDetails/form/edit';
import PersonalDetails from '../../PersonalDetails/form/edit';
import AddressDetails from '../../Address/form/edit';
import EmployeePositionsList from '../../EmployeePositions/list/index';
import EmployeeJobHistoryList from '../../EmployeeJobHistory/list';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
const levelOfEducation = todoLookUps.getState().levelOfEducation;
const graduationYear = todoLookUps.getState().graduationYear;
const level = todoLookUps.getState().level;
const experienceType = todoLookUps.getState().experienceType;
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '../../MainHeader';
const EmployeeAchievementFormEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeAchievement.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };


  const storeEmployeeAchievement = useEmployeeAchievement(
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
    storeEmployeeAchievement.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeAchievement.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeAchievement.current);
  }, [storeEmployeeAchievement.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeAchievement.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.technology}` });
          }
        }
        else {
          const record = await storeEmployeeAchievement.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.technology}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Add Experience' : 'Update Experience';

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };
  return (
    <div className='layout-main-content'>
      <MainHeader />
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving} style={{ marginRight: 10 }}>
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className='w-md'>
              <When condition={!isNew}>
                {() => (<>
                  <Form.Item name="organization" label="Name of Organization" required rules={schemaRules}>
                    <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : SVERIS COLLEGE OF ENGINEERING'} />
                  </Form.Item>
                  <Form.Item name="typeOfExperience" label="Type of Experience" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select a option and change input text above"
                      allowClear
                      options={experienceType} />
                  </Form.Item>
                  <Form.Item name="joiningDate" label="From Date" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                  </Form.Item>
                  <Form.Item name="leavingDate" label="To Date" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                  </Form.Item>
                  <Form.Item name="joiningDesignation" label="Designation on Joining" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : ASSISTANT PROFESSOR'} />
                  </Form.Item>
                  <Form.Item name="leavingDesignation" label="Designation while Leaving" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : ASSISTANT PROFESSOR'} />
                  </Form.Item>
                  <Form.Item name="salary" label="Last Month Gross Salary (Rs.)" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : 12500'} />
                  </Form.Item>
                  <Form.Item name="achievments" label="Achievements if Any" required rules={schemaRules}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item rules={schemaRules} name="experienceDocument" label="Upload Experience Certificate" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item rules={schemaRules} name="releavingDocument" label="Upload Relieving Certificate" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Choose File</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="organization" label="Name of Organization" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : SVERIS COLLEGE OF ENGINEERING'} />
                </Form.Item>
                <Form.Item name="typeOfExperience" label="Type of Experience" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select a option and change input text above"
                    allowClear
                    options={experienceType} />
                </Form.Item>
                <Form.Item name="joiningDate" label="From Date" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item>
                <Form.Item name="leavingDate" label="To Date" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <DatePicker className="w-100%" format={global.displayDateFormat} placeholder={'PLEASE SELECT FROM CALENDAR'} />
                </Form.Item>
                <Form.Item name="joiningDesignation" label="Designation on Joining" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : ASSISTANT PROFESSOR'} />
                </Form.Item>
                <Form.Item name="leavingDesignation" label="Designation while Leaving" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : ASSISTANT PROFESSOR'} />
                </Form.Item>
                <Form.Item name="salary" label="Last Month Gross Salary (Rs.)" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} placeholder={'FOR EXAMPLE : 12500'} />
                </Form.Item>
                <Form.Item name="achievments" label="Achievements if Any" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item rules={schemaRules} name="experienceDocument" label="Upload Experience Certificate" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item rules={schemaRules} name="releavingDocument" label="Upload Relieving Certificate" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Choose File</Button>
                  </Upload>
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>);
};

export default EmployeeAchievementFormEdit;
