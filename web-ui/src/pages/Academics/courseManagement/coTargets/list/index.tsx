import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Row, Select, Table } from 'antd';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { When } from 'react-if';
import { useCOTargets } from '@/store/Academics/courseManagement/coTargets/useCOTargets';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useProgramDetails } from '@/store/settings/useProgramDetails';
import * as modelCoTargets from '@/models/Academics/coTargets/coTarget';
import { useSettings } from '@/store/settings/useSettings';
import { isEmptyValue } from '@/utils/object';
import { commonLogics } from '@/store/commonLogics';
import { useDivisions } from '@/store/Academics/courseManagement/useDivisions';

const COTargets = () => {
  const storeAcademicYear = useAcademicYear((state: any) => ({
    asOptions: state.asOptions,
    getAcademicYearDetails: state.getAcademicYearDetails,
    comboByName: state.comboByName,
  }));

  const storeProgramDetails = useProgramDetails((state: any) => ({
    optionsAllPrograms: state.optionsAllPrograms,
    getRecords: state.getRecords,
    allRecords: state.allRecords,
  }));
  const storeCommonLogics = commonLogics((state: any) => ({
    getProgramRecord: state.getProgramRecord,
    classNames: state.classNames,
    semester: state.semester,
    pattern: state.pattern,

  }));

  const storeDivision = useDivisions((state: any) => ({
    getRecordClassWise: state.getRecordClassWise,
    optionsDivision: state.optionsDivision,
  }));

  const storeCOTargets = useCOTargets();
  const navigate = useNavigate();
  const [selectYear, setYear] = useState();
  const [programvalue, setprogram] = useState();
  const [semesterPattern, setSemesterPattern] = useState(true);
  const optionsAllPrograms = storeProgramDetails.optionsAllPrograms;
  const allRecords = storeProgramDetails.allRecords;
  const optionsAcademicYear = storeAcademicYear.comboByName;
  const yearFirst = _.first(optionsAcademicYear);
  const yearFirstOption = _.get(yearFirst, ['value'], '');

  const programFirst = _.first(optionsAllPrograms);
  const programFirstOption = _.get(programFirst, ['value'], '');

  const [classValue, setclass] = useState('');
  const [semesterValue, setsemester] = useState('');
  const [divisionValue, setDivision] = useState('');

  useEffect(() => {
    storeAcademicYear.getAcademicYearDetails();
    storeProgramDetails.getRecords();
    storeCommonLogics.getProgramRecord(programvalue);
  }, [programvalue]);

  useEffect(() => {
    storeDivision.getRecordClassWise(selectYear, programvalue, classValue);
  }, [programvalue, selectYear, classValue]);

  React.useEffect(() => {
    if (isEmptyValue(selectYear)) {
      const first = _.first(optionsAcademicYear);
      const value = _.get(first, ['value'], '');
      setYear(value);
    }
  }, [optionsAcademicYear]);

  useEffect(() => {
    if (isEmptyValue(programvalue)) {
      const firstProgram = _.first(optionsAllPrograms);
      const valueProgram = _.get(firstProgram, ['value'], '');

      setprogram(valueProgram);
      storeCommonLogics.getProgramRecord(valueProgram);
    }
    else {
      storeCommonLogics.getProgramRecord(programvalue);
    }
  }, [optionsAllPrograms]);
  const optionsDivision = storeDivision.optionsDivision;

  const optionsAllclass = storeCommonLogics.classNames;
  const classFirst = _.first(optionsAllclass);
  const classFirstOption = _.get(classFirst, ['value'], '');

  const optionsAllsemester = storeCommonLogics.semester;
  const semesterFirst = _.first(optionsAllsemester);
  const semesterFirstOption = _.get(semesterFirst, ['value'], '');

  useEffect(() => {
    if (isEmptyValue(classValue)) {
      const firstClass = _.first(optionsAllclass);
      const valueClass = _.get(firstClass, ['value'], '');

      setclass(valueClass);
    }
  }, [optionsAllclass]);
  useEffect(() => {
    if (isEmptyValue(divisionValue)) {
      const firstClass = _.first(optionsDivision);
      const valueClass = _.get(firstClass, ['value'], '');

      setDivision(valueClass);
    }
  }, [optionsDivision]);

  useEffect(() => {
    if (isEmptyValue(semesterValue)) {
      const firstSemester = _.first(optionsAllsemester);
      const valueSemester = _.get(firstSemester, ['value'], '');

      setsemester(valueSemester);
    }
  }, [optionsAllsemester]);

  useEffect(() => {
    storeCOTargets.getRecords(
      selectYear,
      programvalue,
      semesterValue,
      classValue,
      divisionValue,
    );
  }, [classValue, selectYear, semesterValue, programvalue, divisionValue]);
  const settings = useSettings((state: any) => ({
    byKeys: state.byKeys,
    asSelect: state.asSelect,
  }));

  const handleActionClick = (action: string, record: any) => {
    storeCOTargets.setCourseCode = record.courses$code;
    storeCOTargets.setCourseName = record.courses$name;
    storeCOTargets.setDegreeLevel = record.degreeLevel;
    storeCOTargets.setDepartment = record.department;
    const courseId = record.courseId;
    const id = record.id;

    navigate(`../view/${selectYear}/${programvalue}/${classValue}/${semesterValue}/${divisionValue}/${courseId}/${id}`);
  };
  const handleActionAdd = (action: string, record: any) => {
    storeCOTargets.setCourseCode = record.courses$code;
    storeCOTargets.setCourseName = record.courses$name;
    storeCOTargets.setDegreeLevel = record.degreeLevel;
    storeCOTargets.setDepartment = record.department;
    const courseId = record.courseId;

    navigate(`../edit/${selectYear}/${programvalue}/${classValue}/${semesterValue}/${divisionValue}/${courseId}/new`);
  };

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCoTargets.columns(settings);

    cols.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => [
        <><Button type="link" onClick={() => handleActionClick('view', record)}>
          View/Update
        </Button><Button type="link" onClick={() => handleActionAdd('add', record)}>
            Add
          </Button></>,
      ],
    });

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content" >
      <Card bordered={false} title="CO Targets" >
        <Row style={{ marginBottom: 20 }} gutter={{ md: 24 }}>

          <Col className="gutter-row" span={3} style={{ marginBottom: 20 }}>Academic Year </Col>

          <Col className="gutter-row" span={9} style={{ marginBottom: 20 }}>
            <Select
            style={{ width: '100%' }}
              options={optionsAcademicYear}
              value={selectYear}
              onChange={event => setYear(event)}

            />
          </Col>

          <Col className="gutter-row" span={3} style={{ marginBottom: 20 }}>Program</Col>

          <Col className="gutter-row" span={9} style={{ marginBottom: 20 }}>
            <Select
              style={{ width: '100%' }}
              options={optionsAllPrograms}
              value={programvalue}
              onChange={event => setprogram(event)}

            />
          </Col>

         <Col className="gutter-row" span={3} style={{ marginBottom: 20 }}>Class</Col>
          <Col className="gutter-row" span={9} style={{ marginBottom: 20 }}>
            <Select
                        style={{ width: '100%' }}
                        options={storeCommonLogics.classNames}
                        value={classValue}

              onChange={event => setclass(event)}

            />
          </Col>

<When condition={storeCommonLogics.pattern !== 'annual'}>
          <Col className="gutter-row" span={3} style={{ marginBottom: 20 }}>Semester</Col>
          <Col className="gutter-row" span={9} style={{ marginBottom: 20 }}>
            <Select
                    style={{ width: '100%' }}
                    options={storeCommonLogics.semester}
                    value={semesterValue}

              onChange={event => setsemester(event)}

            />
          </Col>
          </When>
          <Col className="gutter-row" span={3} >Division</Col>
          <Col className="gutter-row" span={9} >
            <Select
                        style={{ width: '100%' }}
              options={optionsDivision}
              value={divisionValue}
              onChange={event => setDivision(event)}

            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }} gutter={{ md: 24 }}>

        </Row>
        <Row style={{ marginBottom: 20 }} gutter={24} >

        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={storeCOTargets.allRecords}
        />
      </Card>
    </div>
  );
};

export default COTargets;
