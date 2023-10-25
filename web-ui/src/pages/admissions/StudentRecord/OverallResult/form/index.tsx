import React from 'react';
import {
  Affix,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Select,
  notification,
} from 'antd';
import { When } from 'react-if';

import * as modal from '@/models/admissions/studentRecords/overallResultDetails';
import { useSettings } from '@/store/settings/useSettings';
import { useOverallResult } from '@/store/admissions/useOverallResultDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { OptionAsText } from '@/utils/getOptionsAsText';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const sem1Status = todoLookUps.getState().sem1Status;
const sem2Status = todoLookUps.getState().sem2Status;

const OverallResultForm = ({
  showAllFeilds,
  recordId,
  handleCancel,
}: {
  showAllFeilds: boolean;
  recordId: string;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const isNew = recordId === 'new';

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modal.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const store = useOverallResult((state: any) => ({
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

  React.useEffect(() => {
    store.getRecord(recordId);
    return () => {
      form.setFieldsValue({});
    };
  }, [recordId]);

  React.useEffect(() => {
    if (store.current.id !== recordId) {
      return;
    }
    form.setFieldsValue(store.current);
  }, [store.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await store.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.bankName}`,
            });
          }
        }
        else {
          const record = await store.updateRecord(recordId, values);
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
        handleCancel();
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

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
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
          <div className="layout-main-content">
            <Card>
              <Descriptions title="Academic Information" layout="vertical">
                <Descriptions.Item label="Academic Year">
                <YearAsText value={store.current.academicYear} />
                </Descriptions.Item>
                <Descriptions.Item label="Class">
                  <OptionAsText
                    value={store.current.className}
                    fieldName="className"
                  />
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item
                name="sem1Percentage"
                label="Sem1 %"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="sem1Sgpa"
                label="Sem1 SGPA"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="sem1Status"
                label="Sem1 Status"
                rules={schemaRules}
                required
              >
                <Select options={sem1Status} />
              </Form.Item>
              <When condition={showAllFeilds}>
                <Form.Item
                  name="sem2Percentage"
                  label="Sem2 %"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="sem2Sgpa"
                  label="Sem2 SGPA"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="sem2Status"
                  label="Sem2 Status"
                  rules={schemaRules}
                >
                  <Select options={sem2Status} />
                </Form.Item>
                <Form.Item
                  name="overallPercentage"
                  label="Overall %"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="overallCgpa"
                  label="Overall CGPA"
                  rules={schemaRules}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="overallResult"
                  label="Overall Status"
                  rules={schemaRules}
                >
                  <Select options={sem1Status} />
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

export default OverallResultForm;
