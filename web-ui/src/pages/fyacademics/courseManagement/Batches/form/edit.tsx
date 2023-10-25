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

import * as modelBatches from '@/models/fyacademics/courseManagement/Batches';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useDivisions } from '@/store/fyacademics/courseManagement/useDivisions';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { todoLookUps } from '@/store/todoLookUps';

const BatchForm = () => {
  const { id, academicYear, semester, division } = useParams();
  const isNew = id === 'new';

  const settings = useSettings((state: any) => state.byKeys);
  const global = useGlobalState((state: any) => state.default);

  const levelOfEducation = React.useMemo(
    () => settings.get('level_of_education') || [],
    [settings],
  );
  const schemaRules = React.useMemo(
    () => schemaValidator(modelBatches.schemaRules, { settings }),
    [settings],
  );
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;

  const storeDivisions = useDivisions((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    optionsDivision: state.optionsDivision,
  }));
  const [form] = Form.useForm();
  const optionsDivision = storeDivisions.optionsDivision;

  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    // storeDivisions.getRecords(academicYear);
    form.setFieldValue('academicYear', academicYear);
    form.setFieldValue('departmentId', '1');
    form.setFieldValue('className', 'first');
    form.setFieldValue('semester', semester);
    form.setFieldValue('division', division);

    return () => {

    };
  }, [id]);
  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.id = id;
        updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const headerLabel = 'Add Batches';
  const batchoptions = todoLookUps.getState().batchoptions;
  const semesterOptions = todoLookUps.getState().semester;
  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Affix offsetBottom={12}>
              <Form.Item>
                {/* <Button type="primary" htmlType="submit" onSubmit={handleFormSubmit}> */}
                <Button type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </Affix>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item name="academicYear" label="Academic Year" required>
                <DisplaySelect options={optionsAcademicYear} />
              </Form.Item>

              <Form.Item
                name="departmentId"
                label="Department"
                style={{ display: 'none' }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="className"
                label="Class"
                style={{ display: 'none' }}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Department" required>
                <label>First Year Deaprtment</label>
              </Form.Item>
              <Form.Item label="Class" required>
                <label>First Year</label>
              </Form.Item>
              <Form.Item label="Division" name="division" required>
              <DisplaySelect options={optionsDivision} />
              </Form.Item>
              <Form.Item label="Semester" name="semester" required>
              <DisplaySelect options={semesterOptions} />
              </Form.Item>

                 <Form.Item name="numberOfBatches" label="No. of Batches" rules={schemaRules} required>
                    <Select options={batchoptions}></Select>

              </Form.Item>
 <Form.Item
                name ="agreement"
                label ="Once the batch/es are created, the no. of batches cannot be changed."
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should confirm updates.')),
                  },
                ]}
              >
                <Checkbox>I confirm to create the above mentioned no. of batches.</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BatchForm;
