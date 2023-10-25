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
  <li>Solar energy</li>
  <li>Biogas plant</li>
  <li>Wheeling to the Grid</li>
  <li>Sensor-based energy conservation</li>
  <li>Use of LED bulbs/ power efficient equipment</li>
</ol>;

const NaacCriteria712List = (props: any) => {
  const navigate = useNavigate();
  const { currData, currYear } = props;

  return (
    <>

      <h4><b>The Institution has facilities for alternate sources of energy and energy conservation measures</b> <Button type='text' onClick={() => navigate(`../edit/?academicYearId=${currYear}`)}><EditFilled style={{ fontSize: '1rem' }} role={'button'} /></Button></h4>
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

export default NaacCriteria712List;
