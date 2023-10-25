import { Button, Card, Divider, Typography } from 'antd';
import { CheckCircleTwoTone, EditFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '700' }}>
  <li>Implementation of guidelines of statutory/ regulatory bodies</li>
  <li>Organisation wide awareness and undertakings on policies with zero tolerance</li>
  <li>Mechanisms for submission of online/ offline studentsâ€™ grievances </li>
  <li>Timely redressal of the grievances through appropriate committees</li>
</ol>;

const NaacCriteria515Mechanism = (props: any) => {
  const navigate = useNavigate();
  const { currData, currYear } = props;

  return (
    <>

      <h4><b>Mechanisms</b> <Button type='text' onClick={() => navigate(`../edit/?academicYearId=${currYear}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
      <Card>
        {guidlines}
        <Divider style={{ margin: '1rem 0' }} />

        <Typography.Text strong>Options</Typography.Text>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {options.map((list: any) => <li key={list.id}>{list.option}. {list.optionText} {currData?.options === list.option ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : null}</li>)}
        </ul>
      </Card>
    </>
  );
};

export default NaacCriteria515Mechanism;
