import React from 'react';
import {
  Affix,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadProps,
  notification,
} from 'antd';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';
import { UploadOutlined } from '@ant-design/icons';

import { ValidationError } from 'yup';
import * as modelStudentInfo from '@/models/admissions/studentRecords/StudentInfo';
import { useBasicDetails } from '@/store/admissions/useBasicDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { useGlobalState } from '@/store/global';
import moment from 'moment';

const optionsGender = todoLookUps.getState().gender;
const classNameOptions = todoLookUps.getState().className;

const BasicDetails = () => {
  const { id } = useParams();

  const global = useGlobalState((state: any) => state.default);

  const settings = useSettings((state: any) => ({
    fetchSettings: state.fetchSettings,
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));

  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
    updateRecord: state.updateRecord,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
    allRecords: state.allRecords,
  }));

  React.useEffect(() => {
    settings.fetchSettings();
    storeAcademicYear.asOptions();
    storeProgramDetails.getRecords();
  }, []);

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeBasicDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeBasicDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeBasicDetails.current);
  }, [storeBasicDetails.current]);

  const optionsAcademicYear = React.useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );

  const [readOnly, setReadOnly] = React.useState(true);
  const [isSubmitButton, setIsSubmitButton] = React.useState(false);
  const [isUpdateButton, setIsUpdateButton] = React.useState(true);

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelStudentInfo.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );
  const disableFutureDates = (current) => {
    return current && current > moment().endOf('day');
  };
  const props: UploadProps = {
    name: 'file',
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

  const showButtons = (buttonname: any) => {
    if (buttonname === 'cancel') {
      setIsUpdateButton(true);
      setIsSubmitButton(false);
      setReadOnly(true);
    }
    if (buttonname === 'update') {
      setReadOnly(false);
      setIsSubmitButton(true);
      setIsUpdateButton(false);
    }
  };


  const onFormSubmit = () => {
    form.validateFields()
      .then((values) => {
        values.id = id;
      storeBasicDetails.updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <When condition={isSubmitButton}>
                  <Button type="primary" onClick={onFormSubmit}>
                    Submit
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      showButtons('cancel');
                    }}
                  >
                    Cancel
                  </Button>
                </When>
                <When condition={isUpdateButton}>
                  <Button
                    type="primary"
                    onClick={() => {
                      showButtons('update');
                    }}
                  >
                    Verify
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      showButtons('update');
                    }}
                  >
                    Update
                  </Button>
                </When>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="programId"
                label="Program"
                required
              >
                <DisplaySelect
                  options={storeProgramDetails.optionsAllPrograms}
                />
              </Form.Item>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={schemaRules}
                required
              >
                <Input readOnly={readOnly} />
              </Form.Item>
              <Form.Item
                name="middleName"
                label="Middle Name"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={schemaRules}
                required
              >
                <Input readOnly={readOnly} />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={schemaRules}
                required
              >
                <Select options={optionsGender} />
              </Form.Item>
              <Form.Item
                name="email"
                label="Student Email ID"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} type="email" />
              </Form.Item>
              <Form.Item
                name="mobileNo"
                label="Student Mobile Number"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} maxLength={10} />
              </Form.Item>
              <Form.Item
                name="parentEmail"
                label="Parents Email ID (Required for parents login ID)"
                rules={schemaRules}
              >
                <Input readOnly={readOnly} type="email" />
              </Form.Item>
              <Form.Item
                name="parentMobileNo"
                label="Parent Mobile Number"
                rules={schemaRules}
              >
                <Input maxLength={10}  />
              </Form.Item>
              <Form.Item
                name="className"
                label="Register In"
                required
              >
                <DisplaySelect options={classNameOptions}></DisplaySelect>
              </Form.Item>
              <Form.Item
                name="registrationYear"
                label="Registration Year"
                required
              >
                <DisplaySelect options={optionsAcademicYear}></DisplaySelect>
              </Form.Item>
              <Form.Item
                name="dateOfAdmission"
                label="Date of Admission"
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                  disabled
                  disabledDate={current => disableFutureDates(current)}
                />
              </Form.Item>
              <Form.Item
                name="generalRegesterNumber"
                label="General Register Number"
              >
                <Input readOnly={readOnly} />
              </Form.Item>
              <Form.Item name="enrolmentNumber" label="PRN.No">
                <Input readOnly={readOnly} />
              </Form.Item>
              <Form.Item name="changedName" label="Changed Name of Student">
                <Input readOnly={readOnly} />
              </Form.Item>
              <Form.Item
                name="dateOfNameChange"
                label="Date of Name Changed"
              >
                <DatePicker
                  disabled={readOnly}
                  className="w-100%"
                  format={global.displayDateFormat}
                  disabledDate={current => disableFutureDates(current)}
                />
              </Form.Item>
              <Form.Item label="Identity Image">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BasicDetails;
