import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  notification,
  Upload,
  UploadProps,
} from 'antd';
import { When } from 'react-if';
import { UploadOutlined } from '@ant-design/icons';
import StudentDescription from '../../description';

import * as modelStudentDocuments from '@/models/admissions/studentRecords/StudentDocuments';
import { useSettings } from '@/store/settings/useSettings';
import { useStudentDocuments } from '@/store/admissions/useStudentDocuments';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';


const StudentDocumentForm = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelStudentDocuments.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeStudentDocuments = useStudentDocuments((state: any) => ({
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
    storeStudentDocuments.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeStudentDocuments.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeStudentDocuments.current);
  }, [storeStudentDocuments.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeStudentDocuments.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await storeStudentDocuments.updateRecord(id, values);
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
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        notification.success({ message: 'Upload Successfull!', description: `${info.file.name} file uploaded successfully` });
      }
      else if (info.file.status === 'error') {
        notification.error({ message: 'Upload Successfull!', description: `${info.file.name} file uploaded failed` });
      }
    },
  };

  const headerLabel = isNew ? 'Add Student Documents' : 'Edit Student Documents';

  return (
    <div className="layout-main-content">
        <Card   bordered={false}
          title={headerLabel}>      <StudentDescription></StudentDescription>
</Card>
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
        
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={onFormSubmit}
                  disabled={saveProgress.disableSubmit}
                  loading={saveProgress.saving}
                >
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
                                    <Form.Item
                      name="nameOfDocument"
                      label="Name Of Document"
                      rules={schemaRules}
                      required
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
        </Card>
      </Form>
    </div>
  );
};

export default StudentDocumentForm;
