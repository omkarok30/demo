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
import * as modelemergency from '@/models/Employee/Emergency';
import { useSettings } from '@/store/settings/useSettings';
import { useEmergencyDetails } from '@/store/employee/useemergency';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { todoLookUps } from '@/store/todoLookUps';

const EmergencyEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelemergency.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeEmeregencyDetails = useEmergencyDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord,
  }));

  const [form] = Form.useForm();
  const optionBloodgroup = todoLookUps.getState().bloodGroup;
  React.useEffect(() => {
    storeEmeregencyDetails.getRecord();

    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
  React.useEffect(() => {
    form.setFieldsValue(storeEmeregencyDetails.current);
  }, [storeEmeregencyDetails.current]);
  console.log(storeEmeregencyDetails.current);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.id = id;
        storeEmeregencyDetails.updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const headerLabel = isNew ? 'Add Emergency Details' : 'Emergency details ';

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
            <Form.Item name="bloodGroup" label="Blood Group"    rules={schemaRules} required style={{ fontWeight: 'bold' }}>
                                <Select
                                    options={optionBloodgroup}
                                />
                            </Form.Item>
              <Form.Item
                name="noofDependents"
                label="Number of Dependent"
                rules={schemaRules}
                required
                style={{ fontWeight: 'bold' }}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                name="emergencyContactNumber"
                label="Emergency Contact Number"
                rules={schemaRules}
                required
                style={{ fontWeight: 'bold' }}
              >
                <Input required  maxLength={10}/>
              </Form.Item>

              <Form.Item
                name="emergencyContactName"
                label="Emergency Contact Name"
                rules={schemaRules}
                required
                style={{ fontWeight: 'bold' }}
               
              >
                <Input  />
              </Form.Item>
              <Form.Item
                name="nominee"
                label="Nominee Name"
                rules={schemaRules}
                required
                style={{ fontWeight: 'bold' }}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                name="nomineeMobile"
                label="Nominee Mobile"
                rules={schemaRules}
                style={{ fontWeight: 'bold' }}
              >
                <Input  maxLength={10} />
              </Form.Item>

              <Form.Item
                name="nomineeEmail"
                label="Nominee Email Id"
                rules={schemaRules}
                style={{ fontWeight: 'bold' }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should confirm updates.')),
                  },
                ]}
              >
                <Checkbox>I confirm to add the above record.</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default EmergencyEdit;
