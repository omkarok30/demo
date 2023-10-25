import React from 'react';
import {
  Affix,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  notification,
} from 'antd';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';
import * as modalContactDetails from '@/models/admissions/studentRecords/contactDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { useContactDetails } from '@/store/admissions/useContactDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const ContactDetailsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const [displayInputField, setShouldDisplayInputField]
    = React.useState(false);

  const isNew = id === 'new';

  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const { getRecord, current, updateRecord, addRecord } = useContactDetails((state: any) => ({
    current: state.current,
    addRecord: state.addRecord,
    getRecord: state.getRecord,
    clearRecord: state.clearRecord,
    updateRecord: state.updateRecord,
  }));

  React.useEffect(() => {
    fetchSettings();
    getRecord(id);

    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (current.id !== id) {
      return;
    }
    current
      && form.setFieldsValue(current);

    if (current.belongsTo === 'parent' || current.belongsTo === 'guardian') {
      setShouldDisplayInputField(true);
    }
  }, [current]);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modalContactDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  const numberTypeOptions = todoLookUps.getState().numberType;
  const belongsToOptions = todoLookUps.getState().belongsTo;

  const onBelongsToChange = (value: string) => {
    if (value === 'parent' || value === 'guardian') {
      setShouldDisplayInputField(true);
    }
    else {
      setShouldDisplayInputField(false);
    }
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await updateRecord(id, values);
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

  const headerLabel = 'Contact Details';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="phoneNumber"
                label="Mobile Number"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="numberType"
                label="Number Type"
                rules={schemaRules}
                required
              >
                <Select
                  options={numberTypeOptions}
                />
              </Form.Item>
              <Form.Item
                name="belongsTo"
                label="Belongs To"
                rules={schemaRules}
                required
              >
                <Select
                  options={belongsToOptions}
                  onChange={onBelongsToChange}
                />
              </Form.Item>
              <When condition={displayInputField}>
                <Form.Item
                  name="responsibleName"
                  label="Name of Parent/Guardian"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default ContactDetailsForm;
