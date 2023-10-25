import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Radio, Space } from 'antd';
import { useCustomSkillsHook } from '@/pages/NAAC/AQAR/radioButtonHooks';

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

function NaacCriteria513EditSkills() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('academicYearId');

  const { yearLabel, updateSkillOption, currentSelected } = useCustomSkillsHook(yearId, '5.1.3');

  const [form] = Form.useForm();

  const PageTitle = '5.1.3. Capacity building and skills enhancement initiatives taken by the institution include the following 1. Soft skills 2. Language and communication skills 3. Life skills (Yoga, physical fitness, health and hygiene) 4. ICT/computing skills';

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        updateSkillOption(yearId, { option: values.skillsOption }).then(() => navigate(`../list/?year=${yearId}`));
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };

  return (
    <div className='layout-main-content'>
      <Form form={form}>
        <Card
          bordered={false}
          actions={[
            <Form.Item>
              <Space>
                <Button type="primary" onClick={onFormSubmit}>
                  Save
                </Button>
                <Button onClick={() => navigate(`../list/?year=${yearId}`)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>,
          ]}
        >
          <h3>{PageTitle}</h3>

          <Divider />

          <h3>Academic Year: <b>{yearLabel}</b></h3>

          <Divider />

          <h4><b>Skills Enhancement Initiatives</b></h4>
          <ol style={{ paddingLeft: '14px', margin: 0 }}>
            <li>Soft skills</li>
            <li>Language and communication skills</li>
            <li>Life skills (Yoga, physical fitness, health and hygiene)</li>
            <li>ICT/computing skills</li>
          </ol>
          <Divider style={{ margin: '1rem 0' }} />

          <p><b>Options</b></p>
          <Form.Item
            name="skillsOption"
            rules={[{ required: true, message: 'Please select an option!' }]}
            initialValue={currentSelected?.options}
          >
            <Radio.Group >
              <Space direction="vertical">
                {options.map((list) => {
                  return <Radio key={list.id} value={list.option}>{list.option}. {list.optionText}</Radio>;
                })}
              </Space></Radio.Group>
          </Form.Item>
        </Card>
      </Form >
    </div >);
}

export default NaacCriteria513EditSkills;
