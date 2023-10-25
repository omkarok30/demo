import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form } from 'antd';
import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { useCustomCourseHook } from '../renderers';
import * as modelNaacProgram1 from '@/models/NAAC/extendedProfile/program/program_1_1';
import { useSettings } from '@/store/settings/useSettings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { attachRenderer } from '@/utils/tableExtras';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const renderers = {
  courseFacultyLinking$programId: (value: string) => <ProgramAsText value={value} />,
};
const NaacProgram11Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');

  const { current, courseData } = useCustomCourseHook(yearId);
  const programTitle = '1.1. Number of courses offered by the Institution across all programs during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacProgram1.columnsCourse(settings);

    cols = attachRenderer(cols, renderers);
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
                <td><YearAsText value={current?.courseFacultyLinking$academicYear} /></td>
              </tr>
              <tr>
                <td width={300}><b>Number of courses offered by the institution across all programs</b></td>
                <td>{current?.courseFacultyLinking$count}</td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          <NaacDataTable columns={columns} dataSource={courseData} downloadBtn />

        </Card>
      </Form >
    </div >
  );
};

export default NaacProgram11Edit;
