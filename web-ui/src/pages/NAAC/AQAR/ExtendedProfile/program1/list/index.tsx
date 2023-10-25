import { useMemo } from 'react';

import { Button, Card, Col, Divider, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelNaacProgram1 from '@/models/NAAC/extendedProfile/program/program_1_1';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';
import { ProgramAsText } from '@/pages/settings/ProgramDetails/renderers';

const renderers = {
  courseFacultyLinking$academicYear: (value: string) => <YearAsText value={value} />,
  courseFacultyLinking$programId: (value: string) => <ProgramAsText value={value} />,
};

const NaacProgram11 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, courseRecordsCounts, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const programTitle = '1.1. Number of courses offered by the Institution across all programs during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacProgram1.columns(settings);
    cols[1] = {
      dataIndex: 'courseFacultyLinking$count',
      title: 'Number of courses offered by the institution across all programs',
      width: 300,
      render: (_, record) => record.courseFacultyLinking$count ? [<Link to={`../editCourse/?year=${record.courseFacultyLinking$academicYear}`}>{record.courseFacultyLinking$count}</Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <Card bordered={false}>
        <Space.Compact direction="vertical">
          <h3 style={{ margin: 0 }}>{programTitle}</h3>
        </Space.Compact>
        <Divider />

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} hideRatings />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {courseRecordsCounts && <NaacDataTable downloadBtn={false} columns={columns} dataSource={courseRecordsCounts?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='1.1' title={programTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacProgram11;
