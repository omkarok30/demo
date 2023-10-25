import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelEmployeeTechnicalSkills from '@/models/Employee/EmployeeTechnicalSkills';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeTechnicalSkills } from '@/store/employee/useEmployeeTechnicalSkills';
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
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '../../MainHeader';
const TechnicalSkillsFormEdit = () => {
  const { id,empId } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeTechnicalSkills.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };


  const storeEmployeeTechnicalSkills = useEmployeeTechnicalSkills(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  const storeEmployeeDetails = useEmployeeDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  React.useEffect(() => {
    storeEmployeeDetails.getRecord(empId);
    return () => {
      form.setFieldsValue({});
    };
  }, [empId]);

  React.useEffect(() => {
    if (storeEmployeeDetails.current.id !== empId) {
      return;
    }
    //form.setFieldsValue(storeEmployeeDetails.current);
  }, [storeEmployeeDetails.current]);

  
  React.useEffect(() => {
    storeEmployeeTechnicalSkills.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeTechnicalSkills.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeTechnicalSkills.current);
  }, [storeEmployeeTechnicalSkills.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeTechnicalSkills.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.technology}` });
          }
        }
        else {
          const record = await storeEmployeeTechnicalSkills.updateRecord(id, values);
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

  const headerLabel = isNew ? 'Add Technical Skill' : 'Update Technical Skill';

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };

  const nvaigateToPreviousPage = () => {
    navigate(`/employee/employee_details/edit/${empId}`, { state: { activeTab: 'technical_skills' } });
  }

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
                <Button type="default" onClick={nvaigateToPreviousPage} disabled={saveProgress.disableSubmit} loading={saveProgress.saving} style={{ marginRight: 10 }}>
                  Back
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className='w-md'>
              <When condition={!isNew}>
                {() => (<>
                  <Form.Item name="technology" label="Skill/Technology" rules={schemaRules} required style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="level" label="Level" required rules={schemaRules} style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select From Dropdown"
                      allowClear
                      options={level} />
                  </Form.Item>
                  <Form.Item name="details" label="Details" rules={schemaRules} style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                    <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                  </Form.Item>
                  <Form.Item rules={schemaRules} name="uploadDocument" label="Upload Document" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="technology" label="Skill/Technology" rules={schemaRules} required style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                  <Input style={{ textTransform: 'uppercase' }} />
                </Form.Item>
                <Form.Item name="level" label="Level" required rules={schemaRules} style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select From Dropdown"
                    allowClear
                    options={level} />
                </Form.Item>
                <Form.Item name="details" label="Details" rules={schemaRules} style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                  <Input.TextArea style={{ textTransform: 'uppercase' }} rows={3} />
                </Form.Item>
                <Form.Item rules={schemaRules} name="uploadDocument" label="Upload Document" getValueFromEvent={getFile} style={{ flex: 1, marginRight: 10,fontWeight:'bold' }}>
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>);
};

export default TechnicalSkillsFormEdit;
