import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  notification,
} from 'antd';
import { When } from 'react-if';
import _ from 'lodash';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import * as modelManageCourses from '@/models/fyacademics/courseManagement/Managecourse';
import { useSettings } from '@/store/settings/useSettings';
import { useManageCoursesDetails } from '@/store/fyacademics/courseManagement/useManagecourse';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { schemaValidator } from '@/utils/validate';
import { isEmptyValue } from '@/utils/object';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicDepartment } from '@/store/settings/useAcademicDepartment';

const yesNo = todoLookUps.getState().yesNo;
const optionsTypesOfLevel = todoLookUps.getState().typesOfCourses;
const optionsCurriculumComponent = todoLookUps.getState().curriculumComponent;
const ManageCourseEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const [programDetails, setProgramDetails] = useState([{}]);
  const navigate = useNavigate();

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelManageCourses.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

  const [IsTheory, setIsTheory] = React.useState(false);
  const [IsPractical, setIsPractical] = React.useState(false);
  const [IsTutorial, setIsTutorial] = React.useState(false);
  const [IsProject_work_seminar, setIsProject_work_seminar]
    = React.useState(false);
  const [
    IsIndustrial_training_internship,
    setIsIndustrial_training_internship,
  ] = React.useState(false);
  const [IsSelf_learning, setIsSelf_learning] = React.useState(false);
  const [isConfirm, setIsConfirm] = React.useState(false);

  const storeManageCourses = useManageCoursesDetails((state: any) => ({
    getRecord: state.getRecord,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
    getRecords: state.getRecords,
    optionsTools: state.comboByName,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeAcademicDepartment = useAcademicDepartment((state: any) => ({
    getRecords: state.getRecords,
    current: state.current,
    addRecord: state.addRecord,
    updateRecord: state.updateRecord,
  }));

  const [saveProgress, setSaveProgress] = React.useState({
    saving: false,
    disableSubmit: false,
    disableForm: false,
  });
  const [form] = Form.useForm();
  const CourseMethodValue: any = [
    {
      Method: 'THEORY',
      field1: 'courseHours',
      field2: 'credits',
      label1: 'Theory Hours per Week',
      label2: 'Theory Credits',
      checkBoxName: IsTheory,
      checkBoxFunction: setIsTheory,
    },
    {
      Method: 'PRACTICAL',
      field1: 'courseHours',
      field2: 'credits',
      label1: 'Practical Hours per Week',
      label2: 'Practical Creadits',
      checkBoxName: IsPractical,
      checkBoxFunction: setIsPractical,
    },
    {
      Method: 'TUTORIAL',
      field1: 'courseHours',
      field2: 'credits',
      label1: 'TUTORIAL Hours per Week',
      label2: 'TUTORIAL Creadits',
      checkBoxName: IsTutorial,
      checkBoxFunction: setIsTutorial,
    },
    {
      Method: 'PROJECT/WORK/SEMINAR',
      field1: 'courseHours',
      field2: 'credits',
      label1: 'PROJECT/WORK/SEMINAR Hours per Week',
      label2: 'PROJECT/WORK/SEMINAR Creadits',
      checkBoxName: IsProject_work_seminar,
      checkBoxFunction: setIsProject_work_seminar,
    },
    {
      Method: 'INDUSTRIAL TRAINING/INTERNSHIP',
      field1: 'courseHours',
      field2: 'credits',
      label1: 'INDUSTRIAL TRAINING/INTERNSHIP Hours per Week',
      label2: 'INDUSTRIAL TRAINING/INTERNSHIP Creadits',
      checkBoxName: IsIndustrial_training_internship,
      checkBoxFunction: setIsIndustrial_training_internship,
    },
    {
      Method: 'SELF LEARNING',
      field1: 'hours',
      field2: 'credits',
      label1: 'SELF LEARNING Hours per Week',
      label2: 'SELF LEARNING Creadits',
      checkBoxName: IsSelf_learning,
      checkBoxFunction: setIsSelf_learning,
    },
  ];

  React.useEffect(() => {
    settings.fetchSettings();
    storeManageCourses.getRecords();
    storeManageCourses.getRecord(id);
    storeProgramDetails.getRecords();
    storeAcademicDepartment.getRecords();
    return () => {
      form.setFieldsValue({});
    };
  }, [id]);

  // storeManageCourses.current.programId = optionsDefaultProgramValue[0]?.label;

  React.useEffect(() => {
    if (storeManageCourses.current.id !== id) {
      return;
    }
    console.log('storeManageCourses.current', storeManageCourses.current);

    form.setFieldsValue(storeManageCourses.current);
    form.setFieldsValue(storeManageCourses.current);

    if (storeManageCourses.current.courseMethdCredits) {
      let courseMethdCredits: any = [];
      courseMethdCredits = storeManageCourses.current.courseMethdCredits;
      CourseMethodValue.forEach((element, index) => {
        const obj = courseMethdCredits.find(
          o => o.method === element.Method.toLowerCase(),
        );
        if (obj) {
          element.checkBoxFunction(true);
          const fields = form.getFieldsValue();
          const { courseMethod } = fields;
          Object.assign(courseMethod[index], {
            hoursPerWeek: obj.hoursPerWeek,
            creadits: obj.credits,
          });
          form.setFieldsValue({ courseMethod });
        }
      });
      onCreaditsSubmit();
    }
  }, [storeManageCourses.current]);
  React.useEffect(() => {
    if (storeProgramDetails.allRecords) {
      const optionsProgramDetailss = _.map(
        storeProgramDetails.allRecords,
        record => ({
          value: record.id,
          label: `${record.programmeName} (${record.programCode})`,
        }),
      );
      setProgramDetails(optionsProgramDetailss);
    }

    if (storeProgramDetails.allRecords) {
      if (storeManageCourses.current.programId) {
        const value = storeProgramDetails.allRecords.find(
          e => e.id === storeManageCourses.current.programId,
        );
        form.setFieldValue('programId', value?.programmeName);
      }
    }
  }, [storeProgramDetails.allRecords]);
  const onFormSubmit = () => {
    console.log(form.getFieldValue('courseMethod'));

    form
      .validateFields()
      .then(async (values) => {
        setSaveProgress({ ...saveProgress, disableSubmit: true });
        if (isNew) {
          const record = await storeManageCourses.addRecord(values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Created record for ${record.toolName}`,
            });
          }
        }
        else {
          values.id = id;
          const record = await storeManageCourses.updateRecord(id, values);
          if (!isEmptyValue(record)) {
            notification.success({
              message: 'Saved Successfully!',
              description: `Updated record for ${record.toolName}`,
            });
          }
        }
        setSaveProgress({
          saving: false,
          disableSubmit: true,
          disableForm: true,
        });
      })
      .catch(async (values) => {
        console.log(values);

        notification.error({ message: 'Validations failed' });
        setSaveProgress({
          saving: false,
          disableSubmit: false,
          disableForm: false,
        });
      });
  };
  const onReset = () => {
    form.resetFields();
  };
  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setIsConfirm(true);
    }
    else {
      setIsConfirm(false);
    }
  };
  const onBack = () => {
    navigate('../list');
  };
  const onCheckboxChange = (e) => {
    console.log(e.target.value, e.target.checked);
    if (e.target.value === 'THEORY') {
      setIsTheory(e.target.checked);
    }
    else if (e.target.value === 'PRACTICAL') {
      setIsPractical(e.target.checked);
    }
    else if (e.target.value === 'TUTORIAL') {
      setIsTutorial(e.target.checked);
    }
    else if (e.target.value == 'PROJECT/WORK/SEMINAR') {
      setIsProject_work_seminar(e.target.checked);
    }
    else if (e.target.value === 'INDUSTRIAL TRAINING/INTERNSHIP') {
      setIsIndustrial_training_internship(e.target.checked);
    }
    else if (e.target.value === 'SELF LEARNING') {
      setIsSelf_learning(e.target.checked);
    }
  };

  const onCreaditsSubmit = () => {
    const courseMethod: any = form.getFieldValue('courseMethod');
    let creadits: any = 0;
    let hoursPerWeek: any = 0;
    courseMethod.forEach((element) => {
      if (element.creadits) {
        creadits += parseInt(element.creadits);
      }
      if (element.hoursPerWeek) {
        hoursPerWeek += parseInt(element.hoursPerWeek);
      }
    });
    form.setFieldValue('courseHours', hoursPerWeek);
    form.setFieldValue('courseCredits', creadits);
  };

  const headerLabel = isNew ? 'Add Course' : 'Edit  Create Course';

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card
          bordered={false}
          title={headerLabel}
          actions={[
            <Form.Item>
              <Button
                type="primary"
                style={{ marginRight: 5 }}
                onClick={onFormSubmit}
                disabled={isNew && !isConfirm}
              >
                Submit
              </Button>
              <When condition={isNew}>
                <Button
                  type="default"
                  style={{ marginLeft: 5 }}
                  onClick={onReset}
                >
                  Reset
                </Button>
              </When>
              <When condition={!isNew}>
                <Button
                  type="default"
                  style={{ marginLeft: 5 }}
                  onClick={onBack}
                >
                  Back
                </Button>
              </When>
            </Form.Item>,
          ]}
        >
          <Row className="justify-center">
            <Col className="w-md">
              <When condition={!isNew}>
                <Form.Item
                  name="levelOfEducation"
                  label="Degree Level"
                  required
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Department"  required>
                  <Input value="First Year Department" disabled />
                </Form.Item>
              </When>

              <When condition={isNew}>
                <Form.Item
                  name="name"
                  label="Course Name"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
              <When condition={!isNew}>
                <Form.Item
                  name="name"
                  label="Course"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
              <When condition={!isNew}>
                <Form.Item
                  name="code"
                  label="Course Code"
                  rules={schemaRules}
                  required
                >
                  <Input disabled />
                </Form.Item>
              </When>
              <When condition={isNew}>
                <Form.Item
                  name="code"
                  label="Course Code"
                  rules={schemaRules}
                  required
                >
                  <Input />
                </Form.Item>
              </When>
              <Form.Item
                name="shortName"
                label="Course Short Name"
                rules={schemaRules}
                required
              >
                <Input />
              </Form.Item>
              <When condition={!isNew}>
                <Form.Item
                  name="type"
                  label="Type of Course"
                  rules={schemaRules}
                  required
                >
                  <Select options={optionsTypesOfLevel} disabled />
                </Form.Item>
              </When>
              <When condition={isNew}>
                <Form.Item
                  name="type"
                  label="Type of Course"
                  rules={schemaRules}
                  required
                >
                  <Select options={optionsTypesOfLevel} />
                </Form.Item>
              </When>
              <Form.Item
                name="isElective"
                label="Is Elective?"
                rules={schemaRules}
                required
              >
                <Radio.Group options={yesNo} />
              </Form.Item>
              <Form.Item
                name="curriculumComp"
                label="Curriculum Component"
                rules={schemaRules}
                required
              >
                <Select options={optionsCurriculumComponent} />
              </Form.Item>
              <label>*Course Method</label>
              <br />
              <Form.List name="courseMethod" initialValue={CourseMethodValue}>
                {fields => (
                  <div>
                    {fields.map((field, index) => (
                      <div key={index}>
                        <Checkbox
                          onChange={e => onCheckboxChange(e)}
                          checked={CourseMethodValue[index].checkBoxName}
                          value={CourseMethodValue[index].Method}
                        >
                          {CourseMethodValue[index].Method}
                        </Checkbox>
                        <When condition={CourseMethodValue[index].checkBoxName}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'hoursPerWeek']}
                            label={CourseMethodValue[index].label1}
                            rules={[{ required: true, message: 'required' }]}
                          >
                            <Input type="number" onBlur={onCreaditsSubmit} />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, 'creadits']}
                            label={CourseMethodValue[index].label2}
                            rules={[{ required: true, message: 'required' }]}
                          >
                            <Input type="number" onBlur={onCreaditsSubmit} />
                          </Form.Item>
                        </When>
                      </div>
                    ))}
                  </div>
                )}
              </Form.List>
              <br />

              <Form.Item
                name="courseHours"
                label="Course Hours per Weeks"
                rules={schemaRules}
                required
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="courseCredits"
                label="Course Credits"
                rules={schemaRules}
                required
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                name="introductionYear"
                label="Year of introduction"
                rules={schemaRules}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="documentLink"
                label="Link to the relevant document"
              >
                <Input />
              </Form.Item>
              <When condition={isNew}>
                <Form.Item label='"Once a Course is created, it cannot be deleted."'>
                  <Checkbox checked={isConfirm} onChange={onChange}>
                    I confirm to submit the above details.
                  </Checkbox>
                </Form.Item>
              </When>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default ManageCourseEdit;
