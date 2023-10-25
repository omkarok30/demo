import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckCircleTwoTone, EditFilled } from '@ant-design/icons';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import { useCustomRadioHook } from '@/pages/NAAC/AQAR/radioButtonHooks';

const Criteria715Title = '7.1. Institutional Values and Social Responsibilities';
const Criteria715SubTitle = '7.1.5. Green campus initiatives include';
const Criteria715SubTitleTwo = '7.1.5.1. The institutional initiatives for greening the campus are as follows:';
const CriteriaNum = '7.1.5';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>Restricted entry of automobiles</li>
  <li>Use of Bicycles/ Battery powered vehicles</li>
  <li>Pedestrian Friendly pathways</li>
  <li>Ban on use of Plastic</li>
  <li>landscaping with trees and plants</li>
</ol>;

const options = [
  {
    id: '1',
    option: 'A',
    optionText: 'All of the above',
  }, {
    id: '2',
    option: 'B',
    optionText: 'Any 3 of the above',
  }, {
    id: '3',
    option: 'C',
    optionText: 'Any 2 of the above',
  }, {
    id: '4',
    option: 'D',
    optionText: 'Any 1 of the above',
  }, {
    id: '5',
    option: 'E',
    optionText: 'None of the above',
  },
];

const NaacCriteria715 = () => {
  const navigate = useNavigate();

  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook(CriteriaNum);

  return (
    <div className="layout-main-content">
      <h2>{Criteria715Title}</h2>
      <Card bordered={false}>
        <h3 style={{ marginBottom: 0 }}>{Criteria715SubTitle}</h3>
        <h3 style={{ marginBottom: 0 }}>{Criteria715SubTitleTwo}</h3>
        {guidlines}
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <h4><b>The institutional initiatives for greening the campus are as follows:</b> <Button type='text' onClick={() => navigate(`../edit/?academicYearId=${yearOption}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
            <Card>
              {guidlines}
              <Divider style={{ margin: '1rem 0' }} />

              <Typography.Text strong>Options</Typography.Text>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {options.map((list: any) => <li key={list.id}>{list.option}. {list.optionText} {currentSelected?.options === list.option ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : null}</li>)}
              </ul>
            </Card>
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria={CriteriaNum} title={Criteria715SubTitleTwo} year={yearOption} />
            <Divider />
            <Review criteria={CriteriaNum} reviewType="Internal" title={Criteria715SubTitleTwo} year={yearOption} />
            <Divider />
            <Review criteria={CriteriaNum} reviewType="External" title={Criteria715SubTitleTwo} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria715;
