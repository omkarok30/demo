import { useMemo } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCustomeAreaHook } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { schemaValidator } from '@/utils/validate';
import * as modelCriteria623 from '@/models/NAAC/criteria6/criteria6_2_3';

const EditAreaDetails = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const yearId = searchParams.get('year');
  const areaGovId = searchParams.get('id');

  const { areaRecords } = useCustomeAreaHook(yearId);

  const areaDetailsData = useMemo(() => {
    const areaIds = areaGovId?.split(',');
    const Ids = areaIds?.map(ids => Number(ids));
    return areaRecords?.filter((list: any) => {
      return Ids ? Ids.includes(list.id) : list;
    });
  }, [areaRecords]);

  const [registerForm] = Form.useForm();

  const schemaRules = useMemo(
    () => schemaValidator(modelCriteria623.schemaRules, { settings }),
    [settings],
  );

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      title: 'Sr.No', dataIndex: 'id',
    }, {
      title: 'Areas of e-governance',
      dataIndex: 'areasName',
      render: (_, record) => {
        return [<Form.Item style={{ marginBottom: 0 }}><Input disabled value={`${record.areasName}`} /></Form.Item>];
      },
    }, {
      title: 'Name of the Vendor with contact details',
      dataIndex: 'venderName',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ venderName: record?.venderName }}>
          <Form.Item style={{ marginBottom: 0 }} name={'venderName'} rules={schemaRules} >
            <Input />
          </Form.Item>
        </Form>];
      },
    }, {
      title: 'Year of implementation',
      dataIndex: 'implementationYear',
      key: 'implementationYear',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ implementationYear: record?.academicYear }}>
          <Form.Item style={{ marginBottom: 0 }} name={'implementationYear'} rules={schemaRules} >
            <Input />
          </Form.Item>
        </Form>];
      },
    },
    );

    return cols;
  }, [settings]);

  const handleSave = () => {
    registerForm
      .validateFields()
      .then(async (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
        navigate(-1);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('error', e);
      });
  };

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3 style={{ margin: 0 }}>6.2.3. Implementation of e-governance in areas of operation</h3>
        <ol style={{ paddingLeft: '14px', fontWeight: 'bold' }}>
          <li>Administration</li>
          <li>Finance and Accounts</li>
          <li>Student Admission and Support</li>
          <li>Examination</li>
        </ol>

        <Divider />

        <>
          <Row justify={'space-between'}>
            <Col span={12}>
              <div style={{ display: 'flex', marginBottom: 16 }}><b>Academic Year</b>: <YearAsText value={Number(yearId)} /></div>
            </Col>
          </Row>

          <Table columns={columns} dataSource={areaDetailsData} />

          <Divider />

          <Row justify={'center'}>
            <Space>
              <Button type='primary' onClick={handleSave}>
                Save
              </Button>
              <Button onClick={() => navigate(-1)}>
                Back
              </Button>
            </Space>
          </Row>
        </>
      </Card>
    </div >
  );
};

export default EditAreaDetails;
