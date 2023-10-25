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

const NaacCriteria623 = () => {
  const navigate = useNavigate();

  const { yearOption, currentSelected, optionsAcademicYear, handleAQARChange } = useCustomRadioHook('6.2.3');

  const Criteria623Title = '6.2. Strategy Development and Deployment';
  const Criteria623SubTitle = '6.2.3. Implementation of e-governance in areas of operation';
  const egovernanceArea = <ol style={{ paddingLeft: '14px', fontWeight: 'bold' }}>
    <li>Administration</li>
    <li>Finance and Accounts</li>
    <li>Student Admission and Support</li>
    <li>Examination</li>
  </ol>;

  return (
    <div className="layout-main-content">
      <h2>{Criteria623Title}</h2>
      <Card bordered={false}>
        <h3>{Criteria623SubTitle}</h3>
        {egovernanceArea}
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} />

        <Divider />

        <Row>
          <Col span={24}>
            <>
              <div className='ant-card-bordered' style={{ padding: '0.5rem 1rem', marginBottom: '1rem', width: '30%', display: 'flex', alignItems: 'center' }}>
                <h4 style={{ margin: 0 }}><b>E-governance details</b></h4>
                <Space size={0}>
                  <Button type='text' onClick={() => navigate(`../newYearWisePage/?year=${yearOption}`)}><EditFilled style={{ fontSize: '1rem' }} title='Edit' role={'button'} /></Button> <Button type='link' icon={<DownloadOutlined />} title={'Download'}></Button>
                </Space>
              </div>

              <h4><b>E-governance in areas of operation</b> <Button type='text' onClick={() => navigate(`../editArea/?year=${yearOption}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
              <Card>
                {egovernanceArea}
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
            <FileDescriptionList criteria='6.2.3' title={Criteria623Title} year={yearOption}></FileDescriptionList>
            <Divider />
            <Review criteria="6.2.3" reviewType="Internal" title={Criteria623SubTitle} year={yearOption}></Review>
            <Divider />
            <Review criteria="6.2.3" reviewType="External" title={Criteria623SubTitle} year={yearOption}></Review>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacCriteria623;
