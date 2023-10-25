import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Divider, Form } from 'antd';
import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { useCustomTeacherHook } from '../renderers';
import * as modelNaacAcademic31 from '@/models/NAAC/extendedProfile/academic/academic_3_1';
import { useSettings } from '@/store/settings/useSettings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';

const NaacProgram11Edit = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');

  const { current, teachersData } = useCustomTeacherHook(yearId);
  const programTitle = '3.1. Number of full time teachers year wise during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelNaacAcademic31.columnsTeacher(settings);
    return cols;
  }, [settings, current]);

  return (
    <div className='layout-main-content'>
      <h2>{programTitle}</h2>
      <Form>
        <Card
          bordered={false}
          actions={[
            <Button onClick={() => navigate('../list')}>
              Back
            </Button>,
          ]}
        >
          <h3 style={{ margin: 0 }}>Teachers Information</h3>

          <Divider />

          <table style={{ border: '2px solid #f0f0f0' }}>
            <tbody className="ant-table-tbody">
              <tr>
                <td width={300}><b>{'Academic Year'}</b></td>
                <td><YearAsText value={current?.academicYear} /></td>
              </tr>
            </tbody>
          </table>

          <Divider style={{ margin: '1rem 0' }} />

          <NaacDataTable columns={columns} dataSource={teachersData} downloadBtn />

        </Card>
      </Form >
    </div >
  );
};

export default NaacProgram11Edit;
