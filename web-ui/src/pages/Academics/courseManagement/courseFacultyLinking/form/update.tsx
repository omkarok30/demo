import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Radio,
  Row,
  Select,
  notification,
} from 'antd';
import { When } from 'react-if';
import _ from 'lodash';

import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useSettings } from '@/store/settings/useSettings';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useCourseFacultyLinking } from '@/store/Academics/courseManagement/courseFacultyLinking/useCourseFacultyLinking';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
import { ProgramAsText } from '@/components/Renderers/ProgramAsText';
import { isEmptyValue } from '@/utils/object';
import { useEmployeeDetails } from '@/store/employee/useEmployeeDetails';
import { useToolsRepository } from '@/store/Academics/courseEvaluationTools/useToolsRepository';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const toolTypes = todoLookUps.getState().toolTypes;
const facultyDropdownOptions = todoLookUps.getState().facultyDropdownOptions;
const CourseFacultyLinkingEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === 'new';
  const [batch, setBatch] = useState([]);
  const [internshipObject, setInternshipObject] = useState({
    internshipFaculty: '',
    internshipHours: '',
  });
  const [selfObject, setSelfObject] = useState({
    selfFaculty: '',
    selfHours: '',
  });
  const [isConfirm, setIsConfirm] = React.useState(false);

  const [practicalFaculty, setPracticalFaculty] = useState('');
  const [TutorialFacultyType, setTutorialFacultyType] = useState('');
  const [ProjectFacultyType, setProjectFacultyType] = useState('');

  const storeCourseFacultyLinking = useCourseFacultyLinking((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    getToolsRecord: state.getToolsRecord,
    getPracticalRecord: state.getPracticalRecord,
    getProjectRecord: state.getProjectRecord,
    getTheoryRecord: state.getTheoryRecord,
    getTutorialRecord: state.getTutorialRecord,

    toolsRecords: state.toolsRecords,
    practicalRecords: state.practicalRecords,
    projectRecords: state.projectRecords,
    theoryRecords: state.theoryRecords,
    tutorialRecords: state.tutorialRecords,
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
  const storeEmployeeDetails = useEmployeeDetails((state: any) => ({
    getRecords: state.getRecords,
    allRecords: state.allRecords,
  }));
  const storeAcademicTools = useToolsRepository((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const optionsEmployee: any = _.map(
    storeEmployeeDetails.allRecords,
    record => ({
      value: record.id,
      label: `${record.firstName} ${record.middleName} ${record.lastName}`,
    }),
  );
  const optionsTools: any = _.map(storeAcademicTools.allRecords, record => ({
    value: record.id,
    label: record.toolName,
  }));
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));
  React.useEffect(() => {
    storeCourseFacultyLinking.getRecord(id);
    storeEmployeeDetails.getRecords();
    storeAcademicTools.getRecords();
    storeCourseFacultyLinking.getToolsRecord(id);
    storeCourseFacultyLinking.getPracticalRecord(id);
    storeCourseFacultyLinking.getProjectRecord(id);
    storeCourseFacultyLinking.getTheoryRecord(id);
    storeCourseFacultyLinking.getTutorialRecord(id);
  }, [id]);
  React.useEffect(() => {
    form.resetFields();
  }, [storeCourseFacultyLinking?.toolsRecords]);

  React.useEffect(() => {
    if (storeCourseFacultyLinking?.practicalRecords) {
      const istrue = storeCourseFacultyLinking?.practicalRecords.some(
        item => item.batchNo == '1',
      );
      if (istrue) {
        const type: any = facultyDropdownOptions.find(
          e => e.value == 'batchwise',
        );
        form.setFieldValue('practicalFacultyDropdown', 'batchwise');
      }
    }
  }, [storeCourseFacultyLinking?.practicalRecords]);
  React.useEffect(() => {
    if (storeCourseFacultyLinking?.tutorialRecords) {
      const istrue = storeCourseFacultyLinking?.tutorialRecords.some(
        item => item.batchNo == '1',
      );
      if (istrue) {
        const type: any = facultyDropdownOptions.find(
          e => e.value == 'batchwise',
        );
        setTutorialFacultyType(type);
        form.setFieldValue('tutorialFacultyDropdown', 'batchwise');
      }
    }
  }, [storeCourseFacultyLinking?.tutorialRecords]);
  React.useEffect(() => {
    if (storeCourseFacultyLinking?.projectRecords) {
      const istrue = storeCourseFacultyLinking?.projectRecords.some(
        item => item.batchNo == '1',
      );
      if (istrue) {
        const type: any = facultyDropdownOptions.find(
          e => e.value == 'batchwise',
        );
        setProjectFacultyType(type);
        form.setFieldValue('projectFacultyDropdown', 'batchwise');
      }
    }
  }, [storeCourseFacultyLinking?.projectRecords]);
  const DivisionAsText = (id) => {
    if (storeDivisions.allRecordsClassWise) {
      const data = storeDivisions.allRecordsClassWise.filter(e => e.id == id);
      return data[0]?.division;
    }
  };
  React.useEffect(() => {
    const test: any = [];
    for (
      let index = 0;
      index < parseInt(storeCourseFacultyLinking.current.batch);
      index++
    ) {
      test.push(index + 1);
    }
    setBatch(test);
    setInternshipObject({
      internshipFaculty: storeCourseFacultyLinking?.current?.internshipFaculty,
      internshipHours: storeCourseFacultyLinking?.current?.internshipHours,
    });
    setSelfObject({
      selfFaculty: storeCourseFacultyLinking.current?.selfFaculty,
      selfHours:
        storeCourseFacultyLinking.current?.selfFaculty?.selflearningHours,
    });
  }, [storeCourseFacultyLinking.current]);

  React.useEffect(() => {
    settings.fetchSettings();
    storeProgramDetails.getRecords();
    storeAcademicYearDetails.getAcademicYearDetails();
  }, []);

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });

        const record = await storeCourseFacultyLinking.addRecord(values);
        if (!isEmptyValue(record)) {
          notification.success({
            message: 'Saved Successfully!',
            description: `Created record for ${record.toolName}`,
          });
        }
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
  const onNavigateToBack = () => {
    // navigate(`academics/course_management/course_faculty_linking/list`);
  };
  const removeitem = (keys) => {
    const element = keys.at(-1);
    return element.name;
  };
  const getFacultyName = (index, method) => {
    if (method == 'practical' && storeCourseFacultyLinking?.practicalRecords) {
      const test = storeCourseFacultyLinking?.practicalRecords[index - 1];
      return test || { batchNo: index, practicalFaculty: '', practicalHours: '' };
    }
    else if (
      method == 'tutorial'
      && storeCourseFacultyLinking?.tutorialRecords
    ) {
      const test = storeCourseFacultyLinking?.tutorialRecords[index - 1];

      return test || { batchNo: index, tutorialFaculty: '', tutorialHours: '' };
    }
    else if (
      method == 'project'
      && storeCourseFacultyLinking?.projectRecords
    ) {
      const test = storeCourseFacultyLinking?.projectRecords[index - 1];

      return test || { batchNo: index, projectFaculty: '', projectHours: '' };
    }
  };
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsConfirm(true);
    }
    else {
      setIsConfirm(false);
    }
  };
  const render = (method) => {
    return (
      <Form.List
        name={method}
        initialValue={
          method == 'theory'
            ? storeCourseFacultyLinking?.theoryRecords
            : method == 'industrial'
              ? [internshipObject]
              : [selfObject]
        }
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <>
                <Row style={{ marginTop: 30 }}>
                  <Col
                    xs={24}
                    xl={4}
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                    }}
                  >
                    {method} Faculty
                  </Col>
                  <Col
                    xs={24}
                    xl={5}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    <Form.Item {...restField} name={[name, `${method}Faculty`]}>
                      <Select
                        style={{ width: '100%' }}
                        options={optionsEmployee}

                        // onChange={event => setDivisionDetailsEvent(event)}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={4}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    No. of hrs. per week
                  </Col>
                  <Col
                    xs={24}
                    xl={5}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    <Form.Item name={[name, `${method}Hours`]}>
                      <Input type="number" />
                    </Form.Item>
                  </Col>

                  {/* <When condition={key != 0}>
                  <Button
                    type="primary"
                    onClick={() => {
                      remove(name);
                    }}
                    block
                    danger
                    style={{
                      fontSize: 12,
                      width: 70,
                      height: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    Remove
                  </Button>
                </When> */}
                </Row>
                <Row>
                  <Col
                    xs={4}
                    xl={4}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  ></Col>
                  <Col
                    xs={20}
                    xl={20}
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    {' '}
                    <div style={{ display: 'flex' }}>
                      <When
                        condition={
                          removeitem(fields) === name && method == 'theory'
                        }
                      >
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              add();
                            }}
                            block
                            style={{
                              color: '#fff',
                              background: 'green',
                              fontSize: 12,
                              width: 150,
                              height: 20,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textTransform: 'capitalize',
                            }}
                          >
                            Add {method} Faculty
                          </Button>
                        </Form.Item>
                      </When>
                      <When
                        condition={
                          removeitem(fields) === name
                          && form.getFieldValue(`${method}`).length > 1
                        }
                      >
                        <Form.Item>
                          <Button
                            className="ml-2"
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
                    </div>
                  </Col>
                </Row>
              </>
            ))}

            {/* <When condition={method == "theory"}>
              <Row>
                <Col xs={24} xl={4}></Col>
                <Col
                  xs={24}
                  xl={20}
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                >
                  <Form.Item>
                    <Button
                      className="my-3"
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      style={{
                        color: "#fff",
                        background: "green",
                        fontSize: 12,
                        width: 150,
                        height: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textTransform: "capitalize"
                      }}
                    >
                      Add {method} Faculty
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </When> */}
          </>
        )}
      </Form.List>
    );
  };
  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card bordered={false} title="Update Course-Faculty Information">
          <Row justify={'center'}>
            <Col>
              <When condition={!isNew}>
                <Descriptions column={24}>
                  <Descriptions.Item label="Academic Year" span={12}>
                    <YearAsText
                      value={parseInt(
                        storeCourseFacultyLinking.current?.academicYear,
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Program" span={12}>
                    <ProgramAsText
                      value={storeCourseFacultyLinking.current?.programId}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Class" span={12}>
                    {storeCourseFacultyLinking.current?.className}
                  </Descriptions.Item>
                  <Descriptions.Item label="Semester" span={12}>
                    {storeCourseFacultyLinking.current?.semester == 1
                      ? 'Semester I'
                      : 'Semester II'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Division" span={12}>
                    {/* <span style={{ textTransform: "uppercase" }}>
                      {DivisionAsText(
                        storeCourseFacultyLinking.current?.division
                      )}
                    </span> */}
                    <DivisionAsText
                      value={storeCourseFacultyLinking.current?.division}
                    />
                  </Descriptions.Item>
                </Descriptions>
              </When>
            </Col>
          </Row>
          <div style={{ marginLeft: 100 }}>
            {storeCourseFacultyLinking?.current?.courseMethod?.map(method => (
              <>
                <When
                  condition={
                    (method == 'theory'
                      && storeCourseFacultyLinking?.theoryRecords)
                    || method == 'internship'
                    || method == 'self'
                  }
                >
                  {render(method)}
                </When>
                <When
                  condition={
                    method == 'practical'
                    || method == 'tutorial'
                    || method == 'project/ work/ seminar'
                  }
                >
                  <Row>
                    <Col
                      xs={24}
                      xl={4}
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                      }}
                    >
                      {method} Faculty
                    </Col>
                    <Col
                      xs={24}
                      xl={20}
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                    >
                      <Form.Item name={`${method}FacultyDropdown`}>
                        <Select
                          style={{ width: 300 }}
                          value={
                            method == 'practical'
                              ? practicalFaculty
                              : method == 'tutorial'
                                ? TutorialFacultyType
                                : method == 'project'
                                  ? ProjectFacultyType
                                  : ''
                          }
                          options={facultyDropdownOptions}
                          onChange={(event) => {
                            method == 'practical'
                              ? setPracticalFaculty(event)
                              : method == 'tutorial'
                                ? setTutorialFacultyType(event)
                                : method == 'project'
                                  ? setProjectFacultyType(event)
                                  : '';
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <When
                    condition={
                      method == 'practical'
                        ? practicalFaculty == 'entiredivision'
                        : method == 'tutorial'
                          ? TutorialFacultyType == 'entiredivision'
                          : method == 'project'
                            ? ProjectFacultyType == 'entiredivision'
                            : ''
                    }
                  >
                    <Form.List
                      name={method}
                      initialValue={[
                        {
                          Faculty: '',
                          No_of_hrs_per_week: '',
                        },
                      ]}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <>
                              <Row style={{ marginTop: 30 }}>
                                <Col xs={24} xl={4}></Col>
                                <Col
                                  xs={24}
                                  xl={5}
                                  style={{ paddingLeft: 10, paddingRight: 10 }}
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[name, `${method}Faculty`]}
                                  >
                                    <Select
                                      style={{ width: '100%' }}
                                      options={optionsEmployee}
                                      // onChange={event => setDivisionDetailsEvent(event)}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col
                                  xs={24}
                                  xl={4}
                                  style={{ paddingLeft: 10, paddingRight: 10 }}
                                >
                                  No. of hrs. per week
                                </Col>
                                <Col
                                  xs={24}
                                  xl={5}
                                  style={{ paddingLeft: 10, paddingRight: 10 }}
                                >
                                  <Form.Item name={[name, `${method}Hours`]}>
                                    <Input type="number" />
                                  </Form.Item>
                                </Col>
                                {/* <When condition={key != 0}>
                                <Button
                                  type="primary"
                                  onClick={() => {
                                    remove(name);
                                  }}
                                  block
                                  danger
                                  style={{
                                    fontSize: 12,
                                    width: 70,
                                    height: 20,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                  }}
                                >
                                  Remove
                                </Button>
                              </When> */}
                              </Row>
                              <Row>
                                <Col
                                  xs={4}
                                  xl={4}
                                  style={{ paddingLeft: 10, paddingRight: 10 }}
                                ></Col>
                                <Col
                                  xs={20}
                                  xl={20}
                                  style={{ paddingLeft: 10, paddingRight: 10 }}
                                >
                                  <div style={{ display: 'flex' }}>
                                    <When
                                      condition={
                                        method == 'practical'
                                        && removeitem(fields) === name
                                      }
                                    >
                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add();
                                          }}
                                          block
                                          style={{
                                            color: '#fff',
                                            background: 'green',
                                            fontSize: 12,
                                            width: 150,
                                            height: 20,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textTransform: 'capitalize',
                                          }}
                                        >
                                          Add {method} Faculty
                                        </Button>
                                      </Form.Item>
                                    </When>
                                    <When
                                      condition={
                                        removeitem(fields) === name
                                        && form.getFieldValue(`${method}`).length
                                          > 1
                                      }
                                    >
                                      <Form.Item>
                                        <Button
                                          className="ml-2"
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
                                  </div>
                                </Col>
                              </Row>
                            </>
                          ))}
                          {/* <When condition={method == "practical"}>
                            <Row>
                              <Col xs={24} xl={4}></Col>
                              <Col
                                xs={24}
                                xl={20}
                                style={{ paddingLeft: 10, paddingRight: 10 }}
                              >
                                <Form.Item>
                                  <Button
                                    className="my-3"
                                    type="dashed"
                                    onClick={() => {
                                      add();
                                    }}
                                    block
                                    style={{
                                      color: "#fff",
                                      background: "green",
                                      fontSize: 12,
                                      width: 150,
                                      height: 20,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      textTransform: "capitalize"
                                    }}
                                  >
                                    Add {method} Faculty
                                  </Button>
                                </Form.Item>
                              </Col>
                            </Row>
                          </When> */}
                        </>
                      )}
                    </Form.List>
                  </When>
                  <When
                    condition={
                      form.getFieldValue(`${method}FacultyDropdown`)
                      === 'batchwise'
                    }
                  >
                    <When
                      condition={
                        parseInt(storeCourseFacultyLinking.current.batch) === 0
                      }
                    >
                      <Row>
                        <Col xs={24} xl={4}></Col>
                        <Col
                          xs={24}
                          xl={20}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingBottom: 20,
                          }}
                        >
                          Batches has not assigned yet, Please{' '}
                          <a>Click Here </a>
                          to Create
                        </Col>
                      </Row>
                    </When>
                    <When
                      condition={
                        parseInt(storeCourseFacultyLinking.current.batch) > 0
                      }
                    >
                      {batch?.map(user => (
                        <Form.List
                          name={method + user}
                          initialValue={[getFacultyName(user, method)]}
                        >
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(({ key, name, ...restField }) => (
                                <>
                                  <Row style={{ marginTop: 30 }}>
                                    <Col xs={24} xl={2}>
                                      <When condition={name == 0}>
                                        <label style={{ fontWeight: 'bold' }}>
                                          batch
                                        </label>
                                      </When>
                                    </Col>
                                    <Col xs={24} xl={4}>
                                      <When condition={name == 0}>
                                        <Form.Item
                                          {...restField}
                                          name={[name, 'batchNo']}
                                        >
                                          <Input disabled />
                                        </Form.Item>
                                      </When>
                                    </Col>
                                    <Col
                                      xs={24}
                                      xl={5}
                                      style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                      }}
                                    >
                                      <Form.Item
                                        {...restField}
                                        name={[name, `${method}Faculty`]}
                                      >
                                        <Select
                                          style={{ width: '100%' }}
                                          options={optionsEmployee}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col
                                      xs={24}
                                      xl={4}
                                      style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                      }}
                                    >
                                      No. of hrs. per week
                                    </Col>
                                    <Col
                                      xs={24}
                                      xl={5}
                                      style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                      }}
                                    >
                                      <Form.Item
                                        name={[name, `${method}Hours`]}
                                      >
                                        <Input type="number" />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col
                                      xs={4}
                                      xl={6}
                                      style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                      }}
                                    ></Col>
                                    <Col
                                      xs={20}
                                      xl={16}
                                      style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                      }}
                                    >
                                      <div style={{ display: 'flex' }}>
                                        <When
                                          condition={
                                            method == 'practical'
                                            && removeitem(fields) === name
                                          }
                                        >
                                          <Form.Item>
                                            <Button
                                              type="dashed"
                                              onClick={() => {
                                                add();
                                              }}
                                              block
                                              style={{
                                                color: '#fff',
                                                background: 'green',
                                                fontSize: 12,
                                                width: 150,
                                                height: 20,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textTransform: 'capitalize',
                                              }}
                                            >
                                              Add {method} Faculty
                                            </Button>
                                          </Form.Item>
                                        </When>
                                        <When
                                          condition={
                                            removeitem(fields) === name
                                            && name != 0
                                          }
                                        >
                                          <Form.Item>
                                            <Button
                                              className="ml-2"
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
                                      </div>
                                    </Col>
                                  </Row>
                                </>
                              ))}
                              {/* <When condition={method == "practical"}>
                                <Row>
                                  <Col xs={24} xl={4}></Col>
                                  <Col
                                    xs={24}
                                    xl={20}
                                    style={{
                                      paddingLeft: 10,
                                      paddingRight: 10
                                    }}
                                  >
                                    <Form.Item>
                                      <Button
                                        className="my-3"
                                        type="dashed"
                                        onClick={() => {
                                          add();
                                        }}
                                        block
                                        style={{
                                          color: "#fff",
                                          background: "green",
                                          fontSize: 12,
                                          width: 150,
                                          height: 20,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          textTransform: "capitalize"
                                        }}
                                      >
                                        Add {method} Faculty
                                      </Button>
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </When> */}
                            </>
                          )}
                        </Form.List>
                      ))}
                    </When>
                  </When>
                </When>
              </>
            ))}
            <Row>
              <Col xs={24} xl={4}></Col>
              <Col
                xs={24}
                xl={20}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <Form.Item
                  name="consider_for_result"
                  label="Consider for Final Result"
                >
                  <Radio.Group defaultValue={1} disabled>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Form.List
              name="Tools"
              initialValue={
                storeCourseFacultyLinking?.toolsRecords
                  ? storeCourseFacultyLinking?.toolsRecords
                  : [{ toolId: '', tool_type: '' }]
              }
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Row>
                        <Col
                          xs={22}
                          xl={4}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold',
                          }}
                        >
                          Final Result Tools*
                        </Col>
                        <Col
                          xs={22}
                          xl={8}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'toolId']}
                            label="Tool"
                            rules={[{ required: true, message: 'required!' }]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              options={optionsTools}
                              // onChange={event => setDivisionDetailsEvent(event)}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={22}
                          xl={8}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'tool_type']}
                            label="Tool Type"
                            rules={[{ required: true, message: 'required!' }]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              options={toolTypes}
                              dropdownStyle={{ textTransform: 'uppercase' }}
                              // onChange={event => setDivisionDetailsEvent(event)}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={22}
                          xl={4}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {/* <When condition={key != 0}>
                          <Button
                            type="primary"
                            onClick={() => {
                              remove(name);
                            }}
                            block
                            danger
                            style={{
                              fontSize: 12,
                              width: 70,
                              height: 20,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            Remove
                          </Button>
                        </When> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={4}
                          xl={4}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        ></Col>
                        <Col
                          xs={20}
                          xl={20}
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                          }}
                        >
                          <div style={{ display: 'flex' }}>
                            <When condition={removeitem(fields) === name}>
                              <Form.Item>
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
                            </When>
                            <When
                              condition={
                                removeitem(fields) === name && name != 0
                              }
                            >
                              <Form.Item>
                                <Button
                                  className="ml-2"
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
                          </div>
                        </Col>
                      </Row>
                    </>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item label='"Once a Bacthwise/Entire Division is submitted, it cannot be reversed."'>
              <Checkbox checked={isConfirm} onChange={onChange}>
                I confirm to submit the above record.
              </Checkbox>
            </Form.Item>
            <Row>
              <Col>
                <Button
                  type="primary"
                  style={{ margin: 5 }}
                  disabled={!isConfirm}
                  onClick={onFormSubmit}
                >
                  Submit
                </Button>
                {/* <Button
                  type="default"
                  style={{ margin: 5 }}
                  onClick={onNavigateToBack}
                >
                  Back
                </Button> */}
              </Col>
            </Row>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default CourseFacultyLinkingEdit;
