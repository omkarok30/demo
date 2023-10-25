import { useMemo } from 'react';
import Table, { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { useCustomStudentHook } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

function InputFieldForm({ registerForm, values, inputName, isDisabled }) {
  registerForm.setFieldsValue({
    [inputName]: values[inputName],
  });
  return (
    <><Form form={registerForm}>
      <Form.Item style={{ marginBottom: 0 }} name={inputName} rules={[{ message: 'Please enter value' },
        () => ({
          validator(_, value) {
            if (!value) {
            // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject();
            }
            return Promise.resolve();
          },
        })]} >
        <Input disabled={isDisabled} style={{ width: '50px', textAlign: 'center' }} />
      </Form.Item>
    </Form></>
  );
}

function StudentsList() {
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const yearId = searchParams.get('year');
  const studentId = searchParams.get('id');

  const { studentsData } = useCustomStudentHook(yearId, studentId);
  const [registerForm] = Form.useForm();

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [
      {
        title: 'Sr. No.',
        dataIndex: 'id',
        width: 60,
      },
      {
        dataIndex: 'registrationNumber',
        key: 'studentName',
        title: 'Registration number/roll number for the exam',
        render: (_, record) => {
          return [<InputFieldForm registerForm={registerForm} values={{ registrationNumber: `${record.registrationNumber}` }} inputName={'registrationNumber'} isDisabled={false} />];
        },
      },
      {
        title: 'Names of students selected/ qualified',
        dataIndex: 'studentName',
        key: 'studentName',
        width: 500,
        render: (_, record) => {
          return [<InputFieldForm registerForm={registerForm} values={{
            studentName: `${record.student_info$firstName} ${record.student_info$middleName} ${record.student_info$lastName
              }`,
          }} inputName={'studentName'} isDisabled />];
        },
      },
      {
        title: 'Names of students selected/qualified',
        children: [
          {
            title: 'NET',
            dataIndex: 'net',
            key: 'net',
            width: 60,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'net');
              return [<InputFieldForm registerForm={registerForm} values={{ net: examDetails.net }} inputName={'net'} isDisabled={false} />];
            },
          },
          {
            title: 'SLET',
            dataIndex: 'slet',
            key: 'slet',
            width: 70,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'slet');
              return [<InputFieldForm registerForm={registerForm} values={{ slet: examDetails.slet }} inputName={'slet'} isDisabled={false} />];
            },
          },
          {
            title: 'GATE',
            dataIndex: 'gate',
            key: 'gate',
            width: 70,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'gate');
              return [<InputFieldForm registerForm={registerForm} values={{ gate: examDetails.gate }} inputName={'gate'} isDisabled={false} />];
            },
          },
          {
            title: 'GMAT',
            dataIndex: 'gmat',
            key: 'gmat',
            width: 80,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'gmat');
              return [<InputFieldForm registerForm={registerForm} values={{ gmat: examDetails.gmat }} inputName={'gmat'} isDisabled={false} />];
            },
          },
          {
            title: 'CAT',
            dataIndex: 'cat',
            key: 'cat',
            width: 60,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'cat');
              return [<InputFieldForm registerForm={registerForm} values={{ cat: examDetails.cat }} inputName={'cat'} isDisabled={false} />];
            },
          },
          {
            title: 'GRE',
            dataIndex: 'gre',
            key: 'gre',
            width: 60,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'gre');
              return [<InputFieldForm registerForm={registerForm} values={{ gre: examDetails.gre }} inputName={'gre'} isDisabled={false} />];
            },
          },
          {
            title: 'JAM',
            dataIndex: 'jam',
            key: 'jam',
            width: 70,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'jam');
              return [<InputFieldForm registerForm={registerForm} values={{ jam: examDetails.jam }} inputName={'jam'} isDisabled={false} />];
            },
          },
          {
            title: 'IELTS',
            dataIndex: 'ielts',
            key: 'ielts',
            width: 80,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'ielts');
              return [<InputFieldForm registerForm={registerForm} values={{ ielts: examDetails.ielts }} inputName={'ielts'} isDisabled={false} />];
            },
          },
          {
            title: 'TOEFL',
            dataIndex: 'toefl',
            key: 'toefl',
            width: 80,
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'toefl');
              return [<InputFieldForm registerForm={registerForm} values={{ toefl: examDetails.toefl }} inputName={'toefl'} isDisabled={false} />];
            },
          },
          {
            title: 'Civil Services',
            dataIndex: 'civilservices',
            key: 'civilservices',
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'civilservices');
              return [<InputFieldForm registerForm={registerForm} values={{ civilservices: examDetails.civilservices }} inputName={'civilservices'} isDisabled={false} />];
            },
          },
          {
            title: 'State government examinations',
            dataIndex: 'stategovexam',
            key: 'stategovexam',
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'stategovexam');
              return [<InputFieldForm registerForm={registerForm} values={{ stategovexam: examDetails.stategovexam }} inputName={'stategovexam'} isDisabled={false} />];
            },
          },
          {
            title: 'Other examinations conducted by the State / Central Government Agencies (Specify)',
            dataIndex: 'other',
            key: 'other',
            render: (_, record) => {
              const examDetails = record?.examDetails.find((item: any) => Object.keys(item)[0] === 'other');
              return [<InputFieldForm registerForm={registerForm} values={{ other: examDetails.other }} inputName={'other'} isDisabled={false} />];
            },
          },
        ],
      },

    ];

    return cols;
  }, [settings]);

  const Criteria523Title = '5.2.3. Number of students qualifying in state/ national/ international level examinations during the year (eg: JAM/ CLAT/ GATE/ GMAT/ CAT/ GRE/ TOEFL/ Civil Services/ State government examinations)';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3>{Criteria523Title}</h3>

        <Divider />

        <>
          <Row justify={'space-between'}>
            <Col span={12}>
              <div style={{ display: 'flex', marginBottom: 16 }}><b>Academic Year</b>: <YearAsText value={Number(yearId)} /></div>
            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
            <Button type="primary" icon={<DownloadOutlined />} shape="round" >Download Report</Button>
          </div>

          <Table bordered columns={columns} dataSource={studentsData} scroll={{ x: 1000 }} />

          <Divider />

          <Row justify={'center'}>
            <Space>
              <Button type='primary'>
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
}

export default StudentsList;
