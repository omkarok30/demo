import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form, Input, Space } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useNaacCriteria514 } from '@/store/NAAC/Criteria5/useNaacCriteria5_1_4';
import { useSettings } from '@/store/settings/useSettings';

const Criteria514Title = '5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year';

const NaacCriteria514EditIndivisual = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const activityId = searchParams.get('activityId');

  const settings = useSettings((state: any) => state.byKeys);

  const { getAcademicYearDetails } = useAcademicYear((state: any) => ({
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  const { currentActivity, current, getCurrActivityByYear } = useNaacCriteria514((state: any) => ({
    currentActivity: state.currentActivity,
    current: state.current,
    getCurrActivityByYear: state.getCurrActivityByYear,
  }));

  useEffect(() => {
    getAcademicYearDetails();
    getCurrActivityByYear(yearId);
  }, [yearId]);

  const [registerForm] = Form.useForm();

  const columns: ColumnsType<any> = useMemo(() => {
    const cols: any = [];
    cols.push({
      title: 'Sr.No', dataIndex: 'id', width: 100, render: () => activityId,
    }, {
      title: 'Year',
      dataIndex: 'year',
      render: (_, record) => {
        return [<Form.Item style={{ marginBottom: 0 }}><Input disabled value={record.year} /></Form.Item>];
      },
    }, {
      title: 'Name of the Activity conducted by the HEI to offer guidance for competitive examinations offered by the institution during the last five years',
      children: [
        {
          title: 'Name of the Activity',
          dataIndex: 'name',
          key: 'activity',
          width: 200,
          render: (_, record) => {
            const currActivity = record?.activity?.find(item => item.id === Number(activityId));
            return [<Form.Item style={{ marginBottom: 0 }}><Input disabled value={currActivity?.name} /></Form.Item>];
          },
        },
        {
          title: 'Number of students attended / participated',
          dataIndex: 'studentsParticiated',
          key: 'activity',
          render: (_, record) => {
            const currActivity = record?.activity?.find(item => item.id === Number(activityId));
            return [<Form.Item style={{ marginBottom: 0 }}><Input disabled value={currActivity?.studentsParticiated} /></Form.Item>];
          },
        },
      ],
    }, {
      title: 'Number of students placed through campus placement',
      dataIndex: 'placements',
      key: 'placements',
      render: (_, record) => {
        return [<Form form={registerForm} initialValues={{ placements: record?.placements }}>
          <Form.Item style={{ marginBottom: 0 }} name={'placements'} rules={[{ message: 'Please enter number' },
            () => ({
              validator(_, value) {
                if (!value) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject();
                }
                if (isNaN(value) || value < 0) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject('Value has to be a number greater or equal to 0.');
                }
                return Promise.resolve();
              },
            })]} >
            <Input />
          </Form.Item>
        </Form>];
      },
    }, {
      title: 'Link to the relevant document',
      dataIndex: 'link',
      key: 'activity',
      render: (_, record) => {
        const currActivity = record?.activity?.find(item => item.id === Number(activityId));
        return [<Form form={registerForm} initialValues={{ link: currActivity?.link || '' }}><Form.Item style={{ marginBottom: 0 }} name={'link'} ><Input /></Form.Item></Form>];
      },
    });
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
        actions={[
          <Space>
            <Button type='primary'>
              Save
            </Button>
            <Button onClick={() => navigate(-1)}>
              Back
            </Button>
          </Space>,
        ]}
      >
        <h3 style={{ margin: 0 }}>{Criteria514Title}</h3>

        <Divider />

        <h4>{`Academic Year ${current?.year}`}</h4>

        {currentActivity && <Table bordered pagination={false} columns={columns} dataSource={[current]} />}
      </Card>
    </div >
  );
};

export default NaacCriteria514EditIndivisual;
