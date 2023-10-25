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

import * as modelDivision from '@/models/fyacademics/courseManagement/Divisions';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { todoLookUps } from '@/store/todoLookUps';
import { useProgramDetails } from '@/store/settings/useProgramDetails';

const BatchForm = () => {
  const { id, academicYear, semester, division, departmentId, programId, className } = useParams();
  const isNew = id === 'new';

  const settings = useSettings((state: any) => state.byKeys);
  const global = useGlobalState((state: any) => state.default);

  const levelOfEducation = React.useMemo(
    () => settings.get('level_of_education') || [],
    [settings],
  );
  const schemaRules = React.useMemo(
    () => schemaValidator(modelDivision.schemaRules, { settings }),
    [settings],
  );
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;

  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
    optionsAllPrograms: state.optionsAllPrograms,
  }));
  const optionsPrograms = storeProgramDetails.optionsAllPrograms;
  const optionsclass = todoLookUps.getState().className;
  const storeDivisions = useDivisions((state: any) => ({
    current: state.current,
    getRecord: state.getRecord,
    optionsDivision: state.optionsDivision,
  }));
  const [form] = Form.useForm();
  const optionsDivision = storeDivisions.optionsDivision;

  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeDivisions.getRecord(id);
  
    form.setFieldValue('academicYear', academicYear);
    form.setFieldValue('departmentId', departmentId);
    form.setFieldValue('className', className);
    form.setFieldValue('programId', programId);
    form.setFieldValue('semester', semester);
    form.setFieldValue('division', division);

    return () => {};
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

  const headerLabel = 'Add/Update Divisions';
  const batchoptions = todoLookUps.getState().batchoptions;
  const semesterOptions = todoLookUps.getState().semester;
  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <div offsetBottom={12}>
              <Form.Item>
                {/* <Button type="primary" htmlType="submit" onSubmit={handleFormSubmit}> */}
                <Button type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </div>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <Form.Item name="academicYear" label="Academic Year">
                <DisplaySelect options={optionsAcademicYear} />
              </Form.Item>

              <Form.Item
                name="departmentId"
                label="Department"
                style={{ display: 'none' }}
              >
                <Input />
              </Form.Item>

              <Form.Item name="programId" label="Program">
                <DisplaySelect options={optionsPrograms} />
              </Form.Item>
              <Form.Item name="className" label="Class">
                <DisplaySelect options={optionsclass} />
              </Form.Item>
              <Form.Item label="Division" name="division" required>
                <DisplaySelect options={optionsDivision} />
              </Form.Item>
              <Form.Item label="Semester" name="semester" required>
                <DisplaySelect options={semesterOptions} />
              </Form.Item>

              <Form.Item name="numberOfBatches" label="No. of Batches" required>
                <Select options={batchoptions}></Select>
              </Form.Item>
              <Form.Item
                name="agreement"
                label="Once the batch/es are created, the no. of batches cannot be changed."
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
                <Checkbox>
                  I confirm to create the above mentioned no. of batches.
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default BatchForm;
