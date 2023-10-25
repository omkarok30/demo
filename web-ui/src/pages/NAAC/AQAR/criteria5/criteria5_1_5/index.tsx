import { Card, Col, Divider } from 'antd';
import { useCustomRadioHook } from '../../radioButtonHooks';
import NaacCriteria515Mechanism from './StudentGrievances/list';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const Criteria515Title = '5.1.5. The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>Implementation of guidelines of statutory/ regulatory bodies</li>
  <li>Organisation wide awareness and undertakings on policies with zero tolerance</li>
  <li>Mechanisms for submission of online/ offline studentsâ€™ grievances </li>
  <li>Timely redressal of the grievances through appropriate committees</li>
</ol>;

const pageTitlle = '5.1. Student Support';
const CriteriaNum = '5.1.5';

const NaacCriteria515 = () => {
  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook(CriteriaNum);

  return (
    <div className="layout-main-content">
      <h2>{pageTitlle}</h2>
      <Card bordered={false}>
        <h3>{Criteria515Title}</h3>
        {guidlines}
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />
        <Col span={24}>
          {<NaacCriteria515Mechanism currData={currentSelected} currYear={yearOption} />}
        </Col>

        <Divider />

        <Col span={24}>
          <FileDescriptionList criteria={CriteriaNum} title={Criteria515Title} year={yearOption} />
          <Divider />
          <Review criteria={CriteriaNum} reviewType="Internal" title={Criteria515Title} year={yearOption} />
          <Divider />
          <Review criteria={CriteriaNum} reviewType="External" title={Criteria515Title} year={yearOption} />
        </Col>
      </Card>
    </div>
  );
};

export default NaacCriteria515;
