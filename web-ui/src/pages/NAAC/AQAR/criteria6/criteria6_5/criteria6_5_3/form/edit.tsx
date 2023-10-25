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

const PageTitle = () => {
  return (
    <>
      <h3>6.5.3. Quality assurance initiatives of the institution include:</h3>
      <ol style={{ paddingLeft: '18px', fontWeight: 'bold' }}>
        <li>Regular meeting of Internal Quality Assurance Cell (IQAC); Feedback collected, analyzed and used for improvements</li>
        <li>Collaborative quality initiatives with other institution(s)</li>
        <li>Participation in NIRF</li>
        <li>any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)</li>
      </ol>
    </>
  );
};

const NaacCriteria623EditArea = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');

  const { yearLabel, updateSkillOption, currentSelected } = useCustomSkillsHook(yearId, '6.5.3');

  const [form] = Form.useForm();

  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        updateSkillOption(yearId, { option: values.areasOption }).then(() => navigate(-1));
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
          title={<PageTitle />}
          actions={[
            <Form.Item>
              <Space>
                <Button type="primary" onClick={onFormSubmit}>
                  Save
                </Button>
                <Button onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>,
          ]}
        >
          <h3>{`Academic Year ${yearLabel}`}</h3>
          <h4><b>
            Quality assurance initiatives of the institution include:</b></h4>
          <ol style={{ paddingLeft: '14px', margin: 0 }}>
            <li>Regular meeting of Internal Quality Assurance Cell (IQAC); Feedback collected, analyzed and used for improvements</li>
            <li>Collaborative quality initiatives with other institution(s)</li>
            <li>Participation in NIRF</li>
            <li>any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)</li>
          </ol>
          <Divider style={{ margin: '1rem 0' }} />

          <p><b>Options</b></p>
          <Form.Item
            name="areasOption"
            rules={[{ required: true, message: 'Please select an option!' }]}
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

export default NaacCriteria623EditArea;
