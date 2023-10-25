import React from 'react';
import { useParams } from 'react-router-dom';
import { Affix, Button, Card, Checkbox, Col, Form, Input, Row, notification } from 'antd';
import { When } from 'react-if';

import * as modelGeneralSessions from '@/models/Academics/timeTable/generalSessions/GeneralSessions';
import { useSettings } from '@/store/settings/useSettings';
import { useGeneralSessions } from '@/store/Academics/timeTable/useGeneralSessions';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';

const GeneralSessionsEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({ byKeys: state.byKeys, asSelect: state.asSelect }));

  const schemaRules = React.useMemo(() => schemaValidator(modelGeneralSessions.schemaRules, { settings: settings.byKeys }), [settings.byKeys]);

  const [isDeptActive, setIsDeptActive] = React.useState(true);

  const storeGeneralSessions = useGeneralSessions(
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
    storeGeneralSessions.getRecord(id);
    console.log(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  React.useEffect(() => {
    if (storeGeneralSessions.current.id !== id) {
      return;
    }
    setIsDeptActive(!!isEmptyValue(storeGeneralSessions.current.endYear));
    console.log(storeGeneralSessions.current);
    form.setFieldsValue(storeGeneralSessions.current);
  }, [storeGeneralSessions.current]);

  const onFormSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeGeneralSessions.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.name}` });
          }
        }
        else {
          values.id = id;
          const record = await storeGeneralSessions.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({ message: 'Saved Successfully!', description: `Updated record for ${record.name}` });
          }
        }
        setSaveProgress({ saving: false, disableSubmit: true, disableForm: true });
      })
      .catch(() => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({ saving: false, disableSubmit: false, disableForm: false });
      });
  };

  const headerLabel = isNew ? 'Edit General Sessions' : 'Add General Sessions';

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
            <When condition={!isNew}>
              {() => (<>
                <Form.Item name="name" label="Name" rules={schemaRules} required>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Checkbox>I confirm to add the above record.</Checkbox>
                </Form.Item>
              </>)}
            </When>

            <When condition={isNew}>
              <Form.Item name="name" label="Name" rules={schemaRules} required>
                <Input />
              </Form.Item>
              <Form.Item>
                <Checkbox>I confirm to add the above record.</Checkbox>
              </Form.Item>
            </When>

          </Col>
        </Row>
      </Card>
    </Form>
  </div >);
};

export default GeneralSessionsEdit;
