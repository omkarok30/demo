import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Col, Form, Input, Row, Select, notification } from 'antd';

import TextArea from 'antd/lib/input/TextArea';
import { useInstitute } from '@/store/settings/useInstitute';
import * as modelInstitute from '@/models/settings/Institute';
import { isEmptyValue } from '@/utils/object';
import { useSettings } from '@/store/settings/useSettings';
import { schemaValidator } from '@/utils/validate';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { useAcademicYear } from '@/store/settings/useAcademicYear';

// TODO: move to lookups store on merging program details
const countryOptions = [
  { value: 'INDIA', label: 'India' },
];
const stateOptions = [
  { value: 'MAHARASHTRA', label: 'Maharashtra' },
];
const districtOptions = [
  { value: 'SOLAPUR', label: 'Solapur' },
];

const InstituteForm = () => {
  const { id } = useParams();

  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));
  const storeAcademicYear = useAcademicYear((state: any) => ({ asOptions: state.asOptions }));

  const schemaRules = React.useMemo(() => schemaValidator(modelInstitute.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);
  const optionsAcademicYear = React.useMemo(() => storeAcademicYear.asOptions() || [], []);

  const storeInstitute = useInstitute(
    (state: any) => ({
      current: state.current,
      getInstitute: state.getInstitute,
      updateRecord: state.updateRecord,
    }),
  );

  const [saveProgress, setSaveProgress] = React.useState({ saving: false, disableSubmit: false, disableForm: false });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeInstitute.getInstitute(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeInstitute.current.id !== id) {
      return;
    }
    form.setFieldsValue(storeInstitute.current);
  }, [storeInstitute.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        values.id = id;
        const record = await storeInstitute.updateRecord(id, values);
        if (!isEmptyValue(record)) {
          notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.name}` });
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = 'Edit Institute';

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
            </Form.Item>
          </Affix>,
        ]}
      >
        <Row className="justify-center">
          <Col className='w-md'>
            <Form.Item name="name" label="Name" rules={schemaRules} required>
              <Input />
            </Form.Item>
            <Form.Item name="displayName" label="Display Name" rules={schemaRules} required>
              <Input />
            </Form.Item>
            <Form.Item name="address1" label="Address Line 1" rules={schemaRules} required>
              <Input />
            </Form.Item>
            <Form.Item name="address2" label="Address Line 2" rules={schemaRules}>
              <Input />
            </Form.Item>
            <Form.Item name="address3" label="Address Line 3" rules={schemaRules}>
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Country" rules={schemaRules} required>
              <Select options={countryOptions} />
            </Form.Item>
            <Form.Item name="state" label="State" rules={schemaRules} required>
              <Select options={stateOptions} />
            </Form.Item>
            <Form.Item name="district" label="District" rules={schemaRules} required>
              <Select options={districtOptions} />
            </Form.Item>
            <Form.Item name="tehsil" label="Tehsil" rules={schemaRules} required>
              <Input />
            </Form.Item>
            <Form.Item name="pincode" label="Pincode" rules={schemaRules} required>
              <Input />
            </Form.Item>
            <Form.Item name="contact" label="Contact" rules={schemaRules} required>
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item name="startYear" label="Commencement Year" rules={schemaRules}>
              <DisplaySelect options={optionsAcademicYear} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  </div>);
};

export default InstituteForm;
