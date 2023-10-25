import React, { useEffect } from 'react';
import { Col, Row } from 'antd';

import { When } from 'react-if';
import { ClassAsText } from '../Renderers/ClassAsText';
import { TrimesterAsText } from '../Renderers/TrimesterAsText';
import { SemesterAsText } from '../Renderers/SemesterAsText';
import { DivisionAsText } from '../Renderers/DivisionAsText';
import { useBasicDetails } from '@/store/admissions/useBasicDetails';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { commonLogics } from '@/store/commonLogics';
import { DepartmentAsText } from '@/pages/settings/AcademicDept/renderers';

const AcademicsBasicDetails = ({
  year,
  program,
  className,
  semester,
  division,
}) => {
  const storeBasicDetails = useBasicDetails((state: any) => ({
    getRecord: state.getRecords,
    current: state.current,
  }),
  );

  const storeCommonLogics = commonLogics((state: any) => ({
    getProgramRecord: state.getProgramRecord,
    current: state.current,
  }));
  useEffect(() => {
    storeCommonLogics.getProgramRecord(program);
  }, [program]);
  return (
    <div className="layout-main-content">
            <Row style={{ marginBottom: 20 }} gutter={{ md: 24 }}>
          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Academic Year</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><YearAsText value={year}></YearAsText></Col>

          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Program</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><ProgramAsText value={program}></ProgramAsText></Col>

          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Degree Level</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}>{storeCommonLogics.current?.levelOfEducation}</Col>

          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Department</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><DepartmentAsText value={storeCommonLogics.current?.id}></DepartmentAsText></Col>

          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Class</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><ClassAsText value={className}></ClassAsText></Col>

           <When condition={storeCommonLogics.current?.examinationPattern !== 'annual' }>
           <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Semester</Col>
           <When condition={storeCommonLogics.current?.examinationPattern !== 'semester' }>
<Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><SemesterAsText value={semester}></SemesterAsText></Col>
</When>
<When condition={storeCommonLogics.current?.examinationPattern !== 'trimester' }>
<Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><TrimesterAsText value={semester}></TrimesterAsText></Col>
</When>

           </When>

          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Division</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}><DivisionAsText value={division}></DivisionAsText></Col>

          <Col span={3} className="gutter-row" style={{ marginBottom: 20 }}>Course</Col>
          <Col span={9} className="gutter-row" style={{ marginBottom: 20 }}></Col>
        </Row>
    </div>
  );
};

export default AcademicsBasicDetails;
