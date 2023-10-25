import { Button, Card, DatePicker, Divider, Form, Input, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { useCustomeInternalQualityHook } from '../renderers';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import * as modelCriteria653 from '@/models/NAAC/criteria6/criteria6_5_3';
import { useSettings } from '@/store/settings/useSettings';
import { schemaValidator } from '@/utils/validate';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
dayjs.extend(weekday);
dayjs.extend(localeData);

const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select date!' }],
};

function NaacCriteria653EditIndivisual() {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const qualityId = searchParams.get('id');

  const { initiativeRecords } = useCustomeInternalQualityHook(yearId);

  const qualityData = useMemo(() => {
    return initiativeRecords?.filter((list: any) => qualityId ? qualityId.includes(list.id) : list)[0];
  }, [initiativeRecords]);
  const dates = qualityData?.dateFrmoTo?.split('to');

  const schemaRules = useMemo(
    () => schemaValidator(modelCriteria653.schemaRules, { settings }),
    [settings],
  );

  const [form] = Form.useForm();
  const onFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };
  let formContent;
  if (qualityData) {
    formContent = <Form
      {...layout}
      style={{ maxWidth: 600, margin: 'auto' }}
      labelCol={{ flex: '300px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 0 }}
      colon={false}
      form={form}
      initialValues={{
        regularMeetings: qualityData?.regularMeetings,
        seminar: qualityData?.conferenceSeminar,
        collaborativeQuality: qualityData?.collaborativeQuality,
        participationInNirf: qualityData?.participationInNirf,
        datePicker: [dayjs(dates?.[0], dateFormat), dayjs(dates?.[1], dateFormat)],
        otherQualityAudit: qualityData?.otherQualityAudit,
      }}
    >
      <Form.Item name={'regularMeetings'} label="Regular meetings of the IQAC held" rules={schemaRules}>
        <Input />
      </Form.Item>
      <Form.Item name={'conferenceSeminar'} label="Conferences, Seminars, Workshops on quality conducted" rules={schemaRules}>
        <Input />
      </Form.Item>
      <Form.Item name={'collaborativeQuality'} label="Collaborative quality initiatives with other institution(s) (Provide name of the institution and activity" rules={schemaRules}>
        <Input />
      </Form.Item>
      <Form.Item name={'participationInNirf'} label="Participation in NIRF along with Status." rules={schemaRules}>
        <Input />
      </Form.Item>
      <Form.Item name={'dateRange'} label="Orientation programme on quality issues for teachers and students, Date (From-To) (DD-MM-YYYY)">
        <Form.Item style={{ marginBottom: 0 }} name="datePicker" {...rangeConfig}>
          <RangePicker
            format={dateFormat}
          />
        </Form.Item>
      </Form.Item>
      <Form.Item name='otherQualityAudit' label='Any other quality audit as recognized by the State, National or International agencies (ISO certification, NBA and such others' rules={schemaRules}>
        <Input.TextArea />
      </Form.Item>
    </Form>;
  }

  return (
    <div className='layout-main-content'>

      <Card
        bordered={false}
        actions={[
          <Space>
            <Button type='primary' onClick={() => onFormSubmit()}>Save</Button>
            <Button danger onClick={() => navigate(-1)}>Back</Button>
          </Space>,
        ]}
      >
        <h3 style={{ margin: 0 }}>6.5.3. Quality assurance initiatives of the institution include:</h3>
        <ol style={{ paddingLeft: '14px', fontWeight: 'bold' }}>
          <li>Regular meeting of Internal Quality Assurance Cell (IQAC); Feedback collected, analyzed and used for improvements</li>
          <li>Collaborative quality initiatives with other institution(s)</li>
          <li>Participation in NIRF</li>
          <li>any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)</li>
        </ol>
        <Divider />

        <h4 style={{ display: 'flex', width: '160px', justifyContent: 'space-between' }}>Academic Year: <YearAsText value={Number(yearId)} /></h4>

{ formContent }

      </Card >
    </div >
  );
}

export default NaacCriteria653EditIndivisual;
