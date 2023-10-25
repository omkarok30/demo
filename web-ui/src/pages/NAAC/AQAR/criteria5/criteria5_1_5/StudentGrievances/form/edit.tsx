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

const Criteria515Title = '5.1.5. The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>Implementation of guidelines of statutory/ regulatory bodies</li>
  <li>Organisation wide awareness and undertakings on policies with zero tolerance</li>
  <li>Mechanisms for submission of online/ offline studentsâ€™ grievances </li>
  <li>Timely redressal of the grievances through appropriate committees</li>
</ol>;

function NaacCriteria515Edit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('academicYearId');

  const { yearLabel, updateSkillOption, currentSelected } = useCustomSkillsHook(yearId, '5.1.5');

  const [form] = Form.useForm();

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        updateSkillOption(yearId, { option: values.skillsOption }).then(() => navigate(`../?year=${yearId}`));
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
                <Button onClick={() => navigate(`../?year=${yearId}`)}>
                  Back
                </Button>
              </Space>
            </Form.Item>,
          ]}
        >
          <h3>{Criteria515Title}</h3>
          {guidlines}

          <Divider />

          <h3>{`Academic Year ${yearLabel}`}</h3>

          <h4><b>Mechanisms</b></h4>
          {guidlines}
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

export default NaacCriteria515Edit;
