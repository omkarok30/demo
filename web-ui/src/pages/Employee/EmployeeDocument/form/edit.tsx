import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Affix, Button, Card, Col, Form, Input, Row, Upload, message, notification } from 'antd';
import { When } from 'react-if';

import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as modelEmployeeDocument from '@/models/Employee/Employeedocument';
import { useSettings } from '@/store/settings/useSettings';
import { useEmployeeDocument } from '@/store/employee/useEmployeeDocument';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';

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
      message.success(`${info.file.name} file uploaded successfully`);
    }
    else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const EmployeeDocumentEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));

  const schemaRules = React.useMemo(() => schemaValidator(modelEmployeeDocument.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const storeEmployeeDocument = useEmployeeDocument(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
      getRecords: state.getRecords,
      optionsTools: state.comboByName,
    }),
  );
  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeEmployeeDocument.getRecords();
    storeEmployeeDocument.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeEmployeeDocument.current.id !== id) {
      return;
    }
    (storeEmployeeDocument.current.toolDependency);
    form.setFieldsValue(storeEmployeeDocument.current);
  }, [storeEmployeeDocument.current]);
  const nvaigateToPreviousPage = () => {
    navigate(`/employee/employee_details/edit/${id}`, { state: { activeTab: 'EmployeeDocument' } });
  };
  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeEmployeeDocument.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.toolName}` });
          }
        }
        else {
          values.id = id;
          const record = await storeEmployeeDocument.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.toolName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Add Employee Document' : 'Edit Employee Document';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit}>
                Submit
              </Button>
              <Button type="primary" onClick={nvaigateToPreviousPage}>
                Back
              </Button>

            </Form.Item>
          </Affix>,
        ]}
    >
        <When condition={!isNew}>

        </When>
        <Row className="justify-center">
          <Col className='w-md'>
            <When condition={!isNew}>
              {() => (<>
                <Form.Item name="nameofdocument" label="Name of Document" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item
                    name="uploaddocument" label="Upload Document" rules={schemaRules} required>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
              </>)}
            </When>

            <When condition={isNew}>
              {() => (<>
                <Form.Item name="nameofdocument" label="Name of Document" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item
                    name="uploaddocument" label="Upload Document" rules={schemaRules} required>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
              </>)}
            </When>

          </Col>
        </Row>
      </Card>
    </Form>
  </div >);
};

export default EmployeeDocumentEdit;
