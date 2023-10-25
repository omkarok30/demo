import React, { useState } from 'react';
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
  notification,
} from 'antd';
import { When } from 'react-if';

import _ from 'lodash';
import * as modelToolAttainment from '@/models/Academics/courseEvaluationTools/ToolAttainment';
import { useSettings } from '@/store/settings/useSettings';
import { useToolAttainment } from '@/store/Academics/courseEvaluationTools/useToolAttainment';
import { schemaValidator } from '@/utils/validate';
import { useGlobalState } from '@/store/global';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';
import { todoLookUps } from '@/store/todoLookUps';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { DisplayInput } from '@/components/FormItem/DisplayInput';
import { useAcademicYear } from '@/store/settings/useAcademicYear';

const optionstoolType = todoLookUps.getState().toolType;
const optionstoolDependency = todoLookUps.getState().toolDependency;
const optionstoolAssessment = todoLookUps.getState().toolAssessment;
const ToolAttainmentEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const global = useGlobalState((state: any) => state.default);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelToolAttainment.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const storeToolAttainment = useToolAttainment((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    updateRecord: state.updateRecord,
  }));
  const storeAcademicTools = useToolsRepository((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const optionsAcademicYear = storeAcademicYear.comboByName;
  const [isDependenttool, setisDependenttool] = useState(false);

  const [form] = Form.useForm();

  React.useEffect(() => {
    storeToolAttainment.getRecord(id);
    storeAcademicYear.getAcademicYearDetails();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  const toolsAllRecord = storeAcademicTools.allRecords;
  React.useEffect(() => {
    storeAcademicTools.getRecords();

    if (storeToolAttainment.current.id !== id) {
      return;
    }
    const toolsrecord = _.filter(
      toolsAllRecord,
      record => record.id === storeToolAttainment.current.toolId,
    );
    form.setFieldValue('toolName', toolsrecord[0].toolName);
    form.setFieldValue('toolDependency', toolsrecord[0].toolDependency);
    form.setFieldValue('toolType', toolsrecord[0].toolType);
    form.setFieldValue('toolAssesment', toolsrecord[0].toolAssessment);
    if (toolsrecord[0].toolDependency === 'independent') {
      setisDependenttool(false);
    }
    else {
      setisDependenttool(true);
    }
    form.setFieldsValue(storeToolAttainment.current);
  }, [storeToolAttainment.current]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.id = id;
        storeToolAttainment.updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };

  const headerLabel = isNew ? 'Edit Tool Attainment' : 'Add Tool Attainment';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical">
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <div offsetBottom={12}>
              <Form.Item>
                <Button type="primary" onClick={onFormSubmit}>
                  Submit
                </Button>
              </Form.Item>
            </div>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <When condition={!isNew}>
                {() => (
                  <>
                    <Form.Item
                      name="academicYear"
                      label="Academic Year"
                      rules={schemaRules}
                    >
                      <DisplaySelect options={optionsAcademicYear} />
                    </Form.Item>
                    <Form.Item
                      name="toolName"
                      label="Tool Name"
                    >
                      <DisplayInput />
                    </Form.Item>
                    <Form.Item
                      name="toolType"
                      label="Tool Type"
                    >
                      <DisplaySelect options={optionstoolType} />
                    </Form.Item>
                    <Form.Item
                      name="toolDependency"
                      label="Tool Depandency"
                    >
                      <DisplaySelect options={optionstoolDependency} />
                    </Form.Item>
                    <When condition={!isDependenttool}>
                    <Form.Item
                      name="toolAssesment"
                      label="Tool Assesment Method"
                    >
                      <DisplaySelect options={optionstoolAssessment} />
                    </Form.Item>
                    </When>
                    <Row >
                      <Col span={7}> <Form.Item
                      name=""
                      label="Attainment Level* (Percentage of students scoring Marks more than Target Marks)
                      "
                    >
                    </Form.Item></Col>
                    <Col span={5}>
                    <Form.Item
                      name="targetPer1"
                      label="Level 1"
                      rules={schemaRules}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="targetPer2"
                      label="Level 2"
                      rules={schemaRules}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="targetPer3"
                      label="Level 3"
                      rules={schemaRules}
                    >
                      <Input />
                    </Form.Item>

                    </Col>

                    </Row>
                  </>
                )}
              </When>

              <When condition={isNew}>
                <Form.Item
                  name="toolId"
                  label="Tool Type"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="toolName"
                  label="Tool Name"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="toolDependency"
                  label="Tool Dependency"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="toolAssesment"
                  label="Tool Assessment Method"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="targetPer1"
                  label="Level 1"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="targetPer2"
                  label="Level 2"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="targetPer3"
                  label="Level 3"
                  rules={schemaRules}
                  required
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

export default ToolAttainmentEdit;
