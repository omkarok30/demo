import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckCircleTwoTone, EditFilled } from '@ant-design/icons';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useCustomRadioHook } from '@/pages/NAAC/AQAR/radioButtonHooks';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';

const Criteria716Title = '7.1. Institutional Values and Social Responsibilities';
const Criteria716SubTitle = '7.1.6. Quality audits on environment and energy are regularly undertaken by the institution 7.1.6.1. The institutional environment and energy initiatives are confirmed through the following 1.Green audit 2. Energy audit 3.Environment audit 4.Clean and green campus recognitions/ awards 5. Beyond the campus environmental promotional activities';

const Criteria716ModalTitle = '7.1.6. Quality audits on environment and energy are regularly undertaken by the institution';
const CriteriaNum = '7.1.6';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>Green audit</li>
  <li>Energy audit</li>
  <li>Environment audit</li>
  <li>Clean and green campus recognitions/awards</li>
  <li>Beyond the campus environmental promotional activities</li>
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

const NaacCriteria716 = () => {
  const navigate = useNavigate();

  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook(CriteriaNum);

  return (
    <div className="layout-main-content">
      <h2>{Criteria716Title}</h2>
      <Card bordered={false}>
        <h3 style={{ marginBottom: 0 }}>{Criteria716SubTitle}</h3>
        <Divider />
        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />
        <Divider />
        <Row>
          <Col span={24}>
            <h4><b>The institutional environment and energy initiatives are confirmed through the following:</b> <Button type='text' onClick={() => navigate(`../edit/?academicYearId=${yearOption}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
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
            <FileDescriptionList criteria={CriteriaNum} title={Criteria716ModalTitle} year={yearOption} />
            <Divider />
            <Review criteria={CriteriaNum} reviewType="Internal" title={Criteria716ModalTitle} year={yearOption} />
            <Divider />
            <Review criteria={CriteriaNum} reviewType="External" title={Criteria716ModalTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria716;
