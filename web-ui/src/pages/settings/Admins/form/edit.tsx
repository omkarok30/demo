import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Affix,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  notification,
} from 'antd';

import { When } from 'react-if';
import { useSettings } from '@/store/settings/useSettings';
import { schemaValidator } from '@/utils/validate';
import * as modelUsers from '@/models/Users/userProfile';
import { useAdmin } from '@/store/settings/useAdmin';
import { isEmptyValue } from '@/utils/object';

const AdminEdit = () => {
  const { id, category } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelUsers.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeAdmin = useAdmin((state: any) => ({
    getUsers: state.getUsers,
    optionsUsers: state.optionsUsers,
    addRecord: state.addRecord,
  }));

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeAdmin.getUsers();
  }, [id]);
  const optionsUser = storeAdmin.optionsUsers;

  const onBack = () => {
    navigate('../list');
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeAdmin.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.degreeName}`,
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

  const headerLabel = isNew
    ? 'Add Admin'
    : 'Edit Admin';

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
                  style={{ marginRight: '10px' }}
                >
                  Submit
                </Button>
                <Button type="default" onClick={onBack}>
                  Back
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item name="userId" required label="BluNode Coordinator" rules={schemaRules}>
                <Select options={optionsUser} />
              </Form.Item>

            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AdminEdit;
