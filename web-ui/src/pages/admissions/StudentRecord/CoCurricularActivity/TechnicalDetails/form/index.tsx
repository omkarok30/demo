import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  UploadProps,
  notification,
} from 'antd';
import { When } from 'react-if';
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import StudentDescriptionForActivity from '../../../studentDescription';
import { useGlobalState } from '@/store/global';

import * as modelTechnicalDetails from '@/models/admissions/studentRecords/TechnicalDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useTechnicalDetails } from '@/store/admissions/useTechnicalDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
import { useStudentInfo } from '@/store/admissions/useStudentInfo';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const TechnicalDetailsForm = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const isNew = id === 'new';
  const global = useGlobalState((state: any) => state.default);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelTechnicalDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));
  const storeStudentInfo = useStudentInfo((state: any) => ({
    getRecords: state.getRecords,
    optionsstudents: state.optionsstudents,
  }));
  // const optionsStudents = storeStudentInfo.optionsstudents.filter((item: any) => item.value !== studentId);
  const optionsStudents = storeStudentInfo.optionsstudents;
  const optionsPo = todoLookUps.getState().relevantPo;

  const optionsAcademicYear = React.useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );
  const optionsParticipationType = todoLookUps.getState().participationType;
  const optionsEventLevel = todoLookUps.getState().eventLevel;
  const optionsAcheivement = todoLookUps.getState().achievement;
  const optionCountry = todoLookUps.getState().country;
  const [isoutsideCountry, setisoutsideCountry] = useState(false);
  const [fields, setFields] = useState([{}]);

  const addDynamicFields = () => {
    const newInputObj = {};
    fields.splice(0, 0, newInputObj);
    setFields([...fields]);
    // const newOutsideCountry = { key: fieldslength, value: 'false' };
    // isoutsideCountry.splice(0, 0, newOutsideCountry);
    // setisoutsideCountry(true);
  };
  const removeDynamicFields = () => {
    if (fields.length !== 1) {
      fields.splice(-1);
      setFields([...fields]);
    }
  };
  const storeTechnicalDetails = useTechnicalDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeTechnicalDetails.getRecord(id);
    storeStudentInfo.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeTechnicalDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeTechnicalDetails.current);
  }, [storeTechnicalDetails.current]);
  const onOptionChange = (event: any) => {
    if (event === 'outsidecountry') {
      setisoutsideCountry(true);
    }
    else {
      setisoutsideCountry(false);
    }
  };

  const doOK = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeTechnicalDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.id}`,
            });
          }
        }
        else {
          const record = await storeTechnicalDetails.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.id}`,
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };

  const doCancel = () => {
    if (_.isFunction(handleCancel)) {
      handleCancel(studentId);
    }
  };

  const onFormSubmit = () => {};
  const props: UploadProps = {
    name: 'document',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        notification.success({
          message: 'Upload Successfull!',
          description: `${info.file.name} file uploaded successfully`,
        });
      }
      else if (info.file.status === 'error') {
        notification.error({
          message: 'Upload Successfull!',
          description: `${info.file.name} file uploaded failed`,
        });
      }
    },
  };

  const headerLabel = isNew
    ? 'Add Technical Event Details'
    : 'Edit Technical Event Details';

  return (
    <div className="layout-main-content">
      <Modal
        title={headerLabel}
        open={open}
        onOk={doOK}
        onCancel={doCancel}
        closable
        width={1000}
        centered
      >
        <Card bordered={false}>
          {' '}
          <StudentDescriptionForActivity></StudentDescriptionForActivity>
          <Form
            form={form}
            layout="vertical"
            disabled={saveProgress.disableForm}
          >
            <When condition={!isNew}>
              <Row className="justify-center">
                <Col className="w-md">
                  <Form.Item
                    name="academicYear"
                    label="Academic Year"
                    rules={schemaRules}
                    required
                  >
                    <Select options={optionsAcademicYear} />
                  </Form.Item>
                  <Form.Item
                    name="eventLevel"
                    label="Event Level"
                    rules={schemaRules}
                    required
                  >
                    <Select options={optionsEventLevel} />
                  </Form.Item>
                  <Form.Item
                    name="participationType"
                    label="Participation Type"
                    rules={schemaRules}
                    required
                  >
                    <Select
                      options={optionsParticipationType}
                      onChange={onOptionChange}
                    />
                  </Form.Item>
                  <When condition={isoutsideCountry}>
                    <Form.Item
                      name="country"
                      label="Country"
                      rules={schemaRules}
                      required
                    >
                      <Select options={optionCountry} />
                    </Form.Item>
                  </When>
                  <Form.Item
                    name="eventName"
                    label="Event"
                    rules={schemaRules}
                    required
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="subEventName"
                    label="Sub-Event"
                    rules={schemaRules}
                    required
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="organizationName"
                    label="Organization"
                    rules={schemaRules}
                    required
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="dateOfEvent"
                    label="Date of Event"
                    rules={schemaRules}
                    required
                  >
                    <DatePicker
                      className="w-100%"
                      format={global.displayDateFormat}
                    />
                  </Form.Item>
                  <Form.Item
                    name="achievement"
                    label="Achievement"
                    rules={schemaRules}
                    required
                  >
                    <Select options={optionsAcheivement} />
                  </Form.Item>
                  <Form.Item name="relevantPo" label="Relevant PO" required rules={schemaRules}>
                  <Select options={optionsPo} mode="multiple" />
                  </Form.Item>
                  <Form.Item
                    name="relevantCo"
                    label="Relevant CO"
                    rules={schemaRules}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Document">
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </When>
            <When condition={isNew}>
              {fields.map((field, index) => {
                const cnt = index;
                return (
                  <div>
                    <Row className="justify-center">
                      <Col className="w-md">
                        <Form.Item
                          name="academicYear"
                          label="Academic Year"
                          rules={schemaRules}
                          required
                        >
                          <Select options={optionsAcademicYear} />
                        </Form.Item>
                        <Form.Item
                          name="eventLevel"
                          label="Event Level"
                          rules={schemaRules}
                          required
                        >
                          <Select options={optionsEventLevel} />
                        </Form.Item>
                        <Form.Item
                          name="participationType"
                          label="Participation Type"
                          rules={schemaRules}
                          required
                        >
                          <Select
                            options={optionsParticipationType}
                            onChange={onOptionChange}
                          />
                        </Form.Item>
                        <When condition={isoutsideCountry}>
                          <Form.Item
                            name="country"
                            label="Country"
                            rules={schemaRules}
                            required
                          >
                            <Select options={optionCountry} />
                          </Form.Item>
                        </When>
                        <Form.Item
                          name="eventName"
                          label="Event"
                          rules={schemaRules}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="subEventName"
                          label="Sub-Event"
                          rules={schemaRules}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="organizationName"
                          label="Organization"
                          rules={schemaRules}
                          required
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="dateOfEvent"
                          label="Date of Event"
                          rules={schemaRules}
                          required
                        >
                          <DatePicker
                            className="w-100%"
                            format={global.displayDateFormat}
                          />
                        </Form.Item>
                        <Form.Item
                          name="achievement"
                          label="Achievement"
                          rules={schemaRules}
                          required
                        >
                          <Select options={optionsAcheivement} />
                        </Form.Item>
                        <Form.Item name="relevantPo" label="Relevant PO" required rules={schemaRules}>
                        <Select options={optionsPo} mode="multiple" />

                        </Form.Item>
                        <Form.Item
                          name="relevantCo"
                          label="Relevant CO"
                          rules={schemaRules}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item name="students" label="Select Students">
                          <Select options={optionsStudents} mode="multiple" />
                        </Form.Item>
                        <Form.Item label="Document">
                          <Upload {...props}>
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                );
              })}
              <When condition={fields.length > 1}>
                <Button
                  type="default"
                  style={{ color: 'white', background: 'red' }}
                  onClick={removeDynamicFields}
                >
                  Remove
                </Button>
              </When>
            </When>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default TechnicalDetailsForm;
