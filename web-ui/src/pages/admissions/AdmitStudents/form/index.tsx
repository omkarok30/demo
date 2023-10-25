import React from 'react';
import _ from 'lodash';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';

import { useStudentInfo } from '@/store/admissions/useStudentInfo';
import * as modelStudentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useGlobalState } from '@/store/global';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';

const optionsGender = todoLookUps.getState().gender;
const classNameOptions = todoLookUps.getState().className;

const AdmitStudentForm = () => {
  const global = useGlobalState((state: any) => state.default);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));

  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
    allRecords: state.allRecords,

  }));

  const storeAdmitStudent = useStudentInfo((state: any) => ({
    addRecord: state.addRecord,
  }));

  const optionsAcademicYear = React.useMemo(() => (storeAcademicYear.comboByName || []), [storeAcademicYear.comboByName]);

  React.useEffect(() => {
    settings.fetchSettings();
    storeAcademicYear.asOptions();
    storeProgramDetails.getRecords();
  }, []);

  const [optionRegisterTo, setOptionRegisterTo] = React.useState([{}]);
  const onProgramChange = (value: any) => {
    const record = (_.find(storeProgramDetails.allRecords, { id: value }));
    setOptionRegisterTo(classNameOptions.slice(0, record.programDuration));
  };

  const [form] = Form.useForm();

  const schemaRules = React.useMemo(() => schemaValidator(modelStudentInfo.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        await storeAdmitStudent.addRecord(values);
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  const headerLabel = 'Admit New Student (Manual)';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit}>Submit</Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item name="programId" label="Program" rules={schemaRules} required>
                <Select options={storeProgramDetails.optionsAllPrograms} onChange={onProgramChange} />
              </Form.Item>
              <Form.Item name="firstName" label="First Name" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="middleName" label="Middle Name" rules={schemaRules}>
                <Input />
              </Form.Item>
              <Form.Item name="lastName" label="Last Name" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="gender" label="Gender" rules={schemaRules} required>
                <Select options={optionsGender} />
              </Form.Item>
              <Form.Item name="email" label="Email ID" rules={schemaRules}>
                <Input type='email' />
              </Form.Item>
              <Form.Item name="mobileNo" label="Mobile Number" rules={schemaRules}>
                <Input />
              </Form.Item>
              <Form.Item name="className" label="Register In" rules={schemaRules} required>
                <Select options={optionRegisterTo} />
              </Form.Item>
              <Form.Item name="registrationYear" label="Registration Year" rules={schemaRules} required>
                <Select options={optionsAcademicYear} />
              </Form.Item>
              <Form.Item name="admissionDate" label="Date of Admission" rules={schemaRules} required>
                <DatePicker className="w-100%" format={global.displayDateFormat} />
              </Form.Item>

              <Typography.Title level={5}>Once student is created, it cannot be deleted.</Typography.Title>
              <Form.Item name="agreement" valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should confirm updates.')),
                  },
                ]}
              >
                <Checkbox>I confirm to create the above student.</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AdmitStudentForm;
