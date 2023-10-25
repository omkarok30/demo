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

const NaacCriteria513Skills = (props: any) => {
  const navigate = useNavigate();
  const { currData, currYear } = props;

  return (
    <>
      <div className='ant-card-bordered' style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0 }}><b>Capacity building and skills enhancement initiatives taken by the institution</b> <Button type='text' onClick={() => navigate(`../edit/ChoiceBasedSystem/?academicYearId=${currYear}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button>
        </h4>
      </div>

      <h4><b>Skills Enhancement Initiatives</b> <Button type='text' onClick={() => navigate(`../edit/NewAnswer/?academicYearId=${currYear}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
      <Card>
        <ol style={{ paddingLeft: '14px', margin: 0 }}>
          <li>Soft skills</li>
          <li>Language and communication skills</li>
          <li>Life skills (Yoga, physical fitness, health and hygiene)</li>
          <li>ICT/computing skills</li>
        </ol>
        <Divider style={{ margin: '1rem 0' }} />

        <Typography.Text strong>Options</Typography.Text>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {options.map((list: any) => <li key={list.id}>{list.option}. {list.optionText} {currData?.options === list.option ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : null}</li>)}
        </ul>
      </Card>
    </>
  );
};

export default NaacCriteria513Skills;
