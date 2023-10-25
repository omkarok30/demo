import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Row,
  Select,
  Table,
  notification,
  Affix,
} from 'antd';
import { useParams } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import { When } from 'react-if';
import { schemaValidator } from '@/utils/validate';
import { usePaymentRecord } from '@/store/employee/usePaymentmode';
import * as modalpaymentmode from '@/models/Employee/PaymentMode';
import { useSettings } from '@/store/settings/useSettings';
import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const paymentModes = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const storePaymentmode = usePaymentRecord((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
    deleteRecords: state.deleteRecords,
  }));

  const settings = useSettings((state: any) => state.byKeys);
  const fetchSettings = useSettings((state: any) => state.fetchSettings);
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modalpaymentmode.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );
  const [isbank, setbank] = useState(false);
  const [iscash, setcash] = useState(false);
  const [ischeque, setcheque] = useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    storePaymentmode.getRecords(id);
    // console.log(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storePaymentmode.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.paymentMode}`,
            });
          }
        }
        else {
          values.id = id;
          const record = await storePaymentmode.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.paymentMode}`,
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
  const optionpaymentmode = todoLookUps.getState().paymentMode;
  const optionaccounttype = todoLookUps.getState().accountType;

  const onOptionChange = (event: any) => {
    if (event === 'bank') {
      setbank(true);
      setcash(false);
      setcheque(false);
    }
    else if (event === 'cash') {
      setbank(false);
      setcash(true);
      setcheque(true);
    }
 else if (event === 'cheque') {
      setbank(false);
      setcash(false);
      setcheque(true);
    }
  };
  React.useEffect(() => {
    fetchSettings();
    storePaymentmode.getRecords();
  }, []);

  const columns: ColumnsType<any> = React.useMemo(() => {
    const cols = modalpaymentmode.columns(settings);
    cols.push({});
    // cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);
  const headerLabel = isNew ? 'Add Payment mode' : 'Update Payment mode';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving} style={{ marginRight: 10 }}>
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Form.Item name="paymentMode" rules={schemaRules} required>
              Payment mode
              <Select
                style={{ width: 300 }}
                options={optionpaymentmode}
                onChange={onOptionChange}
              ></Select>
            </Form.Item>
          </Row>
          <Row className="justify-center">
            <When condition={isbank}>
              <Form.Item rules={schemaRules} required>
                Bank Name
                <Select style={{ width: 300 }}></Select>
              </Form.Item>

              <Row className="justify-center">
                <Form.Item
                  name="accountNumber"
                  label="Account Number"
                  rules={schemaRules}
                  required
                />
                <Input style={{ maxHeight: 30, width: 300 }} />
              </Row>
              <Row className="justify-center">
                <Form.Item
                  name="IFSC"
                  label="IFSC Code"
                  rules={schemaRules}
                  required
                />
                <Input style={{ maxHeight: 30, width: 300 }} />
              </Row>
              <Row className="justify-center">
                <Form.Item name="accountType" rules={schemaRules} required>
                  Account type:
                  <Select
                    style={{ width: 200 }}
                    options={optionaccounttype}
                  ></Select>
                </Form.Item>
              </Row>
            </When>
            <When condition={iscash}>
              </When>
              <When condition={ischeque}>
                </When>
          </Row>
          
          <Table
            bordered
            columns={columns}
            dataSource={storePaymentmode.allRecords}
          />
        </Card>
      </Form>
    </div>
  );
};

export default paymentModes;