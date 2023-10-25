import React, { useState } from 'react';
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
import * as modelBeneficiaryDetails from '@/models/admissions/studentRecords/BeneficiaryDetails/FollowingClasses';
import { useScholarShipDetails } from '@/store/admissions/BeneficiaryDetails/useScholarshipDetails';
import { schemaValidator } from '@/utils/validate';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';

const governmentScheme = todoLookUps.getState().governmentScheme;
const instituteScheme = todoLookUps.getState().instituteScheme;
const privateScheme = todoLookUps.getState().privateScheme;
const yesNo = todoLookUps.getState().yesNo;

const BeneficiaryDetails = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const [govnScholership, displayGovnScholershipFields] = useState(false);
  const [instiScholership, displayInstiScholershipFields] = useState(false);
  const [privateScholership, displayPrivateScholershipFields] = useState(false);

  const settings = useSettings((state: any) => ({
    fetchSettings: state.fetchSettings,
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const { addRecord, getRecord, current, updateRecord }
    = useScholarShipDetails((state: any) => ({
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

  const onGovnScholershipChange = (value: boolean) => {
    if (value) {
      displayGovnScholershipFields(true);
    }
    else {
      displayGovnScholershipFields(false);
    }
  };

  const onInstiScholershilChange = (value: boolean) => {
    if (value) {
      displayInstiScholershipFields(true);
    }
    else {
      displayInstiScholershipFields(false);
    }
  };

  const onPrivateScholershilChange = (value: boolean) => {
    if (value) {
      displayPrivateScholershipFields(true);
    }
    else {
      displayPrivateScholershipFields(false);
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
              </When>
              <Form.Item
                name="appliedInstituteScheme"
                label="Has the student benefitted from Institutes Beneficiary Scheme(s)?"
                rules={schemaRules}
                required
              >
                <Select options={yesNo} onChange={onInstiScholershilChange} />
              </Form.Item>
              <When condition={instiScholership}>
                <Form.Item
                  name="instituteScheme"
                  label="Institutes Beneficiary Scheme"
                  rules={schemaRules}
                  required
                >
                  <Select options={instituteScheme} />
                </Form.Item>
                <Form.Item
                  name="instituteAmount"
                  label="Amount in Rupees (INR)"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
              </When>
              <Form.Item
                name="appliedPrivateScheme"
                label="Applied for Government scholarship?"
                rules={schemaRules}
                required
              >
                <Select options={yesNo} onChange={onPrivateScholershilChange} />
              </Form.Item>
              <When condition={privateScholership}>
                <Form.Item
                  name="privateScheme"
                  label="Private Beneficiary Scheme"
                  rules={schemaRules}
                  required
                >
                  <Select options={privateScheme} />
                </Form.Item>
                <Form.Item
                  name="privateAmount"
                  label="Amount in Rupees (INR)"
                  rules={schemaRules}
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

export default BeneficiaryDetails;
