import { Card, Col, Divider, Row } from 'antd';
import { useCustomRadioHook } from '../../../radioButtonHooks';
import NaacCriteria712 from './InstitutionFacilities/list';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const Criteria712Title = '7.1. Institutional Values and Social Responsibilities';
const Criteria712SubTitle = '7.1.2. The Institution has facilities for alternate sources of energy and energy conservation measures 1. Solar energy 2. Biogas plant 3. Wheeling to the Grid 4. Sensor-based energy conservation 5. Use of LED bulbs/ power efficient equipment';
const CriteriaNum = '7.1.2';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>Solar energy</li>
  <li>Biogas plant</li>
  <li>Wheeling to the Grid</li>
  <li>Sensor-based energy conservation</li>
  <li>Use of LED bulbs/ power efficient equipment</li>
</ol>;

const NaacCriteria712Main = () => {
  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook(CriteriaNum);

  return (
    <div className="layout-main-content">
      <h2>{Criteria712Title}</h2>
      <Card bordered={false}>
        <h3 style={{ marginBottom: 0 }}>{Criteria712SubTitle}</h3>
        {guidlines}
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />
        <Row>
          <Col span={24}>
            {<NaacCriteria712 currData={currentSelected} currYear={yearOption} />}
          </Col>

          <Divider />
          <Col span={24}>
            <FileDescriptionList criteria={CriteriaNum} title={Criteria712SubTitle} year={yearOption} />
            <Divider />
            <Review criteria={CriteriaNum} reviewType="Internal" title={Criteria712SubTitle} year={yearOption} />
            <Divider />
            <Review criteria={CriteriaNum} reviewType="External" title={Criteria712SubTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria712Main;
