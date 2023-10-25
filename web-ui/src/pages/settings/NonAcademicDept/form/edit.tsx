import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Row, notification } from 'antd';
import { When } from 'react-if';

import * as modelNonAcademicDept from '@/models/settings/NonAcademicDept';
import { useSettings } from '@/store/settings/useSettings';
import { useNonAcademicDepartment } from '@/store/settings/useNonAcademicDepartment';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';

const NonAcademicDepartmentEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  console.log(isNew);

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const schemaRules = React.useMemo(() => schemaValidator(modelNonAcademicDept.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const storeNonAcademicDepartment = useNonAcademicDepartment(
    (state: any) => ({
      getRecord: state.getRecord,
      current: state.current,
      addRecord: state.addRecord,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeNonAcademicDepartment.getRecord(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeNonAcademicDepartment.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeNonAcademicDepartment.current);
  }, [storeNonAcademicDepartment.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeNonAcademicDepartment.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.degreeName}` });
          }
        }
        else {
          const record = await storeNonAcademicDepartment.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.degreeName}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Edit Non-Academic Department' : 'Add Non-Academic Department';

  return (<div className='layout-main-content'>
    <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
      <Card
        bordered={false}
        title={headerLabel}
        actions={[
          <Affix offsetBottom={12}>
            <Form.Item>
              <Button type="primary" onClick={onFormSubmit} disabled={saveProgress.disableSubmit} loading={saveProgress.saving}>
                Submit
              </Button>
            </Form.Item>
          </Affix>,
        ]}
      >
        <Row className="justify-center">
          <Col className='w-md'>
            <When condition={!isNew}>
              {() => (<>
                <Form.Item name="degreeName" label="Department Name" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item name="degreeCode" label="Department Code" rules={schemaRules}>
                  <Input />
                </Form.Item>
              </>)}
            </When>

            <When condition={isNew}>
              <Form.Item name="degreeName" label="Department Name" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item name="degreeCode" label="Department Code" rules={schemaRules} >
                <Input />
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should confirm updates.')),
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
  </div >);
};

export default NonAcademicDepartmentEdit;
