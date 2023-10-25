import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, DatePicker, Divider, Form, Input, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { useCustomProfStaff } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import * as modelCriteria633 from '@/models/NAAC/criteria6/criteria6_3_3';
import { schemaValidator } from '@/utils/validate';

const dateFormat = 'DD/MM/YYYY';
const { RangePicker } = DatePicker;
dayjs.extend(weekday);
dayjs.extend(localeData);

const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select date!' }],
};

const EditStaffList = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const staffId = searchParams.get('id');
  const [registerForm] = Form.useForm();

  const { currProfessional } = useCustomProfStaff(yearId, staffId);

  const schemaRules = useMemo(
    () => schemaValidator(modelCriteria633.schemaRules, { settings }),
    [settings],
  );

  const onFormSubmit = () => {
    registerForm
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

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      title: 'Sr.No', dataIndex: 'id',
    }, {
      title: 'Dates (from-to) (DD-MM-YYYY)',
      dataIndex: 'dateFromTo',
      width: 250,
      render: (_, record) => {
        const dates = record?.dateFromTo.split('to');
        return [<Form form={registerForm} initialValues={{ datePicker: [dayjs(dates[0].trim(), dateFormat), dayjs(dates[0].trim(), dateFormat)] }}>
          <Form.Item style={{ marginBottom: 0 }} name="datePicker" {...rangeConfig}>
            <RangePicker
              format={dateFormat}
            />
          </Form.Item>
        </Form>];
      },
    }, {
      title: 'Title of the professional development program organised for teaching staff',
      dataIndex: 'professionalDevelopmentTitle',
      key: 'professionalDevelopmentTitle',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ professionalDevelopmentTitle: record?.professionalDevelopmentTitle }}>
          <Form.Item style={{ marginBottom: 0 }} name={'professionalDevelopmentTitle'} rules={schemaRules} >
            <Input />
          </Form.Item>
        </Form>];
      },
    }, {
      title: 'Title of the administrative training program organised for non-teaching staff',
      dataIndex: 'administrativeTrainingTitle',
      key: 'administrativeTrainingTitle',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ administrativeTrainingTitle: record?.administrativeTrainingTitle }}>
          <Form.Item style={{ marginBottom: 0 }} name={'administrativeTrainingTitle'} rules={schemaRules} >
            <Input />
          </Form.Item>
        </Form>];
      },
    },
    {
      title: 'No. of participants',
      dataIndex: 'numberOfParticipant',
      key: 'numberOfParticipant',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ numberOfParticipant: record?.numberOfParticipant }}>
            <Form.Item style={{ marginBottom: 0 }} name={'numberOfParticipant'} rules={schemaRules} >
              <Input type='number' />
            </Form.Item>
          </Form>];
      },
    },
    );
    return cols;
  }, [settings]);

  const Criteria633Title = '6.3.3. Number of professional development/ administrative training programs organized by the institution for teaching and non-teaching staff during the year';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3>{Criteria633Title}</h3>

        <Divider />

        <h4 style={{ display: 'flex' }}>Academic Year: <YearAsText value={Number(yearId)} /></h4>

        <NaacDataTable columns={columns} dataSource={currProfessional} downloadBtn={false} />

        <Divider />

        <Space style={{ display: 'flex', justifyContent: 'center' }}>
          <Button key="submit" type="primary" onClick={onFormSubmit}>
            Save
          </Button>
          <Button
            key="link"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Space>

      </Card>
    </div >
  );
};

export default EditStaffList;
