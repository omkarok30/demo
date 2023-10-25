import { useMemo } from 'react';
import _ from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import { Card, Divider } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useCustomStudentHook } from '../renderers';
import * as modelCriteria511 from '@/models/NAAC/criteria5_1/criteria5_1_1';
import { useSettings } from '@/store/settings/useSettings';
import { todoLookUps } from '@/store/todoLookUps';
import { attachRenderer } from '@/utils/tableExtras';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';
import StudentsRecordTable from '@/components/Naac/StudentsRecordTable';

const renderers = {
  studentInfo$programId: (value: string) => <ProgramAsText value={value} />,
};

const StudentsList = () => {
  const settings = useSettings((state: any) => state.byKeys);
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year');
  const schemeNo = searchParams.get('schemeNo');

  const { current, studentsData } = useCustomStudentHook(yearId)

  const schemeName = useMemo(() => {
    const name = _.find(todoLookUps.getState().governmentScheme, { value: schemeNo || '' });
    return (name?.label as string)
  }, [schemeNo])

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelCriteria511.columnsStudents(settings);
    cols = attachRenderer(cols, renderers);
    return cols;
  }, [settings]);

  let Criteria511Title = '5.1.2. Number of students benefitted by scholarships, freeships etc. provided by the institution/ non- government bodies, industries, individuals, philanthropists during the year';

  return (
    <div className='layout-main-content'>
      <Card bordered={false} >
        <h3>{Criteria511Title}</h3>

        <Divider />

        <h3>{'Number of students benefited by government scheme Details'}</h3>

        <StudentsRecordTable current={current} schemeName={schemeName} columns={columns} dataSource={studentsData} />

      </Card>
    </div >
  )
}

export default StudentsList