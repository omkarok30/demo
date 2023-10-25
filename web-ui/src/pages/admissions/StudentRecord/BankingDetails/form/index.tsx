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
  Row,
  Select,
  notification,
} from 'antd';
import { When } from 'react-if';

import * as modelBankingDetails from '@/models/admissions/studentRecords/bankingDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useBankingDetails } from '@/store/admissions/useBankingDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';

const yesNo = todoLookUps.getState().yesNo;

const BankDetailsForm = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelBankingDetails.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeBankingDetails = useBankingDetails((state: any) => ({
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
    storeBankingDetails.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeBankingDetails.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeBankingDetails.current);
  }, [storeBankingDetails.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeBankingDetails.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await storeBankingDetails.updateRecord(id, values);
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

  const headerLabel = isNew ? 'Add Bank Details' : 'Edit Bank Details';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
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
              <When condition={!isNew}>
                {() => (
                  <>
                    <Form.Item
                      name="bankName"
                      label="Bank Name"
                      rules={schemaRules}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="branchName"
                      label="Branch"
                      rules={schemaRules}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="ifscCode"
                      label="IFSC Code"
                      rules={schemaRules}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="accountNumber"
                      label="Account Number"
                      rules={schemaRules}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="branchAddress"
                      label="Branch Address"
                      rules={schemaRules}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="linkToSalary"
                      label="Link to Salary"
                      rules={schemaRules}
                    >
                      <Select options={yesNo} />
                    </Form.Item>
                  </>
                )}
              </When>

              <When condition={isNew}>
                <Form.Item
                  name="bankName"
                  label="Bank Name"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="branchName"
                  label="Branch"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ifscCode"
                  label="IFSC Code"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="accountNumber"
                  label="Account Number"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="branchAddress"
                  label="Branch Address"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="linkToSalary"
                  label="Link to Salary"
                  rules={schemaRules}
                >
                  <Select options={yesNo} />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                            new Error('Should confirm updates.'),
                          ),
                    },
                  ]}
                >
                  <Checkbox>I confirm to add the above record.</Checkbox>
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BankDetailsForm;
