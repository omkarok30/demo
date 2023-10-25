import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckCircleTwoTone, DownloadOutlined, EditFilled } from '@ant-design/icons';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import Review from '@/pages/NAAC/review/list';
import { useCustomRadioHook } from '@/pages/NAAC/AQAR/radioButtonHooks';

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

const Criteria653Title = '6.5. Internal Quality Assurance System';
const Criteria653SubTitle = '6.5.3. Quality assurance initiatives of the institution include:';
const CriteriaNum = '6.5.3';
const QualityAssurance = <ol style={{ paddingLeft: '14px', fontWeight: 'bold' }}>
  <li>Regular meeting of Internal Quality Assurance Cell (IQAC); Feedback collected, analyzed and used for improvements</li>
  <li>Collaborative quality initiatives with other institution(s)</li>
  <li>Participation in NIRF</li>
  <li>any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)</li>
</ol>;
const NaacCriteria653 = () => {
  const navigate = useNavigate();

  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook(CriteriaNum);

  return (
    <div className="layout-main-content">
      <h2>{Criteria653Title}</h2>
      <Card bordered={false}>
        <h3>{Criteria653SubTitle}</h3>
        {QualityAssurance}
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <>
              <div className='ant-card-bordered' style={{ padding: '0.5rem 1rem', marginBottom: '1rem', width: '30%', display: 'flex', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}><b>Quality assurance initiatives</b></h4>
                <Space size={0}>
                  <Button type='text' onClick={() => navigate(`../edit/?year=${yearOption}`)}><EditFilled style={{ fontSize: '1rem' }} title='Edit' role={'button'} /></Button> <Button type='link' icon={<DownloadOutlined />} title={'Download'}></Button>
                </Space>
              </div>

              <h4><b>Quality assurance initiatives of the institution include:</b> <Button type='text' onClick={() => navigate(`../editQuality/?year=${yearOption}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
              <Card>
                {QualityAssurance}
                <Divider style={{ margin: '1rem 0' }} />

                <Typography.Text strong>Options</Typography.Text>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  {options.map((list: any) => <li key={list.id}>{list.option}. {list.optionText} {currentSelected?.options === list.option ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : null}</li>)}
                </ul>
              </Card>
            </>
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria={CriteriaNum} title={Criteria653Title} year={yearOption}></FileDescriptionList>
            <Divider />
            <Review criteria={CriteriaNum} reviewType="Internal" title={Criteria653SubTitle} year={yearOption}></Review>
            <Divider />
            <Review criteria={CriteriaNum} reviewType="External" title={Criteria653SubTitle} year={yearOption}></Review>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria653;
