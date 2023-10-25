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
import StudentDescription from '../../../description';
import { useGlobalState } from '@/store/global';

import * as modelExtendedActivity from '@/models/admissions/studentRecords/ExtraCurricularActivities/extendedSocialActivity';
import { useSettings } from '@/store/settings/useSettings';
import { useExtendedSocialActivity } from '@/store/admissions/ExtraCurricularActivities/useExtendedSocialActivity';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
import StudentDescriptionForActivity from '../../../studentDescription';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const ExtendedSocialActivityForm = ({
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
      schemaValidator(modelExtendedActivity.schemaRules, {
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

  const optionsEventParticipationType
    = todoLookUps.getState().eventParticipationType;
  const optionsEventLevel = todoLookUps.getState().eventLevel;
  const optionsAcheivement = todoLookUps.getState().achievement;
  const optionsYesOrNo = todoLookUps.getState().yesNo;
  const optionsPo = todoLookUps.getState().relevantPo;

  const store = useExtendedSocialActivity((state: any) => ({
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
    store.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (store.current.id !== id) {
      return;
    }
    form.setFieldsValue(store.current);
  }, [store.current]);
  const doOK = () => {
    if (saveProgress.disableSubmit) {
      return;
    }
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await store.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.id}`,
            });
          }
        }
        else {
          const record = await store.updateRecord(id, values);
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
          const record = await store.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await store.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.bankName}`,
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
    ? 'Add Extended/Social Activity Details'
    : 'Edit Extended/Social Activity Details';

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
      <Card bordered={false} >
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
                <Select options={optionsEventParticipationType} />
              </Form.Item>
              <Form.Item
                name="activityName"
                label="Activity"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="venuePlaceOfActivity"
                label="Venue/Place of Activity"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="activityDetails"
                label="Details of Activity"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="organizingCollaboratingAgency"
                label="Organising Unit/Agency/Collaborating Agency"
                rules={schemaRules}
                required
              >
                <Select options={optionsYesOrNo} />
              </Form.Item>
              <Form.Item
                name="otherOrganizingCollaboratingAgencyName"
                label="Name of Organising unit/ agency/ collaborating agency"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dateOfEvent"
                label="Date"
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
              <Form.Item
                name="linkToActivityDocs"
                label="Links to the image/s of Activity"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Link to Image of Activity">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Document">
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

export default ExtendedSocialActivityForm;
