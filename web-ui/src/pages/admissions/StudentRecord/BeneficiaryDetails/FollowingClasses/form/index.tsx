import React, { useState } from 'react';
import {
  Affix,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  notification,
} from 'antd';
import { useParams } from 'react-router-dom';
import { When } from 'react-if';
import { useGlobalState } from '@/store/global';
import * as modelBeneficiaryDetails from '@/models/admissions/studentRecords/BeneficiaryDetails/FollowingClasses';
import { useFollowingCLassesDetails } from '@/store/admissions/BeneficiaryDetails/useFollowingClasses';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';

const hostellite = todoLookUps.getState().hostellite;
const feeCategory = todoLookUps.getState().feeCategory;
const occupationOfParent = todoLookUps.getState().occupationOfParent;
const governmentScheme = todoLookUps.getState().governmentScheme;
const yesNo = todoLookUps.getState().yesNo;

const BeneficiaryDetails = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const global = useGlobalState((state: any) => state.default);

  const [otherOccupation, displayOtherOccupation] = useState(false);
  const [govnScholership, displayGovnScholershipFields] = useState(false);

  const settings = useSettings((state: any) => ({
    fetchSettings: state.fetchSettings,
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const { addRecord, getRecord, current, updateRecord }
    = useFollowingCLassesDetails((state: any) => ({
      addRecord: state.addRecord,
      getRecord: state.getRecord,
      current: state.current,
      updateRecord: state.updateRecord,
    }));

  const [saveProgress, setSaveProgress] = useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });

  const [form] = Form.useForm();

  React.useEffect(() => {
    getRecord(id);

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

    current && form.setFieldsValue(current);
  }, [current]);

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelBeneficiaryDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

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

  const onOccupationChange = (value: string) => {
    if (value === 'other') {
      displayOtherOccupation(true);
    }
    else {
      displayOtherOccupation(false);
    }
  };

  const onGovnScholershipChange = (value: boolean) => {
    if (value) {
      displayGovnScholershipFields(true);
    }
    else {
      displayGovnScholershipFields(false);
    }
  };

  const headerLabel = 'Update Admission Details';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit} disabled={false}>
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="admissionDate"
                label="Date of Admission"
                rules={schemaRules}
                required
              >
                <DatePicker
                  className="w-100%"
                  format={global.displayDateFormat}
                />
              </Form.Item>
              <Form.Item
                name="feesCategory"
                label="Fees Category"
                rules={schemaRules}
                required
              >
                <Select options={feeCategory} />
              </Form.Item>
              <Form.Item
                name="hostellite"
                label="Hostellite or Dayscholar?"
                rules={schemaRules}
                required
              >
                <Select options={hostellite} />
              </Form.Item>
              <Form.Item
                name="parentOccupation"
                label="Occupation of Parent"
                rules={schemaRules}
                required
              >
                <Select
                  options={occupationOfParent}
                  onChange={onOccupationChange}
                />
              </Form.Item>
              <When condition={otherOccupation}>
                <Form.Item
                  name="otherOccupation"
                  label="Other Occupation"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
              </When>
              <Form.Item
                name="familyIncome"
                label="Annual Income of Family (INR)"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="appliedGovernmentScholarship"
                label="Applied for Government scholarship?"
                rules={schemaRules}
                required
              >
                <Select options={yesNo} onChange={onGovnScholershipChange} />
              </Form.Item>
              <When condition={govnScholership}>
                <Form.Item
                  name="governmentApplicationId"
                  label="Application ID"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="governmentScheme"
                  label="Scheme Name"
                  rules={schemaRules}
                  required
                >
                  <Select options={governmentScheme} />
                </Form.Item>
                <Form.Item
                  name="governmentAmount"
                  label="Amount in Rupees (INR)"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ebcScholarship"
                  label="Are you eligible for EBC scholarship?"
                  rules={schemaRules}
                  required
                >
                  <Select options={yesNo} />
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BeneficiaryDetails;
