import React, { useState } from 'react';
import { Button, Card, Col, Divider, Row, Select, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';
import { CourseAsText } from '../../manageCourses/renderers';
import { useSettings } from '@/store/settings/useSettings';
import { useCourseFacultyLinking } from '@/store/Academics/courseManagement/courseFacultyLinking/useCourseFacultyLinking';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import * as modelCourseFacultyLinking from '@/models/Academics/courseManagement/courseFacultyLinking/CourseFacultyLinking';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { todoLookUps } from '@/store/todoLookUps';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';
import { attachRenderer } from '@/utils/tableExtras';
import { useManageCoursesDetails } from '@/store/Academics/courseManagement/manageCourses/useManageCoursesDetails';

const renderers = {
  courseId: (value: string) => <CourseAsText value={value} />,
};
const ManageCoursesList = () => {
  const navigate = useNavigate();
  const optionsClassNames = todoLookUps.getState().className;
  const optionsSemisters = todoLookUps.getState().semester;
  const optionsTrimesters = todoLookUps.getState().trimester;
  const optionsDivision = todoLookUps.getState().division;

  const [className, setClassName] = useState(optionsClassNames);
  const [semister, setSemister] = useState(optionsSemisters);
  const [division, setDivision] = useState(optionsDivision);
  const [semisterDisable, setSemisterDisable] = useState(false);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
    fetchSettings: state.fetchSettings,
  }));
  const storeAcademicYearDetails = useAcademicYear((state: any) => ({
    allAcademicYearDetails: state.allRecords,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));
  const storeCourseFacultyLinking = useCourseFacultyLinking((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeProgramDetails = useProgramDetails((state: any) => ({
    allRecords: state.allRecords,
    getRecords: state.getRecords,
  }));
  const storeDivisions = useDivisions((state: any) => ({
    allRecordsClassWise: state.allRecordsClassWise,
    getRecordClassWise: state.getRecordClassWise,
  }));
  const storeManageCourses = useManageCoursesDetails((state: any) => ({
    getRecords: state.getRecords,
  }));
  const navigateToNewForm = () => {
    navigate('../add/new');
  };

  const handleActionClick = ({ action, record }) => {
    if (action === 'edit') {
      navigate(`../edit/${record?.id}`, { state: { id: record?.id } });
    }
  };
  const [selectAcademicYear, setAcademicYear] = useState('');
  const [selectProgramDetails, setProgramDetails] = useState();
  const [selectClassNames, setClassNames] = useState('');
  const [selectSemisterDetails, setSemisterDetails] = useState('');
  const [selectDivisionDetails, setDivisionDetails] = useState('');

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
    storeCourseFacultyLinking.getRecords();
    storeProgramDetails.getRecords();
    storeAcademicYearDetails.getAcademicYearDetails();
    storeManageCourses.getRecords();
    setProgramDetailsEvent(optionsProgramDetailss[0]?.value);
  }, []);
  // const [selectDegreeLevel, setDegreeLevel] = useState();

  React.useEffect(() => {
    storeCourseFacultyLinking.getRecords(
      selectAcademicYear,
      selectProgramDetails,
      selectClassNames,
      selectSemisterDetails,
      selectDivisionDetails,
    );
  }, [
    selectAcademicYear,
    selectProgramDetails,
    selectClassNames,
    selectSemisterDetails,
    selectDivisionDetails,
  ]);
  React.useEffect(() => {
    if (selectAcademicYear && selectProgramDetails && selectClassNames) {
      storeDivisions.getRecordClassWise(
        selectAcademicYear,
        selectProgramDetails,
        selectClassNames,
      );
    }
  }, [selectAcademicYear, selectProgramDetails, selectClassNames]);

  const optionsDivisionDetails = _.map(
    storeDivisions.allRecordsClassWise,
    record => ({ value: record.id, label: record.division }),
  );

  React.useEffect(() => {
    if (!selectClassNames) {
      const first = _.first(optionsClassNames);
      const value = _.get(first, ['value'], '');
      setClassNames(value);
    }
  }, [optionsClassNames]);
  React.useEffect(() => {
    // console.log(
    //   "Faculty Linking allRecords",
    //   storeCourseFacultyLinking.allRecords
    // );
  }, [storeCourseFacultyLinking.allRecords]);

  React.useEffect(() => {
    if (!selectProgramDetails) {
      const first = _.first(optionsProgramDetailss);
      const value = _.get(first, ['value'], '');
      setProgramDetails(value);
    }
  }, [optionsProgramDetailss]);
  React.useEffect(() => {
    if (!selectAcademicYear) {
      const first = _.first(optionsAcademicYearDetails);
      const value = _.get(first, ['value'], '');
      setAcademicYear(value);
    }
  }, [optionsAcademicYearDetails]);
  // const setDegreeLevelEvent = (event) => {
  //   setDegreeLevel(event);
  // };
  const setAcademicYearEvent = (event: string) => {
    setAcademicYear(event);
  };
  const setProgramDetailsEvent = (event) => {
    setClassName(optionsClassNames);
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
    // setClassNames(className[0].value);
    setClassNames('');
    if (programDetailsrecord[0]?.examinationPattern == 'semester') {
      setSemister(optionsSemisters);
      setSemisterDetails(optionsSemisters[0].value);
      setSemisterDisable(false);
    }
    else if (programDetailsrecord[0]?.examinationPattern == 'trimester') {
      setSemister(optionsTrimesters);
      setSemisterDetails(optionsTrimesters[0].value);
      setSemisterDisable(false);
    }
    else {
      setSemister(optionsSemisters);
      setSemisterDetails(optionsSemisters[0].value);
      setSemisterDisable(true);
    }
    setDivisionDetails(optionsDivisionDetails[0]?.value);
    setProgramDetails(event);
  };
  const setClassNamesEvent = (event) => {
    setClassNames(event);
  };
  const setSemisterDetailsEvent = (event) => {
    setSemisterDetails(event);
  };
  const setDivisionDetailsEvent = (event) => {
    setDivisionDetails(event);
  };

  const columns: ColumnsType<any> = React.useMemo(() => {
    let cols = modelCourseFacultyLinking.columns(settings);
    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <span>
          <Button
            type="primary"
            onClick={() => handleActionClick({ action: 'edit', record })}
          >
            Update
          </Button>
        </span>,
      ],
    });
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card
        bordered={false}
        title="Course - Faculty Linking Courses"
        extra={
          <Button type="primary" onClick={navigateToNewForm}>
            Assign Course To Academic Year
          </Button>
        }
        style={{ minWidth: 300 }}
      >
        <Row>
          <Col xs={24} xl={12}>
            <Row>
              <Col>Academic Year:</Col>
            </Row>
            <Select
              style={{ width: 300, marginTop: 5 }}
              value={selectAcademicYear}
              options={optionsAcademicYearDetails}
              onChange={event => setAcademicYearEvent(event)}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Row>
              <Col>Program:</Col>
            </Row>
            <Select
              style={{ width: 300, marginTop: 5 }}
              value={selectProgramDetails}
              options={optionsProgramDetailss}
              onChange={event => setProgramDetailsEvent(event)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="my-4" xs={24} xl={12}>
            <Row>
              <Col>Class:</Col>
            </Row>
            <Select
              style={{ width: 300, marginTop: 5 }}
              value={selectClassNames}
              options={className}
              onChange={event => setClassNamesEvent(event)}
            />
          </Col>
          <Col className="my-4" xs={24} xl={12}>
            <Row>
              <Col>Semester:</Col>
            </Row>
            <Select
              style={{ width: 300, marginTop: 5 }}
              value={selectSemisterDetails}
              options={semister}
              // disabled={semisterDisable}
              onChange={event => setSemisterDetailsEvent(event)}
            />
          </Col>
          <Col xs={24} xl={12}>
            <Row>
              <Col>Division:</Col>
            </Row>
            <Select
              style={{ width: 300, marginTop: 5 }}
              value={selectDivisionDetails}
              options={optionsDivisionDetails}
              onChange={event => setDivisionDetailsEvent(event)}
            />
          </Col>
        </Row>
        <Divider></Divider>
        {/* <Row justify="end">
          <Col>
            <Button
              type="primary"
              style={{ marginBottom: 20 }}
              onClick={navigateToNewForm}
            >
              Assign Course To Academic Year
            </Button>
          </Col>
        </Row> */}
        <Table
          scroll={{ x: 350 }}
          columns={columns}
          dataSource={storeCourseFacultyLinking.allRecords}
        />
      </Card>
    </div>
  );
};

export default ManageCoursesList;
