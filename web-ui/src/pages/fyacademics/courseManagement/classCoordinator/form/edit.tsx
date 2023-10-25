import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Affix,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Row,
  Select,
  notification,
} from 'antd';
import * as modelClassCoordinator from '@/models/fyacademics/courseManagement/ClassCoordinator';
import { useSettings } from '@/store/settings/useSettings';
import { useClassCoordinator } from '@/store/fyacademics/courseManagement/useClassCoordinator';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';

import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { isEmptyValue } from '@/utils/object';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const ClassCoordinatorEdit = () => {
  const { id, division, semester, academicYear } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelClassCoordinator.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeClassCoordinator = useClassCoordinator((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));
  const storeEmployee = useEmployeeDetails((state: any) => ({
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
    storeClassCoordinator.getRecord(id);
    storeEmployee.getRecords(id);
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);
  const [divisionLabel, setDivisionLabel] = useState();

  React.useEffect(() => {
    setDivisionLabel(storeClassCoordinator.current.divisions$division);
    form.setFieldValue('academicYear', academicYear);
    form.setFieldValue('semester', semester);
    form.setFieldValue('division', division);
    if (storeClassCoordinator.current.id !== id) {
      return;
    }

    form.setFieldsValue(storeClassCoordinator.current);
  }, [storeClassCoordinator.current]);

  const onBack = (academicYear) => {
    navigate(`../back_class_cordinator/${academicYear}}`,
      {
        state: { academiYear: academicYear },
      },
    );
  };

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeClassCoordinator.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.academicYear}`,
            });
          }
        }
        else {
          values.id = id;
          const record = await storeClassCoordinator.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.academicYear}`,
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

  const headerLabel = isNew ? 'Add Class Coordinator' : 'Add Class Coordinator';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit} style={{ marginRight: '10px' }}>
                  Submit
                </Button>
                <Button type="default" onClick={onBack}>
                  Back
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
        <Descriptions layout="horizontal">
          <Descriptions.Item label="Academic Year"><YearAsText value={academicYear}></YearAsText></Descriptions.Item>
          <Descriptions.Item label="Degree Level">UG</Descriptions.Item>
          <Descriptions.Item label="Semester">{ semester === '1' ? 'Semester I' : 'Semester II' }</Descriptions.Item>
          <Descriptions.Item label="Department">First Year Department</Descriptions.Item>
          <Descriptions.Item label="Class Name">First Year</Descriptions.Item>
          <Descriptions.Item label="Division">{divisionLabel}</Descriptions.Item>
        </Descriptions>
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item name="userId" label="Class Coordinator" rules={schemaRules} required>
                <Select options={storeEmployee.optionsEmployee} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default ClassCoordinatorEdit;

