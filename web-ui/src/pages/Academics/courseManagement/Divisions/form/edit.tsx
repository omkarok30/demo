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
  Space,
  notification,
} from 'antd';

import { When } from 'react-if';
import { size } from 'lodash';
import * as modelDivision from '@/models/fyacademics/courseManagement/Divisions';
import { useSettings } from '@/store/settings/useSettings';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
import { schemaValidator } from '@/utils/validate';
import { DisplaySelect } from '@/components/FormItem/DisplaySelect';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';

const DivisionForm = () => {
  const { id, semester, division, academicYear, departmentId, programId, className } = useParams();

  const settings = useSettings((state: any) => state.byKeys);

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
    allRecordsClassWise: state.allRecordsClassWise,
    getRecordClassWise: state.getRecordClassWise,
    updateRecord: state.updateRecord,
  }));
  const [form] = Form.useForm();

  React.useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    form.setFieldValue('academicYear', academicYear);
    form.setFieldValue('departmentId', departmentId);
    form.setFieldValue('className', className);
    form.setFieldValue('programId', programId);

    // console.log(storeDivisions.allRecordsClassWise[0].id);
    storeDivisions.allRecordsClassWise?.map((item: any, index) => {
      form.setFieldValue(`division${index}`, item.division);
    });
    return () => {
      // clearAcademicYearDetail();
      // form.setFieldsValue(storeDivisions.allRecordsClassWise);
    };
  }, [id]);

  React.useEffect(() => {
    storeDivisions.getRecordClassWise(academicYear, programId, className);
  }, [academicYear, programId]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        values.id = id;
        storeDivisions.updateRecord(id, values);
      })
      .catch(() => {
        notification.error({
          message: 'Validations failed',
        });
      });
  };
  const olddivisionCount = size(storeDivisions.allRecordsClassWise);
  const newcnt = olddivisionCount;
  const divisionCount = size(storeDivisions.allRecordsClassWise) + 1;
  const renderFormElements = () =>
    storeDivisions.allRecordsClassWise?.map((item: any, index) => {
      let intexcnt = index;
      return (
        <Form.Item
          name={`division${index}`}
          label={`Division No: ${++intexcnt}`}
        >
          <Input />
        </Form.Item>
      );
    });
  const headerLabel = 'Add/Update Divisions';

  const oldDivisionCount = size(storeDivisions.allRecordsClassWise);
  const [fields, setFields] = useState([{}]);
  const [newDivisionCnt, setNewDivisioncnt] = useState(divisionCount - 1);
  const [showRemoveButton, setshowRemoveButton] = useState(true);
  const oldsize = size(storeDivisions.allRecordsClassWise);
  const [newsize, setNewsize] = useState(0);
  const addDynamicFields = () => {
    let cnt = newDivisionCnt;
    const newcnt = ++cnt;
    let newsizecnt = newsize;
    const sizeofdivision = ++newsizecnt;
    if (newsize === 0) {
      setFields([{ counter: newcnt }]);
    }
    else {
      const newInputObj = { counter: newcnt };
      fields.splice(newDivisionCnt, 0, newInputObj);
      setFields([...fields]);
    }
    setNewDivisioncnt(newcnt);
    setNewsize(sizeofdivision);
  };
  const removeDynamicFields = () => {
    if (fields.length !== divisionCount) {
      fields.splice(-1);
      setFields([...fields]);
      let cnt = newDivisionCnt;
      setNewDivisioncnt(--cnt);
    }

    if (newDivisionCnt === divisionCount) {
      setshowRemoveButton(false);
    }
  };
  // fields.shift();

  const renderDynamicelement = (index: any) => {
    return (
      <Form.Item name={`division${index}`} label={`Division No: ${index}`}>
        <Input />
      </Form.Item>
    );
  };
  const isbuttonClicked = 'true';
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

              {renderFormElements()}
              {
              fields?.map((item: any, index: any) => (
                <Form.Item
                  name={`division${item.counter}`}
                  label={`Division No: ${item.counter}`}
                >
                  <Input />
                </Form.Item>
              ))}

              <Form.Item>
                <Button onClick={addDynamicFields}>Add Division</Button>
                <Space></Space>
                <When condition={showRemoveButton}>
                  <Button onClick={removeDynamicFields}>Remove</Button>
                </When>
              </Form.Item>
              <Form.Item
                name="agreement"
                label="Once a division is created, it cannot be deleted."
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
                  I confirm to create the above selected number of divisions.
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default DivisionForm;
