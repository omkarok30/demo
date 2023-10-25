import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Form,
  Radio,
  Row,
  Select,
  notification,
} from 'antd';
import { When } from 'react-if';
import _ from 'lodash';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import * as modelCourseFacultyLinking from '@/models/Academics/courseManagement/courseFacultyLinking/CourseFacultyLinking';
import { useSettings } from '@/store/settings/useSettings';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { schemaValidator } from '@/utils/validate';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useCourseFacultyLinking } from '@/store/Academics/courseManagement/courseFacultyLinking/useCourseFacultyLinking';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
import { useManageCoursesDetails } from '@/store/Academics/courseManagement/manageCourses/useManageCoursesDetails';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';
const toolTypes = todoLookUps.getState().toolTypes;

const CourseFacultyLinkingEdit = () => {
  const navigate = useNavigate();
  const { ay, pi, cl, sem, div } = useParams();
  const { id } = useParams();
  const isNew = id === 'new';
  const yesNo = todoLookUps.getState().yesNo;
  const optionsClassNames = todoLookUps.getState().className;
  const optionsSemesters = todoLookUps.getState().semester;
  const optionsTrimesters = todoLookUps.getState().trimester;
  const optionsDivision = todoLookUps.getState().division;
  const [semester, setSemester] = useState(optionsSemesters);
  const [activeRadioState, setActiveRadioState] = useState([0]);
  // let activeRadioState: any = [];
  const [isConfirm, setIsConfirm] = React.useState(false);

  const storeCourseFacultyLinking = useCourseFacultyLinking((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
  }));
  const storeAcademicYearDetails = useAcademicYear((state: any) => ({
    allAcademicYearDetails: state.allRecords,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeDivisions = useDivisions((state: any) => ({
    allRecordsClassWise: state.allRecordsClassWise,
  }));
  const storeManageCourses = useManageCoursesDetails((state: any) => ({
    getRecords: state.getRecords,
    allRecords: state.allRecords,
  }));
  const storeAcademicTools = useToolsRepository((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  React.useEffect(() => {
    storeManageCourses.getRecords('', pi);
  }, [pi]);
  const optionsTools: any = _.map(storeAcademicTools.allRecords, record => ({
    value: record.id,
    label: record.toolName,
  }));
  const optionsManageCourses: any = _.map(
    storeManageCourses.allRecords,
    record => ({ value: record.id, label: record.name }),
  );
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));
  React.useEffect(() => {
    storeCourseFacultyLinking.getRecord(id);
    storeAcademicTools.getRecords();
  }, [id]);

  const DivisionAsText = (id) => {
    if (storeDivisions.allRecordsClassWise) {
      const data = storeDivisions.allRecordsClassWise.filter(e => e.id == id);
      return data[0]?.division;
    }
  };
  React.useEffect(() => {
    // console.log(
    //   "storeCourseFacultyLinking current",
    //   storeCourseFacultyLinking.current
    // );
  }, [storeCourseFacultyLinking.current]);

  React.useEffect(() => {
    settings.fetchSettings();
    storeProgramDetails.getRecords();
    storeAcademicYearDetails.getAcademicYearDetails();
    if (programDetails[0]?.examinationPattern == 'semester') {
      const semestersDetails = _.filter(
        optionsSemesters,
        record => record.value === sem,
      );
      setSemester(semestersDetails);
    }
    else if (programDetails[0]?.examinationPattern == 'trimester') {
      const trimestersDetails = _.filter(
        optionsTrimesters,
        record => record.value === sem,
      );
      setSemester(trimestersDetails);
    }
    else {
      const semestersDetails = _.filter(
        optionsSemesters,
        record => record.value === sem,
      );
      setSemester(semestersDetails);
    }
  }, []);

  const academicYearDetails = _.filter(
    storeAcademicYearDetails.allAcademicYearDetails,
    record => record.yearAt.toString() === ay,
  );
  const programDetails = _.filter(
    storeProgramDetails.allRecords,
    record => record.id === pi,
  );
  const classDetails = _.filter(
    optionsClassNames,
    record => record.value === cl,
  );

  const divisionDetails = _.filter(
    optionsDivision,
    record => record.value === div,
  );
  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelCourseFacultyLinking.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );
  const courseCount = 0;
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsConfirm(true);
    }
    else {
      setIsConfirm(false);
    }
  };
  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  const oldCourseCount = 0;
  const oldInsideCount = 0;
  const [fields, setFields] = useState([{ counter: oldCourseCount }]);
  const [insideFields, setInsideFields] = useState([
    { counter: oldInsideCount },
  ]);
  const [showRemoveButton, setshowRemoveButton] = useState(true);
  const [showRemoveButtonInside, setshowRemoveButtonInside] = useState(true);
  const [newCourseCnt, setNewCoursecnt] = useState(courseCount);
  const [newCourseCntInside, setNewCoursecntInside] = useState(courseCount);
  const oldsize = 0;
  const oldsizeInside = 0;

  const addDynamicFields = () => {
    setshowRemoveButton(true);
    let cnt = newCourseCnt;
    const newcnt = ++cnt;
    const newInputObj = { counter: newcnt };
    fields.splice(newCourseCnt, 0, newInputObj);
    setFields([...fields]);
    setNewCoursecnt(newcnt);
  };
  const removeDynamicFields = () => {
    if (fields.length !== courseCount) {
      fields.splice(-1);
      setFields([...fields]);
      let cnt = newCourseCnt;
      setNewCoursecnt(--cnt);
    }
    if (fields.length === courseCount) {
      setshowRemoveButton(false);
    }
  };
  const addDynamicInsideFields = () => {
    setshowRemoveButtonInside(true);
    let cnt = newCourseCntInside;
    const newcnt = ++cnt;
    const newInputObj = { counter: newcnt };
    insideFields.splice(newCourseCntInside, 0, newInputObj);
    setInsideFields([...insideFields]);
    setNewCoursecntInside(newcnt);
  };
  const removeDynamicInsideFields = () => {
    if (insideFields.length !== oldInsideCount) {
      insideFields.splice(-1);
      setInsideFields([...insideFields]);
      let cnt = newCourseCntInside;
      setNewCoursecnt(--cnt);
    }
    if (insideFields.length === oldInsideCount) {
      setshowRemoveButton(false);
    }
  };
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        navigate(
          `../edit/${form.getFieldValue('academicYear')}/${form.getFieldValue(
            'programId',
          )}/${form.getFieldValue('className')}/${form.getFieldValue(
            'semester',
          )}/${form.getFieldValue('division')}`,
        );
        // const record = await storeManageCourses.addRecord(values);
        // if (!isEmptyValue(record)) {
        //   notification.success({ message: 'Saved Successfully!', description: `Created record for ${record.toolName}` });
        // }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(async (values) => {
        notification.error({ message: 'Validations failed' });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };
  const onFormReset = () => {
    form.resetFields();
  };
  const onRadioChange = (key, event: any) => {
    if (event === 1) {
      setActiveRadioState((nums: any) =>
        nums.includes(key) ? nums : [key, ...nums],
      );
    }
    else {
      setActiveRadioState((nums: any) =>
        nums.includes(key) ? nums.filter(n => n !== key) : nums,
      );
    }
  };
  const onCourseAdd = (value) => {
    setActiveRadioState((nums: any) =>
      nums.includes(form.getFieldValue('Courses').length - 1)
        ? nums
        : [form.getFieldValue('Courses').length - 1, ...nums],
    );
  };
  const removeitem = (keys) => {
    const element = keys.at(-1);
    return element.name;
  };
  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card bordered={false} title="Assign Course To Academic Year">
          <Row justify={'center'}>
            <Col>
              <When condition={!isNew}>
                <Descriptions column={24}>
                  <Descriptions.Item label="Academic Year" span={12}>
                    {academicYearDetails[0]?.year}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Program"
                    span={12}
                  >{`${programDetails[0]?.programmeName} (${programDetails[0]?.programCode})`}</Descriptions.Item>
                  <Descriptions.Item label="Class" span={12}>
                    {classDetails[0]?.label}
                  </Descriptions.Item>
                  <Descriptions.Item label="Semester" span={12}>
                    {semester[0]?.label}
                  </Descriptions.Item>
                  <Descriptions.Item label="Division" span={12}>
                    <span style={{ textTransform: 'uppercase' }}>
                      {DivisionAsText(div)}
                    </span>
                  </Descriptions.Item>
                </Descriptions>
              </When>
            </Col>
          </Row>
          <Divider></Divider>
          <Row justify={'center'}>
            <Col
              xs={24}
              xl={4}
              style={{ fontWeight: 500, paddingLeft: 10, paddingRight: 10 }}
            >
              Sr. No
            </Col>
            <Col
              xs={24}
              xl={5}
              style={{ fontWeight: 500, paddingLeft: 10, paddingRight: 10 }}
            >
              Courses
            </Col>
            <Col
              xs={24}
              xl={5}
              style={{ fontWeight: 500, paddingLeft: 10, paddingRight: 10 }}
            >
              Consider for Result
            </Col>
            <Col
              xs={24}
              xl={5}
              style={{ fontWeight: 500, paddingLeft: 10, paddingRight: 10 }}
            >
              Tools For Final Result
            </Col>
            <Col
              xs={24}
              xl={5}
              style={{ fontWeight: 500, paddingLeft: 10, paddingRight: 10 }}
            ></Col>
          </Row>
          <Divider></Divider>

          <Form.List name="Courses" initialValue={[{ courseId: '', consider_for_result: 1 }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Row justify={'center'} style={{ marginTop: 30 }}>
                      <Col
                        xs={24}
                        xl={4}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        {key + 1}
                      </Col>
                      <Col
                        xs={24}
                        xl={5}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Form.Item {...restField} name={[name, 'courseId']}>
                          <Select
                            style={{ width: '100%' }}
                            value={academicYearDetails}
                            options={optionsManageCourses}
                            // onChange={event => setDivisionDetailsEvent(event)}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        xs={24}
                        xl={5}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <Form.Item name={[name, 'consider_for_result']}>
                          <Radio.Group
                            onChange={event =>
                              onRadioChange(key, event.target.value)
                            }
                            defaultValue={1}
                          >
                            <Radio value={1}>Yes</Radio>
                            <Radio value={2}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col
                        xs={24}
                        xl={10}
                        style={{ paddingLeft: 10, paddingRight: 10 }}
                      >
                        <When
                          // condition={
                          //   form.getFieldValue("consider_for_result") == 1
                          // }
                          condition={activeRadioState.includes(key)}
                        >
                          <Form.List name={[name, 'Tools']} initialValue={[{ tool: '', tool_type: '' }]}>
                            {(fields, { add, remove }) => (
                              <>
                                {fields.map(({ key, name, ...restField }) => (
                                  <>
                                    <Row>
                                      <Col
                                        xs={22}
                                        xl={10}
                                        style={{
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                        }}
                                      >
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'tool']}
                                        >
                                          <Select
                                            style={{ width: '100%' }}
                                            value={academicYearDetails}
                                            options={optionsTools}
                                            // onChange={event => setDivisionDetailsEvent(event)}
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col
                                        xs={22}
                                        xl={10}
                                        style={{
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                        }}
                                      >
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'tool_type']}
                                        >
                                          <Select
                                            style={{ width: '100%' }}
                                            value={academicYearDetails}
                                            options={toolTypes}
                                            dropdownStyle={{
                                              textTransform: 'uppercase',
                                            }}
                                            // onChange={event => setDivisionDetailsEvent(event)}
                                          />
                                        </Form.Item>
                                      </Col>
                                      {/* <MinusCircleOutlined
                                    onClick={() => {
                                      remove(name);
                                    }}
                                  /> */}
                                    </Row>
                                    <When
                                      condition={
                                        removeitem(fields) === name && name != 0
                                      }
                                    >
                                      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                          type="primary"
                                          danger
                                          onClick={() =>
                                            remove(removeitem(fields))
                                          }
                                          block
                                          style={{
                                            fontSize: 12,
                                            width: 70,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 20,
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </Form.Item>
                                    </When>
                                  </>
                                ))}
                                <Form.Item
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    style={{
                                      color: '#fff',
                                      background: 'green',
                                      fontSize: 12,
                                      width: 70,
                                      height: 20,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    Add Tool
                                  </Button>
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </When>
                      </Col>
                      {/* <Button
                    type="primary"
                    onClick={() => {
                      remove(name);
                    }}
                    block
                    danger
                    style={{ fontSize:12,width: 70,height:20,display:'flex',justifyContent:'center',alignItems:'center' }}
                  >
                    Remove
                  </Button> */}
                    </Row>
                    <When condition={removeitem(fields) === name && name != 0}>
                      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          type="primary"
                          danger
                          onClick={() => remove(removeitem(fields))}
                          block
                          style={{
                            fontSize: 12,
                            width: 70,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 20,
                          }}
                        >
                          Remove
                        </Button>
                      </Form.Item>
                    </When>
                  </>
                ))}
                <Form.Item
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    className="my-3"
                    type="dashed"
                    onClick={() => {
                      add();
                      onCourseAdd('add');
                    }}
                    block
                    style={{
                      color: '#fff',
                      background: 'green',
                      fontSize: 12,
                      width: 70,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 20,
                    }}
                  >
                    Add Course
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            style={{ display: 'flex', justifyContent: 'center' }}
            name="agreement"
            label="Once a course is assigned to a division, the process cannot be reversed. Also selected tools for final result cannot be updated/deleted."
            // valuePropName="checked"
            // rules={[
            //   {
            //     validator: (_, value) =>
            //       value
            //         ? Promise.resolve()
            //         : Promise.reject(new Error('Should confirm updates.')),
            //   },
            // ]}
          >
            <Checkbox checked={isConfirm} onChange={onChange}>
              I confirm to assign the above selected courses and respective
              tools for final result to the selected division.
            </Checkbox>
          </Form.Item>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                style={{ margin: 5 }}
                onClick={onFormSubmit}
                disabled={!isConfirm}
              >
                Submit
              </Button>
              <Button
                type="default"
                style={{ margin: 5 }}
                onClick={onFormReset}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CourseFacultyLinkingEdit;
