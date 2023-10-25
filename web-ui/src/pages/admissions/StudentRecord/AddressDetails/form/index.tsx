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
  Typography,
  notification,
} from 'antd';
import { useParams } from 'react-router-dom';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import * as modalAddressDetails from '@/models/admissions/studentRecords/AddressDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { useAddressDetails } from '@/store/admissions/useAddressDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const AddressDetailsForm = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { Title } = Typography;

  const [checked, setChecked] = React.useState(false);
  const [formDisabled, setFormDisabled] = React.useState(false);

  const isNew = id === 'new';
  const fetchSettings = useSettings((state: any) => state.fetchSettings);

  const { getRecord, current, updateRecord, addRecord } = useAddressDetails(
    (state: any) => ({
      current: state.current,
      addRecord: state.addRecord,
      getRecord: state.getRecord,
      clearRecord: state.clearRecord,
      updateRecord: state.updateRecord,
    }),
  );

  React.useEffect(() => {
    getRecord(id);
    fetchSettings();

    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (!current) {
      return;
    }
    if (current.id !== id) {
      return;
    }

    current && !!current.id && setFormDisabled(true);
    current && form.setFieldsValue(current);
  }, [current]);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modalAddressDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  const stateOptions = todoLookUps.getState().state;
  const districtOptions = todoLookUps.getState().district;
  const countryOptions = todoLookUps.getState().country;
  const locationTypeOptions = todoLookUps.getState().locationType;

  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      form.setFieldValue('presentAddress1', form.getFieldValue('address1'));
      form.setFieldValue('presentAddress2', form.getFieldValue('address2'));
      form.setFieldValue('presentAddress3', form.getFieldValue('address3'));
      form.setFieldValue(
        'presentLocationType',
        form.getFieldValue('locationType'),
      );
      form.setFieldValue('presentCity', form.getFieldValue('city'));
      form.setFieldValue('presentDistrict', form.getFieldValue('district'));
      form.setFieldValue('presentState', form.getFieldValue('state'));
      form.setFieldValue('presentCountry', form.getFieldValue('country'));
      form.setFieldValue('presentPincode', form.getFieldValue('pincode'));
    }

    if (!e.target.checked) {
      form.setFieldValue('presentAddress1', '');
      form.setFieldValue('presentAddress2', '');
      form.setFieldValue('presentAddress3', '');
      form.setFieldValue('presentLocationType', '');
      form.setFieldValue('presentCity', '');
      form.setFieldValue('presentDistrict', '');
      form.setFieldValue('presentState', '');
      form.setFieldValue('presentCountry', '');
      form.setFieldValue('presentPincode', '');
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

  const onFormUpdate = () => {
    setFormDisabled(false);
  };

  const headerLabel = 'Address Details';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={formDisabled}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                {formDisabled && (
                  <Button
                    type="primary"
                    onClick={onFormUpdate}
                    disabled={false}
                  >
                    Update
                  </Button>
                )}
                {!formDisabled && (
                  <Button
                    type="primary"
                    onClick={onFormSubmit}
                    disabled={false}
                  >
                    Submit
                  </Button>
                )}
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Title level={5}>Permanent/Parent's Address Details</Title>
              <Form.Item
                name="address1"
                label="Address Line 1"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address2"
                label="Address Line 2"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address3"
                label="Address Line 3"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="locationType"
                label="Location Category"
                rules={schemaRules}
              >
                <Select options={locationTypeOptions} />
              </Form.Item>
              <Form.Item name="city" label="City/Tehsil" rules={schemaRules}>
                <Input />
              </Form.Item>
              <Form.Item
                name="country"
                label="Country"
                rules={schemaRules}
                required
              >
                <Select options={countryOptions} />
              </Form.Item>
              <Form.Item
                name="state"
                label="State"
                rules={schemaRules}
                required
              >
                <Select options={stateOptions} />
              </Form.Item>
              <Form.Item
                name="district"
                label="District"
                rules={schemaRules}
                required
              >
                <Select options={districtOptions} />
              </Form.Item>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={schemaRules}
                required
              >
                <Input maxLength={6} />
              </Form.Item>
            </Col>
            <Col className="w-md">
              <Title level={5}>Present Address Details</Title>
              <Form.Item name="copyData" valuePropName="checked">
                <Checkbox checked={checked} onChange={onChange}>
                  Same as above
                </Checkbox>
              </Form.Item>
              <Form.Item
                name="presentAddress1"
                label="Address Line 1"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="presentAddress2"
                label="Address Line 2"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="presentAddress3"
                label="Address Line 3"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="presentLocationType"
                label="Location Category"
                rules={schemaRules}
              >
                <Select options={locationTypeOptions} />
              </Form.Item>
              <Form.Item name="presentCity"
                 label="City/Tehsil" rules={schemaRules}>
                <Input />
              </Form.Item>
              <Form.Item
                name="presentCountry"
                label="Country"
                rules={schemaRules}
                required
              >
                <Select options={countryOptions} />
              </Form.Item>
              <Form.Item
                name="presentState"
                label="State"
                rules={schemaRules}
                required
              >
                <Select options={stateOptions} />
              </Form.Item>
              <Form.Item
                name="presentDistrict"
                label="District"
                rules={schemaRules}
                required
              >
                <Select options={districtOptions} />
              </Form.Item>
              <Form.Item
                name="presentPincode"
                label="Pincode"
                rules={schemaRules}
                required
              >
                <Input maxLength={6}/>
              </Form.Item>
            </Col>
            <Col className="w-md">
              <Title level={5}>Local Guardian's Address Details</Title>
              <Form.Item
                name="guardianName"
                label="Guardian Name"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="guardianContactNo"
                label="Guardian Contact No"
                rules={schemaRules}

              >
                <Input maxLength={10}/>
              </Form.Item>
              <Form.Item
                name="guardianAddress1"
                label="Address Line 1"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="guardianAddress2"
                label="Address Line 2"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="guardianAddress3"
                label="Address Line 3"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="guardianLocationType"
                label="Location Category"
                rules={schemaRules}
              >
                <Select options={locationTypeOptions} />
              </Form.Item>
              <Form.Item name="city" label="City/Tehsil" rules={schemaRules}>
                <Input />
              </Form.Item>
              <Form.Item
                name="guardianCountry"
                label="Country"
                rules={schemaRules}
              >
                <Select options={countryOptions} />
              </Form.Item>
              <Form.Item name="guardianState" label="State" rules={schemaRules}>
                <Select options={stateOptions} />
              </Form.Item>
              <Form.Item
                name="guardianDistrict"
                label="District"
                rules={schemaRules}
              >
                <Select options={districtOptions} />
              </Form.Item>
              <Form.Item
                name="guardianPincode"
                label="Pincode"
                rules={schemaRules}
              >
                <Input maxLength={6}/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AddressDetailsForm;
