import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  UploadProps,
  notification,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';
import * as modalEducationDetails from '@/models/admissions/studentRecords/educationDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { useEducationDetails } from '@/store/admissions/useEducationDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const EducationDetailsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isNew = id === 'new';
  const [documentName, setDocumentName] = useState();
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const [shouldDisplaySpecialization, setShouldDisplaySpecialization]
    = React.useState(false);
  const storeEducationDetails = useEducationDetails((state: any) => ({
    current: state.current,
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord,
    getRecord: state.getRecord,
    clearRecord: state.clearRecord,
    updateRecord: state.updateRecord,
  }));

  React.useEffect(() => {
    fetchSettings();
    storeEducationDetails.getRecord(id);

    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    storeEducationDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  const optionsQualification = todoLookUps.getState().qualification;

  React.useEffect(() => {
    if (storeEducationDetails.current.id !== id) {
      return;
    }
    const value = storeEducationDetails.current.qualification;
    if (value !== 'X' && value !== undefined) {
      setShouldDisplaySpecialization(true);
    }
    else {
      setShouldDisplaySpecialization(false);
    }
    storeEducationDetails.current
      && form.setFieldsValue(storeEducationDetails.current);
    storeEducationDetails.current
      && setDocumentName(storeEducationDetails.current.document);
  }, [storeEducationDetails.current]);

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modalEducationDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  const onQualificationChange = (value: string) => {
    if (value !== 'X' && value !== undefined) {
      setShouldDisplaySpecialization(true);
    }
    else {
      setShouldDisplaySpecialization(false);
    }
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEducationDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await storeEducationDetails.updateRecord(id, values);
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

  const headerLabel = 'Education Details';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit}>
                Submit
              </Button>
            </Form.Item>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="qualification"
                label="Qualification"
                rules={schemaRules}
                required
              >
                <Select
                  options={optionsQualification}
                  onChange={onQualificationChange}
                />
              </Form.Item>
              <When condition={shouldDisplaySpecialization}>
                <Form.Item
                  name="specialization"
                  label="Specialization"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
              <Form.Item
                name="percentage"
                label="Percentage/CGPA"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passingYear"
                label="Passing Year"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="collageName"
                label="School/College Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="universityName"
                label="University/Board"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Upload Certificate"
                name="document"
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

export default EducationDetailsForm;
