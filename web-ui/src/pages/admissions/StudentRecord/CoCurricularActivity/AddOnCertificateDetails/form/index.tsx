import React from 'react';
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
import { UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import StudentDescriptionForActivity from '../../../studentDescription';
import { useGlobalState } from '@/store/global';

import * as modelAddOnCertificateDetails from '@/models/admissions/studentRecords/AddOnCertificateDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useAddOnCertificateDetails } from '@/store/admissions/useAddOnCertificateDetails';
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

const AddOnCertificateForm = ({
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
      schemaValidator(modelAddOnCertificateDetails.schemaRules, {
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
  const optionsmode = todoLookUps.getState().mode;
  const optionsPo = todoLookUps.getState().relevantPo;

  const storeAddOnCertificateDetails = useAddOnCertificateDetails(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );
  const storeStudentInfo = useStudentInfo((state: any) => ({
    getRecords: state.getRecords,
    optionsstudents: state.optionsstudents,
  }));
  // const optionsStudents = storeStudentInfo.optionsstudents.filter((item: any) => item.value !== studentId);
  const optionsStudents = storeStudentInfo.optionsstudents;
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeAddOnCertificateDetails.getRecord(id);
    storeStudentInfo.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeAddOnCertificateDetails.current.id !== id) {
      return;
    }

    form.setFieldsValue(storeAddOnCertificateDetails.current);
  }, [storeAddOnCertificateDetails.current]);
  const doOK = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeAddOnCertificateDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.id}`,
            });
          }
        }
        else {
          const record = await storeAddOnCertificateDetails.updateRecord(
            id,
            values,
          );
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
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeAddOnCertificateDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record}`,
            });
          }
        }
        else {
          const record = await storeAddOnCertificateDetails.updateRecord(
            id,
            values,
          );
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record}`,
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
    ? 'Add Add-On/Certificate Courses'
    : 'Edit Add-On/Certificate Courses';

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
                name="courseName"
                label="Course Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="courseDuration"
                label="Course Duration (In Hours)"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item name="mode" label="Mode" rules={schemaRules} required>
                <Select options={optionsmode} />
              </Form.Item>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="organizationName"
                label="Name of Training Organization"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item name="relevantPo" label="Relevant PO" required rules={schemaRules}>
              <Select options={optionsPo} mode="multiple" />
              </Form.Item>
              <Form.Item name="students" label="Select Students">
                <Select options={optionsStudents} mode="multiple" />
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

export default AddOnCertificateForm;
