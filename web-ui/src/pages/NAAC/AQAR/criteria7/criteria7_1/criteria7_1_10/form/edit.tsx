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

const Criteria7110Title = '7.1.10. The Institution has a prescribed code of conduct for students, teachers, administrators and other staff and conducts periodic programmes in this regard.';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>The Code of Conduct is displayed on the website</li>
  <li>There is a committee to monitor adherence to the Code of Conduct</li>
  <li>Institution organizes professional ethics programmes for students, teachers, administrators and other staff</li>
  <li>Annual awareness programmes on Code of Conduct are organized</li>
</ol>;

const NaacCriteria717Edit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('academicYearId');

  const { yearLabel, updateSkillOption, currentSelected } = useCustomSkillsHook(yearId, '7.1.10');

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
      <h2 style={{ marginBottom: 0 }}>{Criteria7110Title}</h2>
      {guidlines}
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
                  Cancel
                </Button>
              </Space>
            </Form.Item>,
          ]}
        >
          <h3>{`Academic Year ${yearLabel}`}</h3>

          <Divider />

          <h3 style={{ marginBottom: 0 }}>The Institution has a prescribed code of conduct for students, teachers, administrators and other staff and conducts periodic programmes in this regard</h3>
          {guidlines}
          <Divider style={{ margin: '1rem 0' }} />

          <p><b>Options</b></p>
          <Form.Item name="skillsOption" rules={[{ required: true, message: 'Please select an option!' }]}

            initialValue={currentSelected?.options}
          >
            <Radio.Group >
              <Space direction="vertical">
                {options.map((list) => {
                  return <Radio key={list.id} value={list.option}>{list.option}. {list.optionText}</Radio>;
                })}
              </Space>
            </Radio.Group>
          </Form.Item>
        </Card>
      </Form >
    </div >);
};

export default NaacCriteria717Edit;
