import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Divider, Form, Input, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCustomFundsIdHook } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { schemaValidator } from '@/utils/validate';
import * as modelCriteria642 from '@/models/NAAC/criteria6/criteria6_4_2';

const EditFundsList = () => {
  const navigate = useNavigate();
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const fundsId = searchParams.get('id');
  const [registerForm] = Form.useForm();
  const { currFundsGrant } = useCustomFundsIdHook(yearId, fundsId);

  const schemaRules = useMemo(
    () => schemaValidator(modelCriteria642.schemaRules, { settings }),
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
      title: 'Year',
      dataIndex: 'academicYear',
      width: 100,
      render: (_, record) => {
        return [<YearAsText value={record.academicYear} />];
      },
    }, {
      title: 'Name of the non government funding agencies/ individuals',
      dataIndex: 'nameOfFundingAgency',
      key: 'nameOfFundingAgency',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ nameOfFundingAgency: record?.nameOfFundingAgency }}>
          <Form.Item style={{ marginBottom: 0 }} name={'nameOfFundingAgency'} rules={schemaRules} >
            <Input />
          </Form.Item>
        </Form>];
      },
    },
    {
      title: 'Purpose of the Grant',
      dataIndex: 'purposeOfGrant',
      key: 'purposeOfGrant',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ purposeOfGrant: record?.purposeOfGrant }}>
            <Form.Item style={{ marginBottom: 0 }} name={'purposeOfGrant'} rules={schemaRules} >
              <Input />
            </Form.Item>
          </Form>];
      },
    },
    {
      title: 'Funds/ Grants received (INR in lakhs)',
      dataIndex: 'fundsReceived',
      key: 'fundsReceived',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ fundsReceived: record?.fundsReceived }}>
            <Form.Item style={{ marginBottom: 0 }} name={'fundsReceived'} rules={schemaRules} >
              <Input type='number' />
            </Form.Item>
          </Form>];
      },
    },
    {
      title: 'Link to Audited Statement of Accounts reflecting the receipts',
      dataIndex: 'link',
      key: 'link',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ link: record?.link }}>
            <Form.Item style={{ marginBottom: 0 }} name={'link'} rules={schemaRules} >
              <Input />
            </Form.Item>
          </Form>];
      },
    },
    );
    return cols;
  }, [settings]);

  const Criteria642Title = '6.4.2. Funds/ Grants received from non-government bodies, individuals, philanthropers during the year (not covered in Criterion III)';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3>{Criteria642Title}</h3>

        <Divider />

        <h4 style={{ display: 'flex' }}>Academic Year: <YearAsText value={Number(yearId)} /></h4>

        <NaacDataTable columns={columns} dataSource={currFundsGrant} downloadBtn={false} />

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

export default EditFundsList;
