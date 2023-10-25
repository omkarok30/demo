import { useEffect, useMemo } from 'react';

import { Card, Divider } from 'antd';
import _ from 'lodash';
import { useAcademicYear } from '@/store/settings/useAcademicYear';
import { useSearchParams } from 'react-router-dom';
import * as modelCriteria514 from '@/models/NAAC/criteria5_1/criteria5_1_4';
import { ColumnsType } from 'antd/lib/table';
import { useSettings } from '@/store/settings/useSettings';
import StudentsRecordTable from '@/components/Naac/StudentsRecordTable';

const NaccTitle = "5.1.4. Number of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the year"
const NaacCriteria514StudentInfo = () => {
  const [searchParams] = useSearchParams();
  const yearId = searchParams.get('year')
  const settings = useSettings((state: any) => state.byKeys);

  const { comboByName, getAcademicYearDetails } = useAcademicYear((state: any) => ({
    comboByName: state.comboByName,
    getAcademicYearDetails: state.getAcademicYearDetails,
  }));

  useEffect(() => {
    getAcademicYearDetails();
  }, [])

  const optionsAcademicYear = comboByName;
  const yearOption = _.find(optionsAcademicYear, { value: Number(yearId) });
  const yearLabel = _.get(yearOption, ['label'], '');

  const columns: ColumnsType<any> = useMemo(() => {
    const cols = modelCriteria514.activityColumns(settings);
    cols.push({
      title: "Roll Number",
      dataIndex: 'rollNo',
      key: 'rollNo',
    }, {
      title: "Enrollment Number",
      dataIndex: 'enrollNo',
      key: 'enrollNo',
    }, {
      title: "Student Name",
      dataIndex: 'studentName',
      key: 'studentName',
    }, {
      title: "Class",
      dataIndex: 'class',
      key: 'class',
    }, {
      title: "Program Name",
      dataIndex: 'programName',
      key: 'programName',
    })
    return cols;
  }, [settings]);

  return (
    <div className='layout-main-content'>
      <Card
        bordered={false}
      >
        <h3 style={{ margin: 0 }}>{NaccTitle}</h3>

        <Divider />
        <h3>Student Info</h3>

        <StudentsRecordTable current={{ "year": yearLabel }} schemeName={''} columns={columns} dataSource={[]} />
      </Card>
    </div >
  );
};

export default NaacCriteria514StudentInfo;
