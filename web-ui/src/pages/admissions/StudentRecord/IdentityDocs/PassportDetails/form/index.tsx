import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Upload,
  UploadProps,
  notification,
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import * as modal from '@/models/admissions/studentRecords/IdentityDocs/passportDetails';
import { useSettings } from '@/store/settings/useSettings';
import { usePassportDocuments } from '@/store/admissions/IdentityDocument/usePassportDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { useGlobalState } from '@/store/global';

const AdhaarDetailsForm = ({
  recordId,
  handleCancel,
}: {
  recordId: string;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const isNew = recordId === 'new';
  const [documentName, setDocumentName] = useState();
  const global = useGlobalState((state: any) => state.default);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modal.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const store = usePassportDocuments((state: any) => ({
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

  React.useEffect(() => {
    store.getRecord(recordId);
    return () => {
      form.setFieldsValue({});
    };
  }, [recordId]);

  React.useEffect(() => {
    if (store.current.id !== recordId) {
      return;
    }
    form.setFieldsValue(store.current);
    setDocumentName(store.current.passportDocument);
  }, [store.current]);

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
          const record = await store.updateRecord(recordId, values);
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
        handleCancel();
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

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          actions={[
              <Form.Item>
                <Button
                  type="primary"
                  onClick={onFormSubmit}
                  disabled={saveProgress.disableSubmit}
                  loading={saveProgress.saving}
                >
                  Submit
                </Button>
              </Form.Item>,

          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="passportNumber"
                label="Passport Number"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passportDob"
                label="Date of Birth"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="passportFullName"
                label="Full Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passportIssueDate"
                label="Passport Issue Date"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="passportExpiryDate"
                label="Passport Expiry Date"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="passportIssuePlace"
                label="Passport Issue place"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passportAddress"
                label="Address"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passportPlaceOfBirth"
                label="Place of Birth"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passportFatherName"
                label="Father's/Husband's Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Upload"
                name="passportDocument"
                extra={documentName}
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AdhaarDetailsForm;
