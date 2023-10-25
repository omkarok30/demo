import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCustomStudentHook } from '../renderers';
import { useSettings } from '@/store/settings/useSettings';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { attachRenderer } from '@/utils/tableExtras';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  studentInfo$programId: (value: string) => <ProgramAsText value={value} />,
};

const StudentsList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const yearId = searchParams.get('year');
  const studentId = searchParams.get('id');

  const { studentsData } = useCustomStudentHook(yearId, studentId);

  const [registerForm] = Form.useForm();

  const columns: ColumnsType<any> = useMemo(() => {
    let cols: any = [];
    cols.push({
      title: 'Sr.No', dataIndex: 'id',
    }, {
      title: 'Name of Student placed and contact details*',
      dataIndex: 'studentName',
      render: (_, record) => {
        return [<Form.Item style={{ marginBottom: 0 }}><Input disabled value={`${record.studentInfo$firstName} ${record.studentInfo$middleName} ${record.studentInfo$lastName}`} /></Form.Item>];
      },
    }, {
      title: 'Program graduated from',
      dataIndex: 'studentInfo$programId',
    }, {
      title: 'Name of the employer with contact details',
      dataIndex: 'nameOfEmployer',
      key: 'nameOfEmployer',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ employer: record?.nameOfEmployer }}>
          <Form.Item style={{ marginBottom: 0 }} name={'employer'} rules={[{ message: 'Please enter name' },
            () => ({
              validator(_, value) {
                if (!value) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            })]} >
            <Input />
          </Form.Item>
        </Form>];
      },
    },
    {
      title: 'Pay package at appointment (In INR per annum)',
      dataIndex: 'package',
      key: 'package',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ package: record?.package }}>
            <Form.Item style={{ marginBottom: 0 }} name={'package'} rules={[{ message: 'Please enter number' },
              () => ({
                validator(_, value) {
                  if (!value) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject();
                  }
                  if (isNaN(value)) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Value has to be a number.');
                  }
                  return Promise.resolve();
                },
              })]} >
              <Input />
            </Form.Item>
          </Form>];
      },
    },
    );
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  const Criteria521Title = '5.2.1. Number of placement of outgoing students during the year';

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3>{Criteria521Title}</h3>

        <Divider />

        <>
          <Row justify={'space-between'}>
            <Col span={12}>
              <div style={{ display: 'flex', marginBottom: 16 }}><b>Academic Year</b>: <YearAsText value={Number(yearId)} /></div>
            </Col>
          </Row>

          <NaacDataTable columns={columns} dataSource={studentsData} downloadBtn={false} />

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
};

export default StudentsList;
