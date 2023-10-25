import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Select,
  notification,
} from 'antd';
import _ from 'lodash';

import * as modelCourseFacultyLinking from '@/models/Academics/courseManagement/courseFacultyLinking/CourseFacultyLinking';
import { useSettings } from '@/store/settings/useSettings';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { schemaValidator } from '@/utils/validate';
import { todoLookUps } from '@/store/todoLookUps';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';

const CourseFacultyLinkingEdit = () => {
  const navigate = useNavigate();
  const optionsClassNames = todoLookUps.getState().className;
  const optionsSemesters = todoLookUps.getState().semester;
  const optionsTrimesters = todoLookUps.getState().trimester;
  const optionsDivision = todoLookUps.getState().division;

  const [className, setClassName] = useState(optionsClassNames);
  const [semester, setSemester] = useState(optionsSemesters);
  const [division, setDivision] = useState(optionsDivision);
  const [cloneOption, setCloneOption] = useState(false);

  const [selectAcademicYear, setAcademicYear] = useState('');
  const [selectProgramDetails, setProgramDetails] = useState();
  const [selectClassNames, setClassNames] = useState('');
  const [selectSemisterDetails, setSemisterDetails] = useState('');
  const [selectDivisionDetails, setDivisionDetails] = useState('');
  const [noRecordOption, setNoRecordOption] = useState([{ value: 'no_record', label: 'No record found' }]);

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
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
    getRecordClassWise: state.getRecordClassWise,
  }));

  React.useEffect(() => {
    if (selectAcademicYear && selectProgramDetails && selectClassNames) {
      storeDivisions.getRecordClassWise(
        selectAcademicYear,
        selectProgramDetails,
        selectClassNames,
      );
    }
  }, [selectAcademicYear, selectProgramDetails, selectClassNames]);

  const optionsDivisionDetails: any = _.map(
    storeDivisions.allRecordsClassWise,
    record => ({ value: record.id, label: record.division }),
  );

  const navigateToNewForm = () => {
    navigate('../edit/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };
  const optionsProgramDetailss = _.map(
    storeProgramDetails.allRecords,
    record => ({
      value: record.id,
      label: `${record.programmeName} (${record.programCode})`,
    }),
  );
  const optionsAcademicYearDetails = _.map(
    storeAcademicYearDetails.allAcademicYearDetails,
    record => ({ value: record.yearAt, label: record.year }),
  );

  React.useEffect(() => {
    settings.fetchSettings();
    storeProgramDetails.getRecords();
    storeAcademicYearDetails.getAcademicYearDetails();
  }, []);

  const setProgramDetailsEvent = (event) => {
    setClassName(optionsClassNames);
    form.setFieldValue('className', '');
    form.setFieldValue('semester', '');
    form.setFieldValue('division', '');
    const programDetailsrecord = _.filter(
      storeProgramDetails.allRecords,
      record => record.id === event,
    );
    if (
      programDetailsrecord[0]?.programDuration == 4
      && programDetailsrecord[0]?.isFyApplicable == true
    ) {
      setClassName(current =>
        current.filter(
          className =>
            className.value !== 'first'
            && className.value !== 'fifth'
            && className.value !== 'sixth',
        ),
      );
    }
    else {
      setClassName(current =>
        current.filter(
          className =>
            className.value !== 'third'
            && className.value !== 'fourth'
            && className.value !== 'fifth'
            && className.value !== 'sixth',
        ),
      );
    }
    if (programDetailsrecord[0]?.examinationPattern == 'semester') {
      setSemester(optionsSemesters);
    }
    else if (programDetailsrecord[0]?.examinationPattern == 'trimester') {
      setSemester(optionsTrimesters);
    }
    else {
      setSemester(optionsSemesters);
    }
  };

  const schemaRules = React.useMemo(
    () =>
      schemaValidator(modelCourseFacultyLinking.schemaRules, {
        settings: settings.byKeys,
      }),
    [settings.byKeys],
  );

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
        navigate(
          `../add/${form.getFieldValue('academicYear')}/${form.getFieldValue(
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
  const onFormClone = () => {
    form
      .validateFields()
      .then(async (values) => {
      })
      .catch(async (values) => {
        notification.error({ message: 'Validations failed' });
      });
  };

  return (
    <div className="layout-main-content">
      <Form form={form} layout="vertical" disabled={saveProgress.disableForm}>
        <Card bordered={false} title="Assign Course To Academic Year">
          <Row justify={'center'}>
            <Col>
              <Form.Item
                name="academicYear"
                label="Academic Year"
                rules={schemaRules}
                required
              >
                <Select
                  style={{ width: 300 }}
                  value={selectAcademicYear}
                  options={optionsAcademicYearDetails}
                  onChange={event => setAcademicYear(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'center'}>
            <Col>
              <Form.Item
                name="programId"
                label="Program"
                rules={schemaRules}
                required
              >
                <Select
                  style={{ width: 300 }}
                  value={selectProgramDetails}
                  options={optionsProgramDetailss}
                  onChange={event => setProgramDetails(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'center'}>
            <Col>
              <Form.Item
                name="className"
                label="Class"
                rules={schemaRules}
                required
              >
                <Select
                  style={{ width: 300 }}
                  value={selectClassNames}
                  options={className}
                  onChange={event => setClassNames(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'center'}>
            <Col>
              <Form.Item
                name="semester"
                label="Semester"
                rules={schemaRules}
                required
              >
                <Select
                  style={{ width: 300 }}
                  options={semester}
                  value={selectSemisterDetails}
                  onChange={event => setSemisterDetails(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'center'}>
            <Col>
              <Form.Item
                name="division"
                label="Division"
                rules={schemaRules}
                required
              >
                <Select
                  style={{ width: 300 }}
                  value={selectDivisionDetails}
                  onChange={event => setDivisionDetails(event)}
                  options={optionsDivisionDetails?.length > 0 ? optionsDivisionDetails : noRecordOption}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider></Divider>
          <Row justify="center">
            <Col>
              <Button
                type="primary"
                style={{ margin: 5 }}
                onClick={onFormSubmit}
              >
                Proceed to Add Course
              </Button>
              {/* <When condition={cloneOption}> */}
              <Button
                type="default"
                style={{ margin: 5 }}
                onClick={onFormClone}
              >
                Clone Information
              </Button>
              {/* </When> */}
              <Button
                type="default"
                style={{ margin: 5 }}
                onClick={onFormReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CourseFacultyLinkingEdit;
