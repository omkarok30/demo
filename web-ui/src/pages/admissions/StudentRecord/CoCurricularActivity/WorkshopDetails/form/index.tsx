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
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import StudentDescriptionForActivity from '../../../studentDescription';
import { useGlobalState } from '@/store/global';

import * as modelWorkshopDetails from '@/models/admissions/studentRecords/WorkshopDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useWorkshopDetails } from '@/store/admissions/useWorkshopDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
import { useStudentInfo } from '@/store/admissions/useStudentInfo';
import { DisplayInput } from '@/components/FormItem/DisplayInput';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const WorkshopDetailsForm = ({
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
      schemaValidator(modelWorkshopDetails.schemaRules, {
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
  const optionLevel = todoLookUps.getState().eventLevel;
  const optionsparticipation = todoLookUps.getState().participationType;

  const storeWorkshopDetails = useWorkshopDetails((state: any) => ({
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

  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const calculatediff = (event: any, id: string) => {
    if (id === 'startdate') {
      setStartDate(event);
      const durationdiff = moment(endDate).diff(moment(event), 'days');
      form.setFieldValue('duration', durationdiff);
    }
    else if (id === 'enddate') {
      setEndDate(event);
      const durationdiff = moment(event).diff(moment(startDate), 'days');
      form.setFieldValue('duration', durationdiff);
    }
  };
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  React.useEffect(() => {
    storeWorkshopDetails.getRecord(id);
    storeStudentInfo.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeWorkshopDetails.current.id !== id) {
      return;
    }
    setStartDate(storeWorkshopDetails.current.startDate);
    setEndDate(storeWorkshopDetails.current.endDate);

    form.setFieldsValue(storeWorkshopDetails.current);
  }, [storeWorkshopDetails.current]);
  const doOK = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeWorkshopDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.id}`,
            });
          }
        }
        else {
          const record = await storeWorkshopDetails.updateRecord(id, values);
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
          const record = await storeWorkshopDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record}`,
            });
          }
        }
        else {
          const record = await storeWorkshopDetails.updateRecord(id, values);
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
    ? 'Add Training/Workshop  Details'
    : 'Edit Training/Workshop Details';

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
                name="workshopLevel"
                label="Training/Workshop Level"
                rules={schemaRules}
                required
              >
                <Select options={optionLevel} />
              </Form.Item>
              <Form.Item
                name="participationType"
                label="Participation Type"
                rules={schemaRules}
                required
              >
                <Select options={optionsparticipation} />
              </Form.Item>
              <Form.Item
                name="titleOfWorkshop"
                label="Title of Training / Workshop"
                rules={schemaRules}
                required
              >
                <Input />
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
                  value={startDate}
                  onChange={(event: any) => calculatediff(event, 'startdate')}
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
                  value={endDate}
                  onChange={(event: any) => calculatediff(event, 'enddate')}
                />
              </Form.Item>
              <Form.Item
                name="duration"
                label="Duration"
                rules={schemaRules}
                required
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={schemaRules}
                required
              >
                <Input />
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

export default WorkshopDetailsForm;
