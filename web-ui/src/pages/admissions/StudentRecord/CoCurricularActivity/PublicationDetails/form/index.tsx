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

import * as modelPublicationDetails from '@/models/admissions/studentRecords/PublicationDetails';
import { useSettings } from '@/store/settings/useSettings';
import { usePublicationDetails } from '@/store/admissions/usePublicationDetails';
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

const PublicationDetailsForm = ({
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
      schemaValidator(modelPublicationDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
  }));

  const optionsAcademicYear = React.useMemo(
    () => storeAcademicYear.comboByName || [],
    [storeAcademicYear.comboByName],
  );
  const optionsPublicationType = todoLookUps.getState().publicationType;
  const optionsEventLevel = todoLookUps.getState().eventLevel;
  const optionsTypeOfPaper = todoLookUps.getState().typeOfPaper;
  const [isPaper, setIsPaper] = useState(false);

  const storePublicationDetails = usePublicationDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));
  const storeStudentInfo = useStudentInfo((state: any) => ({
    getRecords: state.getRecords,
    optionsstudents: state.optionsstudents,
  }));
  // const optionsStudents = storeStudentInfo.optionsstudents.filter((item: any) => item.value !== studentId);
  const optionsStudents = storeStudentInfo.optionsstudents;
  const optionsPo = todoLookUps.getState().relevantPo;


  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storePublicationDetails.getRecord(id);
    storeStudentInfo.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storePublicationDetails.current.id !== id) {
      return;
    }
    if (storePublicationDetails.current.publicationType === 'paper') {
      setIsPaper(true);
    }
    form.setFieldsValue(storePublicationDetails.current);
  }, [storePublicationDetails.current]);
  const onOptionChange = (event: any) => {
    if (event === 'paper') {
      setIsPaper(true);
    }
    else {
      setIsPaper(false);
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
          const record = await storePublicationDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.id}`,
            });
          }
        }
        else {
          const record = await storePublicationDetails.updateRecord(id, values);
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
    ? 'Add Publication  Details'
    : 'Edit Publication Details';

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
        </Card>
        <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
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
                name="publicationLevel"
                label="Publication Level"
                rules={schemaRules}
                required
              >
                <Select options={optionsEventLevel} />
              </Form.Item>
              <Form.Item
                name="publicationType"
                label="Publication Type"
                rules={schemaRules}
                required
              >
                <Select
                  options={optionsPublicationType}
                  onChange={onOptionChange}
                />
              </Form.Item>
              <Form.Item
                name="publicationDate"
                label="Publication Date"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="authorsName"
                label="Authors' Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <When condition={isPaper}>
                <Form.Item
                  name="typeOfPaper"
                  label="Type of Paper"
                  rules={schemaRules}
                  required
                >
                  <Select options={optionsTypeOfPaper} />
                </Form.Item>
                <Form.Item
                  name="conferenceDetails"
                  label="Journal/Conference Details"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="titleofpaper"
                  label="Title of Paper"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
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

              <Form.Item label="Upload Paper">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Upload Document">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PublicationDetailsForm;
