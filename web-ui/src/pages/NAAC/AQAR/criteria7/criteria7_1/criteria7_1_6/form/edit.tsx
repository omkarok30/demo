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

const Criteria716Title = '7.1.6. Quality audits on environment and energy are regularly undertaken by the institution 7.1.6.1. The institutional environment and energy initiatives are confirmed through the following 1.Green audit 2. Energy audit 3.Environment audit 4.Clean and green campus recognitions/ awards 5. Beyond the campus environmental promotional activities';

const guidlines = <ol style={{ paddingLeft: '14px', fontWeight: '500' }}>
  <li>Restricted entry of automobiles</li>
  <li>Use of Bicycles/ Battery powered vehicles</li>
  <li>Pedestrian Friendly pathways</li>
  <li>Ban on use of Plastic</li>
  <li>landscaping with trees and plants</li>
</ol>;

const NaacCriteria716Edit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('academicYearId');

  const { yearLabel, updateSkillOption, currentSelected } = useCustomSkillsHook(yearId, '7.1.6');

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
                  Cancel
                </Button>
              </Space>
            </Form.Item>,
          ]}
        >
          <h3>{Criteria716Title}</h3>

          <Divider />

          <h3>{`Academic Year ${yearLabel}`}</h3>

          <Divider />

          <h3 style={{ marginBottom: 0 }}>The institutional initiatives for greening the campus are as follows:</h3>
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
              </Space>
            </Radio.Group>
          </Form.Item>
        </Card>
      </Form >
    </div >);
};

export default NaacCriteria716Edit;
