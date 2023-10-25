import { useMemo } from 'react';

import { Button, Card, Col, Divider, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelNaacStudent22 from '@/models/NAAC/extendedProfile/student/student_2_2';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacStudent22 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, seatsRecord, handleAQARChange, optionsAcademicYear } = useCustomDataHook();
  const programTitle = '2.2. Number of seats earmarked for reserved category as per GOI/ State Govt rule year wise during the year';

  const cagtegoryCounts = useMemo(() => {
    const result = [];
    seatsRecord?.reduce((res: any, value: any) => {
      if (!res[value.academicYear]) {
        res[value.academicYear] = { academicYear: value.academicYear, numberOfSeats: 0 };
        result.push(res[value.academicYear]);
      }
      res[value.academicYear].numberOfSeats += value.numberOfSeats;
      return res;
    }, {});

    return result;
  }, [seatsRecord]);

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacStudent22.columns(settings);
    cols[1] = {
      dataIndex: 'numberOfSeats',
      title: 'Number of seats earmarked for reserved category as per GOI/State Govt rule',
      width: 300,
      render: (_, record) => {
        return record.numberOfSeats ? [<Link to={`../edit/?year=${record.academicYear}`}>{record.numberOfSeats}</Link>, <Button type='link' icon={<DownloadOutlined title='Download' />} />] : '-';
      },
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
            {cagtegoryCounts && <NaacDataTable downloadBtn={false} columns={columns} dataSource={cagtegoryCounts?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='2.2' title={programTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacStudent22;
