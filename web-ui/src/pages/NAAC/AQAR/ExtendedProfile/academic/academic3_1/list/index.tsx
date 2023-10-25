import { useMemo } from 'react';

import { Button, Card, Col, Divider, Row } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelNaacAcademic31 from '@/models/NAAC/extendedProfile/academic/academic_3_1';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacAcademic31 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, teacherCounts, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const programTitle = '3.1. Number of full time teachers year wise during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacAcademic31.columns(settings);
    cols[1] = {
      dataIndex: 'employeeInfo$count',
      title: 'Number of full time teachers',
      width: 300,
      render: (_, record) => record.employeeInfo$count ? [<Link to={`../edit/?year=${record.academicYear}`}>{record.employeeInfo$count}</Link>, <Button type='link' icon={<DownloadOutlined title='Dowwnload' />} />] : '-',
    };
    cols = attachRenderer(cols, renderers);

    return cols;
  }, [settings]);

  return (
    <div className="layout-main-content">
      <h2>{programTitle}</h2>
      <Card bordered={false}>

        <YearOptionAndRatings yearOption={yearOption} optionsAcademicYear={optionsAcademicYear} handleAQARChange={handleAQARChange} hideRatings />

        <Divider />

        <Row>
          <Col span={24}>
            <b>Year-wise Data</b>
            {teacherCounts && <NaacDataTable downloadBtn={false} columns={columns} dataSource={teacherCounts?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='3.1' title={programTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacAcademic31;
