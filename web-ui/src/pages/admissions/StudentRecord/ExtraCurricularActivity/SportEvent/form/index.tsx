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

import * as modelSportsEventDetails from '@/models/admissions/studentRecords/ExtraCurricularActivities/extraCurricularSports';
import { useSettings } from '@/store/settings/useSettings';
import { useSportsDetails } from '@/store/admissions/ExtraCurricularActivities/useSportsDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { todoLookUps } from '@/store/todoLookUps';
export interface ActivityModalType {
  id: any;
  studentId: any;
  open: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const SportEventDetailsForm = ({
  id,
  studentId,
  open,
  handleOk,
  handleCancel,
}: ActivityModalType) => {
  const isNew = id === 'new';
  const global = useGlobalState((state: any) => state.default);
  const optionsSportType = todoLookUps.getState().sportType;
  const considerForAccredation = todoLookUps.getState().yesNo;

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelSportsEventDetails.schemaRules, {
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

  const optionsParticipationType = todoLookUps.getState().participationType;
  const optionsEventLevel = todoLookUps.getState().eventLevel;
  const optionsAcheivement = todoLookUps.getState().achievement;
  const optionCountry = todoLookUps.getState().country;
  const [displayCountry, setDisplayCountry] = useState(false);
  const [displayAccridiation, setDisplayAccridiation] = useState(false);
  const optionsPo = todoLookUps.getState().relevantPo;

  const storeSportsEventDetails = useSportsDetails((state: any) => ({
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
    storeSportsEventDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeSportsEventDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeSportsEventDetails.current);
  }, [storeSportsEventDetails.current]);

  const onOptionChange = (event: any) => {
    if (event === 'outsideCountry') {
      setDisplayCountry(true);
    }
    else {
      setDisplayCountry(false);
    }
  };

  const onSportTypeChange = (sportType: any) => {
    if (sportType === 'Team') {
      setDisplayAccridiation(true);
    }
    else {
      setDisplayAccridiation(false);
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
          const record = await storeSportsEventDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.id}`,
            });
          }
        }
        else {
          const record = await storeSportsEventDetails.updateRecord(id, values);
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
          const record = await storeSportsEventDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await storeSportsEventDetails.updateRecord(id, values);
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
    ? 'Add Sport Event Details'
    : 'Edit Sport Event Details';

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
                label="Sport Level"
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
              <When condition={displayCountry}>
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
                name="sportName"
                label="Sport"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="sportType"
                label="Sport Type"
                rules={schemaRules}
                required
              >
                <Select
                  options={optionsSportType}
                  onChange={onSportTypeChange}
                />
              </Form.Item>
              <When condition={displayAccridiation}>
                <Form.Item
                  name="considerForAccredation"
                  label="Consider For Accredation"
                  rules={schemaRules}
                  required
                >
                  <Select
                    options={considerForAccredation}
                    onChange={onSportTypeChange}
                  />
                </Form.Item>
                <Form.Item
                  name="member"
                  label="Member"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
              <Form.Item
                name="organizationName"
                label="Organization"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="detailsOfParticipation"
                label="Details of Participation"
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

export default SportEventDetailsForm;
