import { Button, Card, Col, Row, Select, Table, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { ColumnsType } from 'rc-table/lib/interface';

import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/store/settings/useSettings';

import { todoLookUps } from '@/store/todoLookUps';

import { useProgramDetails } from '@/store/settings/useProgramDetails';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useStudentCourseEnrollment } from '@/store/Academics/studentCourseEnrollment/useStudentCourseEnrollment';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';

const AssignCourse = () => {
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));

  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsAllPrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
    allRecords: state.allRecords,
  }));

  const storeDivision = useDivisions((state: any) => ({
    getRecords: state.getRecords,
    allRecords: state.allRecords,
    getDivisionRecords: state.getDivisionRecords,

    optionsDivision: state.optionsDivision,
  }));

  const storeStudentCourseEnrollment = useStudentCourseEnrollment(
    (state: any) => ({
      getRecords: state.getRecords,
      allRecords: state.allRecords,

      year: state.year,
      programId: state.programId,
      classId: state.classId,
      className: state.className,
      divisionId: state.divisionId,
      semesterId: state.semesterId,
      setYear: state.setYear,
      setProgram: state.setProgram,
      setProgramName: state.setProgramName,
      setClassId: state.setClassId,
      setClassName: state.setClassName,
      setSemesterId: state.setSemesterId,
      setSemesterName: state.setSemesterName,
      setDivisionId: state.setDivisionId,
      setDivisionName: state.setDivisionName,
    }),
  );

  const optionsAcademicYear = storeAcademicYear.comboByName;
  const optionsAllPrograms = storeProgramDetails.optionsAllPrograms;
  const allRecords = storeProgramDetails.allRecords;
  const divisions = storeDivision.optionsDivision;
  const viewStudentDivisionRecords = storeStudentCourseEnrollment.allRecords;

  const [semisters, setSemisters] = useState([]);
  const [classes, setClasses] = useState([]);
  const { semester, className } = todoLookUps.getState();

  useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
  }, []);
  useEffect(() => {
    storeStudentCourseEnrollment.setYear(optionsAcademicYear[1]?.value);
    storeStudentCourseEnrollment.setProgram(optionsAllPrograms[0]?.value);
    storeStudentCourseEnrollment.setProgramName(optionsAllPrograms[0]?.label);
  }, [optionsAcademicYear, optionsAllPrograms]);
  useEffect(() => {
    const program = allRecords.filter((item) => {
      if (item.id === storeStudentCourseEnrollment.programId) {
        return item;
      }
    })[0];
    resetClassesAndSemister(program, 'programId useffect');
  }, [storeStudentCourseEnrollment.programId]);

  useEffect(() => {
    storeDivision.getDivisionRecords(
      storeStudentCourseEnrollment.year,
      storeStudentCourseEnrollment.programId,
      storeStudentCourseEnrollment.classId,
    );
  }, [
    storeStudentCourseEnrollment.year,
    storeStudentCourseEnrollment.programId,
    storeStudentCourseEnrollment.classId,
  ]);
  useEffect(() => {
    if (divisions) {
      storeStudentCourseEnrollment.setDivisionId(divisions[0]?.value);
      storeStudentCourseEnrollment.setDivisionName(divisions[0]?.label);
    }
  }, [divisions]);

  const resetClassesAndSemister = (program: any, callee: string) => {
    const classes = [];
    for (
      let index = program?.isFyApplicable ? 0 : 1;
      index < program?.programDuration;
      index++
    ) {
      classes.push(className[index]);
    }
    setClasses(classes);
    setSemisters(semester);
  };
  useEffect(() => {
    if (classes.length > 0) {
      storeStudentCourseEnrollment.setClassName(classes[0].label);
      storeStudentCourseEnrollment.setClassId(classes[0].value);
    }
  }, [classes]);
  useEffect(() => {
    console.log(semester);
    if (semester.length > 0) {
      storeStudentCourseEnrollment.setSemesterId(semester[0].value);
      storeStudentCourseEnrollment.setSemesterName(semester[0].label);
    }
  }, [semester]);

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      dataIndex: 'id',
      title: 'Roll NO',
    });
    cols.push({
      dataIndex: 'studentInfo$enrolmentNumber',
      title: 'Course Code',
    });
    cols.push({
      title: 'Course Name',
      dataIndex: 'studentName',
      render: (_, record) => [
        <span>
          {record.studentInfo$lastName} {record.studentInfo$firstName}{' '}
          {record.studentInfo$middleName}
        </span>,
      ],
    });
    cols.push({
      dataIndex: 'remark',
      title: 'Action',
    });

    return cols;
  }, [settings]);

  useEffect(() => {
    if (storeStudentCourseEnrollment.divisionId) {
      storeStudentCourseEnrollment.getRecords(
        storeStudentCourseEnrollment.year,
        storeStudentCourseEnrollment.programId,
        storeStudentCourseEnrollment.className,
        storeStudentCourseEnrollment.semester,
        storeStudentCourseEnrollment.divisionId,
      );
    }
  }, [storeStudentCourseEnrollment.divisionId]);

  const handleOnChange = (value: any, id: string, label: any) => {
    switch (id) {
      case 'year':
        storeStudentCourseEnrollment.setYear(value);

        break;
      case 'class':
        storeStudentCourseEnrollment.setClassName(label);
        storeStudentCourseEnrollment.setClassId(value);
        break;
      case 'semister':
        storeStudentCourseEnrollment.setSemesterId(value);
        storeStudentCourseEnrollment.setSemesterName(label);
        break;
      case 'division':
        storeStudentCourseEnrollment.setDivisionId(value);
        storeStudentCourseEnrollment.setDivisionName(label);

        break;

      case 'program':
        storeStudentCourseEnrollment.setProgram(value);
        storeStudentCourseEnrollment.setProgramName(label);

        break;

      default:
        break;
    }
  };
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('../assignStudentToCourse/');
  };

  return (
    <div>
      <Card
        title="Student - Course Enrollment"
        key={2}>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Academic Year <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              allowClear
              style={{ width: '100%' }}
              options={optionsAcademicYear}
              value={storeStudentCourseEnrollment.year}
              onChange={(value, option) => {
                handleOnChange(option.value, 'year', option.label);
              }}
            />
          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            Program <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={optionsAllPrograms}
              value={storeStudentCourseEnrollment.programId}
              onChange={(value, option) => {
                handleOnChange(option.value, 'program', option.label);
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Class <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={classes}
              value={storeStudentCourseEnrollment.className}
              onChange={(value, option) => {
                handleOnChange(option.value, 'class', option.label);
              }}
            />
          </Col>

          <Col
            xs={12}
            xl={3}
            span={3}>
            Semester <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={semester}
              value={storeStudentCourseEnrollment.semesterId}
              onChange={(value, option) => {
                handleOnChange(option.value, 'semister', option.label);
              }}
            />
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 50 }}
          style={{ marginBottom: 20 }}>
          <Col
            xs={12}
            xl={3}
            span={3}>
            Division <Typography.Text type="danger">*</Typography.Text>
          </Col>
          <Col
            xs={12}
            xl={9}
            span={9}>
            <Select
              style={{ width: '100%' }}
              options={divisions}
              value={storeStudentCourseEnrollment.divisionId}
              onChange={(value, option) => {
                handleOnChange(option.value, 'division', option.label);
              }}
            />
          </Col>
          <Col
            xs={12}
            xl={3}
            span={3}>
            <Button
              type="primary"
              onClick={handleNavigation}>
              Proceed
            </Button>
          </Col>
        </Row>

        <Table
          // dataSource={viewStudentDivisionRecords}
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default AssignCourse;
