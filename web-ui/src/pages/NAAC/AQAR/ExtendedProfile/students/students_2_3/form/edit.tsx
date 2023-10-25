import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form } from 'antd';
import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { useStudentCourseHook } from '../renderers';
import * as modelNaacStudent23 from '@/models/NAAC/extendedProfile/student/student_2_3';
import { useSettings } from '@/store/settings/useSettings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const NaacStudent23Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');

  const { current, studentsData } = useStudentCourseHook(yearId);
  const programTitle = '2.3. Number of outgoing/ final year students during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelNaacStudent23.columnsStudent(settings);

    return cols;
  }, [settings, current]);

  return (
    <div className='layout-main-content'>
      <Form>
        <Card
          bordered={false}
          actions={[
            <Button onClick={() => navigate('../list')}>
              Back
            </Button>,
          ]}
        >
          <h3 style={{ margin: 0 }}>{programTitle}</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.studentPromotionMap$academicYear} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of outgoing / final year students</b></td>
                <td>{current?.studentPromotionMap$count}</td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          <NaacDataTable columns={columns} dataSource={studentsData} downloadBtn />

        </Card>
      </Form >
    </div >
  );
};

export default NaacStudent23Edit;
