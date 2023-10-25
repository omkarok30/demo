import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Radio, Row, Upload, Select, notification, Tabs, Descriptions, Tag } from 'antd';
import { When } from 'react-if';
import Meta from 'antd/lib/card/Meta';
import * as modelEmployeeQualificationDetails from '@/models/Employee/EmployeeQualification';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeQualificationDetails } from '@/store/employee/useEmployeeQualificationDetails';
import { UploadOutlined } from '@ant-design/icons';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';

import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';
const levelOfEducation = todoLookUps.getState().levelOfEducation;
const graduationYear = todoLookUps.getState().graduationYear;
import { UploadFileStatus } from 'antd/lib/upload/interface';
import MainHeader from '../../MainHeader';
import QualificationDetailsFormXEdit from '../form/editX';
import QualificationDetailsFormXIIEdit from '../form/exitXII';
import QualificationDetailsFormDiplomaEdit from '../form/editDiploma';
import QualificationDetailsFormVocationalEdit from '../form/editVocational';
import QualificationDetailsFormUGEdit from '../form/editUg'
import QualificationDetailsFormPGEdit from '../form/editPg';
import QualificationDetailsFormPhdEdit from '../form/editPhd';
import QualificationDetailsFormPostDocEdit from '../form/editPostDoc';
const QualificationDetailsFormEdit = () => {
  const { id, empId } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeQualificationDetails.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const renderers = {
    departmentId: (value: string) => <DepartmentAsText value={value} />
  };

  const storeEmployeeQualificationDetails = useEmployeeQualificationDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

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

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();
  const [educationLevel, setEducationLevel] = useState('');
  React.useEffect(() => {
    storeEmployeeQualificationDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeQualificationDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeEmployeeQualificationDetails.current);
    console.log("printlevelofeducation", storeEmployeeQualificationDetails.current.levelOfEducation)
    setEducationLevel(storeEmployeeQualificationDetails.current.levelOfEducation)
  }, [storeEmployeeQualificationDetails.current]);


  React.useEffect(() => {
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
          const record = await storeEmployeeQualificationDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.firstName}` });
          }
        }
        else {
          const record = await storeEmployeeQualificationDetails.updateRecord(id, values);
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

  const headerLabel = isNew ? 'Add Qualification' : 'Update Qualification Details';

  const getFile = (e: UploadFileStatus) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    //  return e && e.fileList;
  };

  const handleChange = (value: string) => {
    console.log(`selectedvaluevalue ${value}`);
    setEducationLevel(value)
  };

  return (
    <div className='layout-main-content'>
      <MainHeader />
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          // actions={[
          //   <Affix offsetBottom={12}>
          //     <Form.Item>
          //       <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving} style={{ marginRight: 10 }}>
          //         Submit
          //       </Button>
          //       <Button type="default" disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
          //         Reset
          //       </Button>
          //     </Form.Item>
          //   </Affix>,
          // ]}
        >
          <Row className="justify-center">
            <Col className='w-md'>
              <When condition={!isNew}>
                {() => (<>
                  <Form.Item name="levelOfEducation" label="Qualification" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }} disabled
                      placeholder="Select a option and change input text above"
                      allowClear
                      onChange={handleChange}
                      options={levelOfEducation}
                    />
                  </Form.Item>
                  {educationLevel === 'X' && <QualificationDetailsFormXEdit empId={empId} />}
                  {educationLevel === 'XII' && <QualificationDetailsFormXIIEdit empId={empId} />}
                  {educationLevel === 'Diploma' && <QualificationDetailsFormDiplomaEdit empId={empId} />}
                  {educationLevel === 'Vocational' && <QualificationDetailsFormVocationalEdit empId={empId} />}
                  {educationLevel === 'UG' && <QualificationDetailsFormUGEdit empId={empId} />}
                  {educationLevel === 'PG' && <QualificationDetailsFormPGEdit empId={empId} />}
                  {educationLevel === 'PH.D' && <QualificationDetailsFormPhdEdit empId={empId} />}
                  {educationLevel === 'Post Doc' && <QualificationDetailsFormPostDocEdit empId={empId} />}

                  {/* <Form.Item name="levelOfEducation" label="Qualification" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="percentage" label="Percentage/CGPA" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="passingYear" label="Graduating Year" required rules={schemaRules} style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Select style={{ textTransform: 'uppercase' }}
                      placeholder="Select a option and change input text above"
                      allowClear
                      options={graduationYear}
                    />
                  </Form.Item>
                  <Form.Item name="collegeName" label="School/College Name" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>
                  <Form.Item name="universityName" label="University Board" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Input style={{ textTransform: 'uppercase' }} />
                  </Form.Item>

                  <Form.Item rules={schemaRules} name="certificateDocument" label="Upload Certificate" getValueFromEvent={getFile} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item> */}

                </>)}
              </When>

              <When condition={isNew}>
                <Form.Item name="levelOfEducation" label="Qualification" rules={schemaRules} required style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }}>
                  <Select style={{ textTransform: 'uppercase' }}
                    placeholder="Select a option and change input text above"
                    allowClear
                    onChange={handleChange}
                    options={levelOfEducation}
                  />
                </Form.Item>
                {educationLevel === 'X' && <QualificationDetailsFormXEdit empId={empId} />}
                {educationLevel === 'XII' && <QualificationDetailsFormXIIEdit empId={empId} />}
                {educationLevel === 'Diploma' && <QualificationDetailsFormDiplomaEdit empId={empId} />}
                {educationLevel === 'Vocational' && <QualificationDetailsFormVocationalEdit empId={empId} />}
                {educationLevel === 'UG' && <QualificationDetailsFormUGEdit empId={empId} />}
                {educationLevel === 'PG' && <QualificationDetailsFormPGEdit empId={empId} />}
                {educationLevel === 'PH.D' && <QualificationDetailsFormPhdEdit empId={empId} />}
                {educationLevel === 'Post Doc' && <QualificationDetailsFormPostDocEdit empId={empId} />}
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>);
};

export default QualificationDetailsFormEdit;
