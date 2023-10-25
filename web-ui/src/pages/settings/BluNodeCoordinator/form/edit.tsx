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
import * as modelBluNodeCoordinator from '@/models/settings/BluNodeCoordinator';
import { useBluNodeCoordinator } from '@/store/settings/useBluNodeCoordinator';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';

import { todoLookUps } from '@/store/todoLookUps';
import { isEmptyValue } from '@/utils/object';

const BluNodeCoordinatorEdit = () => {
  const { id, category } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const optionsLevelOfEducation = React.useMemo(
    () => settings.asSelect('level_of_education') || [],
    [settings.byKeys],
  );

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelBluNodeCoordinator.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const optionsCategory = todoLookUps.getState().bluNodeCoordinatorCategory;
  const options = optionsCategory.filter(
    (item: any) => item.value !== 'overall_coordinator',
  );
  const storeBluNodeCoordinator = useBluNodeCoordinator((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));
  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    optionsEmployee: state.optionsEmployee,
  }));

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeBluNodeCoordinator.getRecord(id);
    storeEmployeeDetails.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
  React.useEffect(() => {
    storeBluNodeCoordinator.getRecord(id);
    storeEmployeeDetails.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
  const optionsEmployee = storeEmployeeDetails.optionsEmployee;

  React.useEffect(() => {
    if (storeBluNodeCoordinator.current.id !== id) {
      return;
    }

    form.setFieldsValue(storeBluNodeCoordinator.current);
  }, [storeBluNodeCoordinator.current]);

  const onBack = () => {
    navigate('../list');
  };
  const onFormSubmit = () => {
    console.log(form.validateFields());
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeBluNodeCoordinator.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.degreeName}`,
            });
          }
        }
        else {
          values.id = id;
          const record = await storeBluNodeCoordinator.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.degreeName}`,
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
  let headerLabel = '';
  if (category === 'overall') {
    headerLabel = isNew
      ? 'Add BluNode Overall Coordinator'
      : 'Edit BluNode Overall Coordinator';
  }
  else {
    headerLabel = isNew
      ? 'Add BluNode Coordinator'
      : 'Edit BluNode Coordinator';
  }

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
              <When condition={category !== 'overall'}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={schemaRules}
                  required
                >
                  <Select options={options} />
                </Form.Item>
                <Form.Item
                  name="subCategory"
                  label="Sub Category"
                  required
                  rules={schemaRules}
                >
                  <Select options={optionsLevelOfEducation} />
                </Form.Item>
              </When>
              <When condition={isNew}>
              <Form.Item name="userId" required label="BluNode Coordinator" rules={schemaRules}>
                <Select options={optionsEmployee} mode="multiple" />
              </Form.Item>
              </When>
              <When condition={!isNew}>
              <Form.Item name="userId" required label="BluNode Coordinator" rules={schemaRules}>
                <Select options={optionsEmployee} />
              </Form.Item>
              </When>

            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BluNodeCoordinatorEdit;
