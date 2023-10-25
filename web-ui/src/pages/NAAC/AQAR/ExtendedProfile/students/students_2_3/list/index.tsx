import { useMemo } from 'react';

import { Button, Card, Col, Divider, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import { useCustomDataHook } from '../renderers';
import * as modelNaacStudent23 from '@/models/NAAC/extendedProfile/student/student_2_3';
import { useSettings } from '@/store/settings/useSettings';
import YearOptionAndRatings from '@/components/Naac/YearOptionAndRatings';
import NaacDataTable from '@/components/Naac/NaacDataTable';
import FileDescriptionList from '@/pages/NAAC/fileDescription/list';
import { YearAsText } from '@/pages/settings/AcademicYear/renderers';
import { attachRenderer } from '@/utils/tableExtras';

const renderers = {
  studentPromotionMap$academicYear: (value: string) => <YearAsText value={value} />,
};

const NaacStudent23 = () => {
  const settings = useSettings((state: any) => state.byKeys);

  const { yearOption, studRecordsCounts, handleAQARChange, optionsAcademicYear } = useCustomDataHook();

  const programTitle = '2.3. Number of outgoing/ final year students during the year';

  const columns: ColumnsType<any> = useMemo(() => {
    let cols = modelNaacStudent23.columns(settings);
    cols[1] = {
      dataIndex: 'studentPromotionMap$count',
      title: 'Number of outgoing / final year students',
      width: 300,
      render: (_, record) => record.studentPromotionMap$count ? [<Link to={`../edit/?year=${record.studentPromotionMap$academicYear}`}>{record.studentPromotionMap$count}</Link>, <Button type='link' icon={<DownloadOutlined title='Download' />} />] : '-',
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
            {studRecordsCounts && <NaacDataTable downloadBtn={false} columns={columns} dataSource={studRecordsCounts?.slice(0, 5)} />}
          </Col>

          <Divider />

          <Col span={24}>
            <FileDescriptionList criteria='2.1' title={programTitle} year={yearOption} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default NaacStudent23;
